package http_test

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	apphttp "github.com/rewardapp/backend/internal/http"
	"github.com/rewardapp/backend/internal/domain"
	"github.com/rewardapp/backend/internal/service"
	"github.com/rewardapp/backend/internal/store"
)

// testStore is a minimal in-memory store for handler integration tests.
type testStore struct {
	games        []domain.Game
	user         domain.User
	transactions []domain.GemTransaction
}

func (s *testStore) Games() ([]domain.Game, error) { return s.games, nil }

func (s *testStore) Game(id string) (domain.Game, error) {
	for _, g := range s.games {
		if g.ID == id {
			return g, nil
		}
	}
	return domain.Game{}, store.ErrNotFound
}

func (s *testStore) User(id string) (domain.User, error) { return s.user, nil }

func (s *testStore) SaveUser(u domain.User) error { s.user = u; return nil }

func (s *testStore) AppendTransaction(tx domain.GemTransaction) error {
	s.transactions = append(s.transactions, tx)
	return nil
}

func (s *testStore) Transactions(userID string) ([]domain.GemTransaction, error) {
	return s.transactions, nil
}

func newTestServer() (*apphttp.Server, *testStore) {
	future := time.Now().Add(24 * time.Hour).UTC().Format(time.RFC3339)
	st := &testStore{
		games: []domain.Game{
			{
				ID:          "game-1",
				Title:       "Test Game",
				Description: "A test game",
				IconURL:     "https://example.com/icon.png",
				BannerURL:   "https://example.com/banner.png",
				AppStoreURL: "https://example.com/store",
				Tasks: []domain.Task{
					{ID: "task-1", GameID: "game-1", Reward: 100, Order: 1},
					{ID: "task-bonus", GameID: "game-1", Reward: 200, Order: 2, Bonus: &domain.Bonus{Reward: 50, ExpiresAt: future}},
				},
			},
		},
		user:         domain.User{ID: "me", GemBalance: 0, CompletedTaskIDs: []string{}, Streak: 0, Boost: 1},
		transactions: []domain.GemTransaction{},
	}
	eco := service.NewEconomy(st)
	srv := apphttp.NewServer(":0", st, eco)
	return srv, st
}

func do(srv *apphttp.Server, method, path string) *httptest.ResponseRecorder {
	req := httptest.NewRequest(method, path, nil)
	rr := httptest.NewRecorder()
	srv.ServeHTTP(rr, req)
	return rr
}

func TestHealth(t *testing.T) {
	srv, _ := newTestServer()
	rr := do(srv, http.MethodGet, "/health")
	if rr.Code != http.StatusOK {
		t.Errorf("want 200, got %d", rr.Code)
	}
}

func TestGetGames(t *testing.T) {
	srv, _ := newTestServer()
	rr := do(srv, http.MethodGet, "/games")
	if rr.Code != http.StatusOK {
		t.Fatalf("want 200, got %d", rr.Code)
	}
	var games []domain.Game
	if err := json.NewDecoder(rr.Body).Decode(&games); err != nil {
		t.Fatalf("decode: %v", err)
	}
	if len(games) != 1 {
		t.Errorf("want 1 game, got %d", len(games))
	}
}

func TestGetGame_Found(t *testing.T) {
	srv, _ := newTestServer()
	rr := do(srv, http.MethodGet, "/games/game-1")
	if rr.Code != http.StatusOK {
		t.Errorf("want 200, got %d", rr.Code)
	}
}

func TestGetGame_NotFound(t *testing.T) {
	srv, _ := newTestServer()
	rr := do(srv, http.MethodGet, "/games/no-game")
	if rr.Code != http.StatusNotFound {
		t.Errorf("want 404, got %d", rr.Code)
	}
}

func TestGetUser(t *testing.T) {
	srv, _ := newTestServer()
	rr := do(srv, http.MethodGet, "/user")
	if rr.Code != http.StatusOK {
		t.Fatalf("want 200, got %d", rr.Code)
	}
	var user domain.User
	if err := json.NewDecoder(rr.Body).Decode(&user); err != nil {
		t.Fatalf("decode: %v", err)
	}
	if user.ID != "me" {
		t.Errorf("want id me, got %s", user.ID)
	}
}

func TestCompleteTask_HappyPath(t *testing.T) {
	srv, st := newTestServer()
	rr := do(srv, http.MethodPost, "/tasks/task-1/complete")
	if rr.Code != http.StatusOK {
		t.Fatalf("want 200, got %d: %s", rr.Code, rr.Body.String())
	}
	var result map[string]json.RawMessage
	if err := json.NewDecoder(rr.Body).Decode(&result); err != nil {
		t.Fatalf("decode: %v", err)
	}
	if _, ok := result["user"]; !ok {
		t.Error("response missing 'user'")
	}
	if _, ok := result["transaction"]; !ok {
		t.Error("response missing 'transaction'")
	}
	if st.user.GemBalance != 100 {
		t.Errorf("want balance 100, got %d", st.user.GemBalance)
	}
}

func TestCompleteTask_Idempotent(t *testing.T) {
	srv, _ := newTestServer()
	do(srv, http.MethodPost, "/tasks/task-1/complete")
	rr := do(srv, http.MethodPost, "/tasks/task-1/complete")
	if rr.Code != http.StatusBadRequest {
		t.Errorf("want 400 on second complete, got %d", rr.Code)
	}
}

func TestCompleteTask_NotFound(t *testing.T) {
	srv, _ := newTestServer()
	rr := do(srv, http.MethodPost, "/tasks/no-task/complete")
	if rr.Code != http.StatusNotFound {
		t.Errorf("want 404, got %d", rr.Code)
	}
}

func TestCompleteTask_WithBonus(t *testing.T) {
	srv, st := newTestServer()
	rr := do(srv, http.MethodPost, "/tasks/task-bonus/complete")
	if rr.Code != http.StatusOK {
		t.Fatalf("want 200, got %d", rr.Code)
	}
	if st.user.GemBalance != 250 {
		t.Errorf("want 250 (200+50 bonus), got %d", st.user.GemBalance)
	}
}

func TestGetTransactions(t *testing.T) {
	srv, _ := newTestServer()
	do(srv, http.MethodPost, "/tasks/task-1/complete")
	rr := do(srv, http.MethodGet, "/user/transactions")
	if rr.Code != http.StatusOK {
		t.Fatalf("want 200, got %d", rr.Code)
	}
	var txs []domain.GemTransaction
	if err := json.NewDecoder(rr.Body).Decode(&txs); err != nil {
		t.Fatalf("decode: %v", err)
	}
	if len(txs) != 1 {
		t.Errorf("want 1 transaction, got %d", len(txs))
	}
}

func TestCORS_Preflight(t *testing.T) {
	srv, _ := newTestServer()
	req := httptest.NewRequest(http.MethodOptions, "/games", nil)
	rr := httptest.NewRecorder()
	srv.ServeHTTP(rr, req)
	if rr.Code != http.StatusNoContent {
		t.Errorf("want 204, got %d", rr.Code)
	}
	if rr.Header().Get("Access-Control-Allow-Origin") != "*" {
		t.Error("missing CORS header")
	}
}

// Ensure testStore satisfies store.Store at compile time.
var _ store.Store = (*testStore)(nil)

// Ensure errors sentinel is reachable for error comparison tests.
var _ = errors.New
