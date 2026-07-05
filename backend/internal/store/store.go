package store

import "github.com/rewardapp/backend/internal/domain"

// Store is the persistence interface the service layer depends on.
// Games and tasks are read-only (seeded at startup).
// User state and transactions are mutable and must survive restart.
type Store interface {
	Games() ([]domain.Game, error)
	Game(id string) (domain.Game, error)

	User(id string) (domain.User, error)
	SaveUser(user domain.User) error

	AppendTransaction(tx domain.GemTransaction) error
	Transactions(userID string) ([]domain.GemTransaction, error)
}
