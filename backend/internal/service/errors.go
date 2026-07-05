package service

import "errors"

var ErrAlreadyCompleted = errors.New("task already completed")
var ErrNotFound = errors.New("not found")
