# Cash Giraffe

A reward app where users play curated mobile games and earn gems redeemable for real-world value. Built with Expo (React Native) and a Go + SQLite backend.

## Structure

```
app/        Expo React Native app (iOS, Android, web)
backend/    Go HTTP server with SQLite persistence
.context/   Shared docs: concept, design system, data model, tasks
```

## Quick start

```bash
# Install app dependencies
cd app && npm install

# Run backend + web app together
npm run dev

# Or run each separately:
npm run backend      # Go server only (port 8080)

# Run app — choose a target:
npm run app          # Expo dev server (scan QR with Expo Go)
npm run app:web      # Browser
npm run app:ios      # iOS Simulator
npm run app:android  # Android Emulator
```

Both processes run independently. Start the backend first so the app has an API to connect to.

## Backend

**Base URL:** `http://localhost:8080`

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/games` | All games with tasks |
| `GET` | `/games/{id}` | Single game |
| `GET` | `/user` | Current user state |
| `POST` | `/tasks/{id}/complete` | Complete a task, earn gems |
| `GET` | `/user/transactions` | Gem transaction ledger |

**Configuration** (environment variables):

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8080` | HTTP listen port |
| `DB_PATH` | `app.db` | SQLite database file path |

**Run tests:**

```bash
npm test
# or
cd backend && go test ./...
```

## Database

The SQLite database is a single file. Its location depends on how the server is run:

| Context | Default path |
|---------|-------------|
| Local (`go run`) | `backend/app.db` (next to the working directory) |
| Docker | `/data/app.db` (inside the container's `/data` volume) |

Override with `DB_PATH=/your/path/app.db`.

On first start the file is created, migrations run, and the game catalog is seeded automatically. The file includes WAL mode journals (`app.db-wal`, `app.db-shm`) while the server is running — back up the `.db` file only when the server is stopped, or use SQLite's `VACUUM INTO` for a safe online backup.

## Docker

```bash
# Build
docker build -t rewardapp-backend ./backend

# Run with a named volume so the database survives restarts
docker run -p 8080:8080 -v rewardapp-data:/data rewardapp-backend

# Custom port
docker run -p 9000:9000 -e PORT=9000 -v rewardapp-data:/data rewardapp-backend
```

The `/data` volume holds the SQLite file. Pass `-v /host/path:/data` to use a host directory instead.

## Seed data

The backend ships with 10 real games and 52 tasks sourced from the App Store. On first run the database is created and seeded automatically. The seed lives in `backend/internal/store/seed.go`.

## Tech stack

| Layer | Technology |
|-------|-----------|
| App | Expo 54, React Native, TypeScript |
| Backend | Go 1.22, `net/http` |
| Database | SQLite via `modernc.org/sqlite` (pure-Go, no CGO) |
| Styling | NativeWind / Tailwind design tokens |
