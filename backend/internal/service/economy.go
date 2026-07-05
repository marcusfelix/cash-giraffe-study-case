package service

import (
	"fmt"
	"time"

	"github.com/rewardapp/backend/internal/domain"
	"github.com/rewardapp/backend/internal/store"
)

const defaultUserID = "me"

// Economy implements gem-economy rules against an abstract Store.
type Economy struct {
	store store.Store
}

func NewEconomy(s store.Store) *Economy {
	return &Economy{store: s}
}

// CompleteTask awards gems for a task, respecting idempotency and bonus expiry.
// Returns ErrAlreadyCompleted if the task was already done.
// Returns ErrNotFound if the task does not exist.
func (e *Economy) CompleteTask(taskID string) (domain.User, domain.GemTransaction, error) {
	user, err := e.store.User(defaultUserID)
	if err != nil {
		return domain.User{}, domain.GemTransaction{}, fmt.Errorf("load user: %w", err)
	}

	if contains(user.CompletedTaskIDs, taskID) {
		return domain.User{}, domain.GemTransaction{}, ErrAlreadyCompleted
	}

	task, err := e.findTask(taskID)
	if err != nil {
		return domain.User{}, domain.GemTransaction{}, err
	}

	amount := task.Reward
	if task.Bonus != nil {
		exp, parseErr := time.Parse(time.RFC3339, task.Bonus.ExpiresAt)
		if parseErr == nil && time.Now().Before(exp) {
			amount += task.Bonus.Reward
		}
	}

	tx := domain.GemTransaction{
		ID:        newID(),
		Type:      "earn",
		Amount:    amount,
		TaskID:    taskID,
		CreatedAt: time.Now().UTC().Format(time.RFC3339),
	}

	if err := e.store.AppendTransaction(tx); err != nil {
		return domain.User{}, domain.GemTransaction{}, fmt.Errorf("append transaction: %w", err)
	}

	user.GemBalance += amount
	user.CompletedTaskIDs = append(user.CompletedTaskIDs, taskID)

	if err := e.store.SaveUser(user); err != nil {
		return domain.User{}, domain.GemTransaction{}, fmt.Errorf("save user: %w", err)
	}

	return user, tx, nil
}

// Counters derives the Home top-bar snapshot from a User.
func (e *Economy) Counters(user domain.User) domain.Counters {
	return domain.Counters{
		Streak: user.Streak,
		Boost:  user.Boost,
		Gems:   user.GemBalance,
	}
}

func (e *Economy) findTask(taskID string) (domain.Task, error) {
	games, err := e.store.Games()
	if err != nil {
		return domain.Task{}, fmt.Errorf("load games: %w", err)
	}
	for _, g := range games {
		for _, t := range g.Tasks {
			if t.ID == taskID {
				return t, nil
			}
		}
	}
	return domain.Task{}, ErrNotFound
}

func contains(ids []string, target string) bool {
	for _, id := range ids {
		if id == target {
			return true
		}
	}
	return false
}
