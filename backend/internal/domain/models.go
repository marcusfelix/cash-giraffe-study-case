package domain

// Bonus is a time-limited extra reward attached to a Task.
type Bonus struct {
	Reward    int    `json:"reward"`
	ExpiresAt string `json:"expiresAt"` // ISO-8601
}

// Task is a trail item that awards gems on completion.
type Task struct {
	ID     string  `json:"id"`
	GameID string  `json:"gameId"`
	Title  string  `json:"title"`
	Reward int     `json:"reward"`
	Order  int     `json:"order"`
	Bonus  *Bonus  `json:"bonus,omitempty"`
}

// Game holds a curated mobile game and its ordered task trail.
type Game struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	IconURL     string `json:"iconUrl"`
	BannerURL   string `json:"bannerUrl"`
	AppStoreURL string `json:"appStoreUrl"`
	Tasks       []Task `json:"tasks"`
}

// User is the single local user (no auth, id "me").
type User struct {
	ID               string   `json:"id"`
	GemBalance       int      `json:"gemBalance"`
	CompletedTaskIDs []string `json:"completedTaskIds"`
	Streak           int      `json:"streak"`
	Boost            int      `json:"boost"` // TODO(dev): apply multiplier once product decision is made
}

// GemTransaction is an immutable ledger entry.
type GemTransaction struct {
	ID        string `json:"id"`
	Type      string `json:"type"` // "earn"; extend with "redeem" later
	Amount    int    `json:"amount"`
	TaskID    string `json:"taskId,omitempty"`
	CreatedAt string `json:"createdAt"` // ISO-8601
}

// Counters is a derived read-only snapshot for the Home top bar.
type Counters struct {
	Streak int `json:"streak"`
	Boost  int `json:"boost"`
	Gems   int `json:"gems"`
}
