package store_test

import (
	"os"
	"testing"
	"time"

	"github.com/rewardapp/backend/internal/domain"
	"github.com/rewardapp/backend/internal/store"
)

func openTestStore(t *testing.T) *store.SQLiteStore {
	t.Helper()
	f, err := os.CreateTemp(t.TempDir(), "test-*.db")
	if err != nil {
		t.Fatalf("temp file: %v", err)
	}
	f.Close()

	seed := []domain.Game{
		{
			ID:          "g1",
			Title:       "Test Game",
			Description: "desc",
			IconURL:     "icon",
			BannerURL:   "banner",
			AppStoreURL: "store",
			Tasks: []domain.Task{
				{ID: "t1", GameID: "g1", Reward: 100, Order: 1},
				{ID: "t2", GameID: "g1", Reward: 200, Order: 2,
					Bonus: &domain.Bonus{Reward: 50, ExpiresAt: "2030-01-01T00:00:00Z"}},
			},
		},
	}

	st, err := store.Open(f.Name(), seed)
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	t.Cleanup(func() { st.Close() })
	return st
}

func TestSQLite_GamesSeeded(t *testing.T) {
	st := openTestStore(t)
	games, err := st.Games()
	if err != nil {
		t.Fatalf("games: %v", err)
	}
	if len(games) != 1 {
		t.Fatalf("want 1 game, got %d", len(games))
	}
	if len(games[0].Tasks) != 2 {
		t.Errorf("want 2 tasks, got %d", len(games[0].Tasks))
	}
	if games[0].Tasks[1].Bonus == nil {
		t.Error("want bonus on task 2, got nil")
	}
}

func TestSQLite_GameNotFound(t *testing.T) {
	st := openTestStore(t)
	if _, err := st.Game("no-id"); err == nil {
		t.Error("want error, got nil")
	}
}

func TestSQLite_UserInitialized(t *testing.T) {
	st := openTestStore(t)
	u, err := st.User("me")
	if err != nil {
		t.Fatalf("user: %v", err)
	}
	if u.GemBalance != 0 || u.Boost != 1 {
		t.Errorf("unexpected defaults: %+v", u)
	}
}

func TestSQLite_SaveAndReloadUser(t *testing.T) {
	st := openTestStore(t)

	u, _ := st.User("me")
	u.GemBalance = 999
	u.CompletedTaskIDs = []string{"t1"}
	if err := st.SaveUser(u); err != nil {
		t.Fatalf("save: %v", err)
	}

	loaded, err := st.User("me")
	if err != nil {
		t.Fatalf("reload: %v", err)
	}
	if loaded.GemBalance != 999 {
		t.Errorf("want 999, got %d", loaded.GemBalance)
	}
	if len(loaded.CompletedTaskIDs) != 1 || loaded.CompletedTaskIDs[0] != "t1" {
		t.Errorf("completedTaskIds wrong: %v", loaded.CompletedTaskIDs)
	}
}

func TestSQLite_Transactions(t *testing.T) {
	st := openTestStore(t)
	tx := domain.GemTransaction{
		ID:        "tx1",
		Type:      "earn",
		Amount:    100,
		TaskID:    "t1",
		CreatedAt: time.Now().UTC().Format(time.RFC3339),
	}
	if err := st.AppendTransaction(tx); err != nil {
		t.Fatalf("append: %v", err)
	}
	txs, err := st.Transactions("me")
	if err != nil {
		t.Fatalf("transactions: %v", err)
	}
	if len(txs) != 1 || txs[0].Amount != 100 {
		t.Errorf("unexpected txs: %v", txs)
	}
}

func TestSQLite_SeedIdempotent(t *testing.T) {
	// Opening the same DB twice should not double-seed.
	dir := t.TempDir()
	path := dir + "/test.db"
	seed := []domain.Game{{
		ID: "g1", Title: "T", Description: "D",
		IconURL: "i", BannerURL: "b", AppStoreURL: "s",
		Tasks: []domain.Task{{ID: "t1", GameID: "g1", Reward: 1, Order: 1}},
	}}

	st1, _ := store.Open(path, seed)
	st1.Close()

	st2, err := store.Open(path, seed)
	if err != nil {
		t.Fatalf("second open: %v", err)
	}
	defer st2.Close()

	games, _ := st2.Games()
	if len(games) != 1 {
		t.Errorf("want 1 game after second open, got %d", len(games))
	}
}
