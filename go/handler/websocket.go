package handler

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/marnysan111/quizMaker/room"
)

var upgrader = &websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func Handle(hub *room.Hub, w http.ResponseWriter, r *http.Request) {
	roomID := r.URL.Query().Get("roomID")
	if roomID == "" {
		http.Error(w, "Room ID is required", http.StatusBadRequest)
		return
	}
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("error upgradeing connection:", err)
		return
	}
	client := &room.Client{Hub: hub, Conn: conn, Send: make(chan []byte, 256), RoomID: roomID}
	client.Hub.Register <- client

	go client.WritePump()
	go client.ReadPump()
}
