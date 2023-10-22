APP_NAME=QuizMaker
BIN_DIR=bin
SRC_DIR=cmd/


.PHONY: build
build:
	go build -o $(BIN_DIR)/$(APP_NAME) $(SRC_DIR)/main.go

.PHONY: run
run: build
	./$(BIN_DIR)/$(APP_NAME)