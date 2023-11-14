package handler

import (
	"encoding/json"
	"net/http"

	"github.com/marnysan111/quizMaker/room"
	"golang.org/x/exp/slices"
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
	if !slices.Contains(room.RoomHub.ListRooms(), roomReq.RoomName) {
		roomID := room.GenerateRandomRoomID()          // ここでIDを生成
		room := room.NewRoom(roomID, roomReq.RoomName) // 新しい部屋のインスタンスを作成
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(room)
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest) // 400 Bad Request
		errorMessage := map[string]string{"error": "同じ部屋が既に登録されています"}
		json.NewEncoder(w).Encode(errorMessage)
	}
}

func ListRoom(w http.ResponseWriter, r *http.Request) {
	rooms := room.RoomHub.ListRoomsInfo()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rooms)
}
