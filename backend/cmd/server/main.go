package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	apphttp "github.com/rewardapp/backend/internal/http"
	"github.com/rewardapp/backend/internal/service"
	"github.com/rewardapp/backend/internal/store"
)

func main() {
	addr := envOr("PORT", "8080")
	dbPath := envOr("DB_PATH", "app.db")

	st, err := store.Open(dbPath, store.Seed())
	if err != nil {
		log.Fatalf("open store: %v", err)
	}
	defer st.Close()

	eco := service.NewEconomy(st)
	srv := apphttp.NewServer(":"+addr, st, eco)

	go func() {
		if err := srv.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("server: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Printf("shutdown: %v", err)
	}
}

func envOr(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
