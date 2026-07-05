# syntax=docker/dockerfile:1

# ── build stage ──────────────────────────────────────────────────────────────
FROM golang:1.22-alpine AS builder

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /bin/server ./cmd/server

# ── runtime stage ─────────────────────────────────────────────────────────────
FROM alpine:3.20

# Non-root user for security
RUN addgroup -S app && adduser -S app -G app

WORKDIR /app

COPY --from=builder /bin/server ./server

# /data is the persistent volume — the SQLite file lives here.
# Mount a named volume or host path at /data to survive container restarts.
RUN mkdir /data && chown app:app /data
VOLUME ["/data"]

USER app

ENV PORT=8080
ENV DB_PATH=/data/app.db

EXPOSE 8080

ENTRYPOINT ["./server"]
