package http

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/rewardapp/backend/internal/domain"
	"github.com/rewardapp/backend/internal/service"
	"github.com/rewardapp/backend/internal/store"
)

func (s *Server) handleHealth() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
	}
}

func (s *Server) handleGetGames() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		games, err := s.store.Games()
		if err != nil {
			writeError(w, http.StatusInternalServerError, err)
			return
		}
		writeJSON(w, http.StatusOK, games)
	}
}

func (s *Server) handleGetGame() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		game, err := s.store.Game(id)
		if errors.Is(err, store.ErrNotFound) {
			writeError(w, http.StatusNotFound, err)
			return
		}
		if err != nil {
			writeError(w, http.StatusInternalServerError, err)
			return
		}
		writeJSON(w, http.StatusOK, game)
	}
}

func (s *Server) handleGetUser() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user, err := s.store.User("me")
		if err != nil {
			writeError(w, http.StatusInternalServerError, err)
			return
		}
		writeJSON(w, http.StatusOK, user)
	}
}

func (s *Server) handleCompleteTask() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		taskID := r.PathValue("id")
		user, tx, err := s.economy.CompleteTask(taskID)
		if errors.Is(err, service.ErrAlreadyCompleted) {
			writeError(w, http.StatusBadRequest, err)
			return
		}
		if errors.Is(err, service.ErrNotFound) {
			writeError(w, http.StatusNotFound, err)
			return
		}
		if err != nil {
			writeError(w, http.StatusInternalServerError, err)
			return
		}
		writeJSON(w, http.StatusOK, map[string]interface{}{
			"user":        user,
			"transaction": tx,
		})
	}
}

func (s *Server) handleGetTransactions() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		txs, err := s.store.Transactions("me")
		if err != nil {
			writeError(w, http.StatusInternalServerError, err)
			return
		}
		if txs == nil {
			txs = []domain.GemTransaction{}
		}
		writeJSON(w, http.StatusOK, txs)
	}
}

func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}

func writeError(w http.ResponseWriter, status int, err error) {
	writeJSON(w, status, map[string]string{"error": err.Error()})
}
