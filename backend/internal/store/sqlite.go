package store

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/rewardapp/backend/internal/domain"
	_ "modernc.org/sqlite"
)

// SQLiteStore implements Store using a local SQLite database.
// Games and tasks are seeded once on first open; user + transactions persist.
type SQLiteStore struct {
	db *sql.DB
}

// Open opens (or creates) the SQLite database at path and runs migrations + seeding.
func Open(path string, seed []domain.Game) (*SQLiteStore, error) {
	db, err := sql.Open("sqlite", path)
	if err != nil {
		return nil, fmt.Errorf("open db: %w", err)
	}

	// Single writer to avoid SQLITE_BUSY under concurrent requests.
	db.SetMaxOpenConns(1)

	if err := migrate(db); err != nil {
		return nil, fmt.Errorf("migrate: %w", err)
	}

	s := &SQLiteStore{db: db}

	if err := s.seedIfEmpty(seed); err != nil {
		return nil, fmt.Errorf("seed: %w", err)
	}

	if err := s.initUser(); err != nil {
		return nil, fmt.Errorf("init user: %w", err)
	}

	return s, nil
}

func (s *SQLiteStore) Close() error {
	return s.db.Close()
}

// --- Games ---

func (s *SQLiteStore) Games() ([]domain.Game, error) {
	// Collect games first, close rows, then load tasks — avoids nested connection use.
	rows, err := s.db.Query(`SELECT id, title, description, icon_url, banner_url, app_store_url FROM games ORDER BY rowid`)
	if err != nil {
		return nil, err
	}
	var games []domain.Game
	for rows.Next() {
		var g domain.Game
		if err := rows.Scan(&g.ID, &g.Title, &g.Description, &g.IconURL, &g.BannerURL, &g.AppStoreURL); err != nil {
			rows.Close()
			return nil, err
		}
		games = append(games, g)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}

	for i, g := range games {
		tasks, err := s.tasksForGame(g.ID)
		if err != nil {
			return nil, err
		}
		games[i].Tasks = tasks
	}
	return games, nil
}

func (s *SQLiteStore) Game(id string) (domain.Game, error) {
	var g domain.Game
	err := s.db.QueryRow(
		`SELECT id, title, description, icon_url, banner_url, app_store_url FROM games WHERE id = ?`, id,
	).Scan(&g.ID, &g.Title, &g.Description, &g.IconURL, &g.BannerURL, &g.AppStoreURL)
	if err == sql.ErrNoRows {
		return domain.Game{}, ErrNotFound
	}
	if err != nil {
		return domain.Game{}, err
	}
	tasks, err := s.tasksForGame(g.ID)
	if err != nil {
		return domain.Game{}, err
	}
	g.Tasks = tasks
	return g, nil
}

func (s *SQLiteStore) tasksForGame(gameID string) ([]domain.Task, error) {
	rows, err := s.db.Query(
		`SELECT id, game_id, title, reward, sort_order, bonus_json FROM tasks WHERE game_id = ? ORDER BY sort_order`,
		gameID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tasks []domain.Task
	for rows.Next() {
		var t domain.Task
		var bonusJSON sql.NullString
		if err := rows.Scan(&t.ID, &t.GameID, &t.Title, &t.Reward, &t.Order, &bonusJSON); err != nil {
			return nil, err
		}
		if bonusJSON.Valid && bonusJSON.String != "" {
			var b domain.Bonus
			if err := json.Unmarshal([]byte(bonusJSON.String), &b); err != nil {
				return nil, err
			}
			t.Bonus = &b
		}
		tasks = append(tasks, t)
	}
	return tasks, rows.Err()
}

// --- User ---

func (s *SQLiteStore) User(id string) (domain.User, error) {
	var u domain.User
	var completedJSON string
	err := s.db.QueryRow(
		`SELECT id, gem_balance, completed_task_ids, streak, boost FROM users WHERE id = ?`, id,
	).Scan(&u.ID, &u.GemBalance, &completedJSON, &u.Streak, &u.Boost)
	if err == sql.ErrNoRows {
		return domain.User{}, ErrNotFound
	}
	if err != nil {
		return domain.User{}, err
	}
	if err := json.Unmarshal([]byte(completedJSON), &u.CompletedTaskIDs); err != nil {
		return domain.User{}, err
	}
	return u, nil
}

func (s *SQLiteStore) SaveUser(user domain.User) error {
	completedJSON, err := json.Marshal(user.CompletedTaskIDs)
	if err != nil {
		return err
	}
	_, err = s.db.Exec(
		`UPDATE users SET gem_balance = ?, completed_task_ids = ?, streak = ?, boost = ? WHERE id = ?`,
		user.GemBalance, string(completedJSON), user.Streak, user.Boost, user.ID,
	)
	return err
}

// --- Transactions ---

func (s *SQLiteStore) AppendTransaction(tx domain.GemTransaction) error {
	_, err := s.db.Exec(
		`INSERT INTO transactions (id, type, amount, task_id, created_at) VALUES (?, ?, ?, ?, ?)`,
		tx.ID, tx.Type, tx.Amount, nullableString(tx.TaskID), tx.CreatedAt,
	)
	return err
}

func (s *SQLiteStore) Transactions(userID string) ([]domain.GemTransaction, error) {
	// userID is kept for future multi-user support; currently only "me" exists.
	rows, err := s.db.Query(`SELECT id, type, amount, COALESCE(task_id,''), created_at FROM transactions ORDER BY created_at`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var txs []domain.GemTransaction
	for rows.Next() {
		var tx domain.GemTransaction
		if err := rows.Scan(&tx.ID, &tx.Type, &tx.Amount, &tx.TaskID, &tx.CreatedAt); err != nil {
			return nil, err
		}
		txs = append(txs, tx)
	}
	return txs, rows.Err()
}

// --- Internal ---

func migrate(db *sql.DB) error {
	_, err := db.Exec(`
		PRAGMA journal_mode=WAL;

		CREATE TABLE IF NOT EXISTS games (
			id           TEXT PRIMARY KEY,
			title        TEXT NOT NULL,
			description  TEXT NOT NULL,
			icon_url     TEXT NOT NULL,
			banner_url   TEXT NOT NULL,
			app_store_url TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS tasks (
			id         TEXT PRIMARY KEY,
			game_id    TEXT NOT NULL REFERENCES games(id),
			title      TEXT NOT NULL,
			reward     INTEGER NOT NULL,
			sort_order INTEGER NOT NULL,
			bonus_json TEXT
		);

		CREATE TABLE IF NOT EXISTS users (
			id                TEXT PRIMARY KEY,
			gem_balance       INTEGER NOT NULL DEFAULT 0,
			completed_task_ids TEXT NOT NULL DEFAULT '[]',
			streak            INTEGER NOT NULL DEFAULT 0,
			boost             INTEGER NOT NULL DEFAULT 1
		);

		CREATE TABLE IF NOT EXISTS transactions (
			id         TEXT PRIMARY KEY,
			type       TEXT NOT NULL,
			amount     INTEGER NOT NULL,
			task_id    TEXT,
			created_at TEXT NOT NULL
		);
	`)
	return err
}

// seedIfEmpty upserts games and tasks on every startup so seed changes take
// effect after a server restart without wiping user data.
func (s *SQLiteStore) seedIfEmpty(games []domain.Game) error {
	tx, err := s.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback() //nolint:errcheck

	for _, g := range games {
		if _, err := tx.Exec(
			`INSERT INTO games (id, title, description, icon_url, banner_url, app_store_url) VALUES (?, ?, ?, ?, ?, ?)
			 ON CONFLICT(id) DO UPDATE SET title=excluded.title, description=excluded.description,
			 icon_url=excluded.icon_url, banner_url=excluded.banner_url, app_store_url=excluded.app_store_url`,
			g.ID, g.Title, g.Description, g.IconURL, g.BannerURL, g.AppStoreURL,
		); err != nil {
			return fmt.Errorf("upsert game %s: %w", g.ID, err)
		}
		for _, t := range g.Tasks {
			var bonusJSON string
			if t.Bonus != nil {
				b, err := json.Marshal(t.Bonus)
				if err != nil {
					return err
				}
				bonusJSON = string(b)
			}
			if _, err := tx.Exec(
				`INSERT INTO tasks (id, game_id, title, reward, sort_order, bonus_json) VALUES (?, ?, ?, ?, ?, ?)
				 ON CONFLICT(id) DO UPDATE SET title=excluded.title, reward=excluded.reward,
				 sort_order=excluded.sort_order, bonus_json=excluded.bonus_json`,
				t.ID, t.GameID, t.Title, t.Reward, t.Order, nullableString(bonusJSON),
			); err != nil {
				return fmt.Errorf("upsert task %s: %w", t.ID, err)
			}
		}
	}

	return tx.Commit()
}

func (s *SQLiteStore) initUser() error {
	_, err := s.db.Exec(
		`INSERT OR IGNORE INTO users (id, gem_balance, completed_task_ids, streak, boost) VALUES ('me', 0, '[]', 0, 1)`,
	)
	return err
}

func nullableString(s string) interface{} {
	if strings.TrimSpace(s) == "" {
		return nil
	}
	return s
}

// ErrNotFound is returned by Game/User when the record does not exist.
var ErrNotFound = fmt.Errorf("not found")
