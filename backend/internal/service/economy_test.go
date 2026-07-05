package service_test

import (
	"errors"
	"testing"
	"time"

	"github.com/rewardapp/backend/internal/domain"
	"github.com/rewardapp/backend/internal/service"
)

// fakeStore is an in-memory Store for unit tests.
type fakeStore struct {
	games        []domain.Game
	user         domain.User
	transactions []domain.GemTransaction
}

func (f *fakeStore) Games() ([]domain.Game, error) { return f.games, nil }

func (f *fakeStore) Game(id string) (domain.Game, error) {
	for _, g := range f.games {
		if g.ID == id {
			return g, nil
		}
	}
	return domain.Game{}, errors.New("not found")
}

func (f *fakeStore) User(id string) (domain.User, error) { return f.user, nil }

func (f *fakeStore) SaveUser(u domain.User) error { f.user = u; return nil }

func (f *fakeStore) AppendTransaction(tx domain.GemTransaction) error {
	f.transactions = append(f.transactions, tx)
	return nil
}

func (f *fakeStore) Transactions(userID string) ([]domain.GemTransaction, error) {
	return f.transactions, nil
}

func newStore() *fakeStore {
	future := time.Now().Add(24 * time.Hour).UTC().Format(time.RFC3339)
	past := time.Now().Add(-24 * time.Hour).UTC().Format(time.RFC3339)
	return &fakeStore{
		games: []domain.Game{
			{
				ID: "game-1",
				Tasks: []domain.Task{
					{ID: "task-1", GameID: "game-1", Reward: 100, Order: 1},
					{ID: "task-2", GameID: "game-1", Reward: 200, Order: 2, Bonus: &domain.Bonus{Reward: 50, ExpiresAt: future}},
					{ID: "task-3", GameID: "game-1", Reward: 150, Order: 3, Bonus: &domain.Bonus{Reward: 50, ExpiresAt: past}},
				},
			},
		},
		user: domain.User{ID: "me", GemBalance: 0, CompletedTaskIDs: []string{}, Streak: 0, Boost: 1},
	}
}

func TestCompleteTask_Earn(t *testing.T) {
	fs := newStore()
	eco := service.NewEconomy(fs)

	user, tx, err := eco.CompleteTask("task-1")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if tx.Amount != 100 {
		t.Errorf("want amount 100, got %d", tx.Amount)
	}
	if user.GemBalance != 100 {
		t.Errorf("want balance 100, got %d", user.GemBalance)
	}
	if tx.Type != "earn" {
		t.Errorf("want type earn, got %s", tx.Type)
	}
	if tx.TaskID != "task-1" {
		t.Errorf("want taskId task-1, got %s", tx.TaskID)
	}
	if len(user.CompletedTaskIDs) != 1 || user.CompletedTaskIDs[0] != "task-1" {
		t.Errorf("task-1 not in completedTaskIds: %v", user.CompletedTaskIDs)
	}
}

func TestCompleteTask_ActiveBonus(t *testing.T) {
	fs := newStore()
	eco := service.NewEconomy(fs)

	_, tx, err := eco.CompleteTask("task-2")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	// reward 200 + bonus 50 = 250
	if tx.Amount != 250 {
		t.Errorf("want amount 250 (with bonus), got %d", tx.Amount)
	}
}

func TestCompleteTask_ExpiredBonus(t *testing.T) {
	fs := newStore()
	eco := service.NewEconomy(fs)

	_, tx, err := eco.CompleteTask("task-3")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	// bonus expired — only base reward 150
	if tx.Amount != 150 {
		t.Errorf("want amount 150 (no bonus), got %d", tx.Amount)
	}
}

func TestCompleteTask_Idempotent(t *testing.T) {
	fs := newStore()
	eco := service.NewEconomy(fs)

	if _, _, err := eco.CompleteTask("task-1"); err != nil {
		t.Fatalf("first complete: %v", err)
	}
	if _, _, err := eco.CompleteTask("task-1"); !errors.Is(err, service.ErrAlreadyCompleted) {
		t.Errorf("want ErrAlreadyCompleted, got %v", err)
	}
}

func TestCompleteTask_BalanceMatchesTransactionSum(t *testing.T) {
	fs := newStore()
	eco := service.NewEconomy(fs)

	eco.CompleteTask("task-1") //nolint:errcheck
	eco.CompleteTask("task-2") //nolint:errcheck

	user, _, _ := eco.CompleteTask("task-3")

	var sum int
	for _, tx := range fs.transactions {
		sum += tx.Amount
	}
	if user.GemBalance != sum {
		t.Errorf("balance %d != transaction sum %d", user.GemBalance, sum)
	}
}

func TestCompleteTask_UnknownTask(t *testing.T) {
	eco := service.NewEconomy(newStore())
	if _, _, err := eco.CompleteTask("no-such-task"); !errors.Is(err, service.ErrNotFound) {
		t.Errorf("want ErrNotFound, got %v", err)
	}
}

func TestCounters(t *testing.T) {
	eco := service.NewEconomy(newStore())
	user := domain.User{ID: "me", GemBalance: 500, Streak: 3, Boost: 2}
	c := eco.Counters(user)
	if c.Gems != 500 || c.Streak != 3 || c.Boost != 2 {
		t.Errorf("unexpected counters: %+v", c)
	}
}
