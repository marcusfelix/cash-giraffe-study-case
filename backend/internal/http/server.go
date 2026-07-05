package http

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/rewardapp/backend/internal/service"
	"github.com/rewardapp/backend/internal/store"
)

// Server holds dependencies and owns the HTTP mux.
type Server struct {
	store   store.Store
	economy *service.Economy
	http    *http.Server
}

func NewServer(addr string, st store.Store, eco *service.Economy) *Server {
	s := &Server{store: st, economy: eco}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", s.handleHealth())
	mux.HandleFunc("GET /games", s.handleGetGames())
	mux.HandleFunc("GET /games/{id}", s.handleGetGame())
	mux.HandleFunc("GET /user", s.handleGetUser())
	mux.HandleFunc("POST /tasks/{id}/complete", s.handleCompleteTask())
	mux.HandleFunc("GET /user/transactions", s.handleGetTransactions())

	s.http = &http.Server{
		Addr:         addr,
		Handler:      logging(cors(mux)),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	return s
}

func (s *Server) ListenAndServe() error {
	log.Printf("listening on %s", s.http.Addr)
	return s.http.ListenAndServe()
}

func (s *Server) Shutdown(ctx context.Context) error {
	return s.http.Shutdown(ctx)
}

// ServeHTTP allows Server to be used directly with httptest in tests.
func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.http.Handler.ServeHTTP(w, r)
}
