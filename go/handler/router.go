package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/marnysan111/quizMaker/room"
)

type RoomRequest struct {
	RoomName string `json:"roomName"`
}

func CreateRoom(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST is allowed", http.StatusMethodNotAllowed)
		return
	}
	var roomReq RoomRequest
	err := json.NewDecoder(r.Body).Decode(&roomReq)
	if err != nil {
		http.Error(w, "Failed to decode JSON", http.StatusBadRequest)
		return
	}
	fmt.Println(roomReq.RoomName)
	roomID := room.GenerateRandomRoomID()          // ここでIDを生成
	room := room.NewRoom(roomID, roomReq.RoomName) // 新しい部屋のインスタンスを作成
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(room)
}

func ListRoom(w http.ResponseWriter, r *http.Request) {
	rooms := room.RoomHub.ListRooms()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rooms)
}
