package room

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
)

var RoomHub = NewHub()

func GenerateRandomRoomID() string {
	b := make([]byte, 12) // 12バイトのランダムデータを生成
	rand.Read(b)
	return base64.URLEncoding.EncodeToString(b)
}

func NewRoom(roomID string, name string) map[string]string {
	RoomHub.Rooms[roomID] = &Room{
		ID:      roomID,
		Name:    name,
		Clients: make(map[*Client]bool),
	}
	response := map[string]string{
		"roomID":   roomID,
		"roomName": name,
	}
	fmt.Println("[Create Room]RoomID:", roomID, "Name:", name)
	return response
}
