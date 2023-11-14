package room

type Hub struct {
	Rooms      map[string]*Room
	Register   chan *Client
	Unregister chan *Client
	Broadcast  chan Message
}

type Message struct {
	Data   []byte
	RoomID string
}

type Room struct {
	ID      string
	Name    string
	Clients map[*Client]bool
}

func NewHub() *Hub {
	return &Hub{
		Rooms:      make(map[string]*Room),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.Register:
			roomID := client.RoomID
			room, ok := h.Rooms[roomID]
			if !ok {
				room = &Room{
					ID:      roomID,
					Clients: make(map[*Client]bool),
				}
				h.Rooms[roomID] = room
			}
			room.Clients[client] = true
		// 人がいなくなったら消すから一旦コメントアウト
		// case client := <-h.Unregister:
		// 	roomID := client.RoomID
		// 	if room, ok := h.Rooms[roomID]; ok {
		// 		if _, ok := room.Clients[client]; ok {
		// 			delete(room.Clients, client)
		// 			close(client.Send)
		// 		}

		// 		if len(room.Clients) == 0 {
		// 			delete(h.Rooms, roomID)
		// 		}
		// 	}

		case message := <-h.Broadcast:
			if room, exists := h.Rooms[message.RoomID]; exists {
				for client := range room.Clients {
					select {
					case client.Send <- message.Data:
					default:
						close(client.Send)
						delete(room.Clients, client)
					}
				}
			}
		}

	}
}

func (h *Hub) ListRooms() []string {
	var roomNames []string
	for _, room := range h.Rooms {
		if room.Name != "" {
			roomNames = append(roomNames, room.Name)
		}
	}
	return roomNames
}

type RoomInfo struct {
	RoomID   string
	RoomName string
}

func (h *Hub) ListRoomsInfo() []RoomInfo {
	var roomsInfo []RoomInfo
	for _, room := range h.Rooms {
		if room.Name != "" {
			info := RoomInfo{
				RoomID:   room.ID,
				RoomName: room.Name,
			}
			roomsInfo = append(roomsInfo, info)
		}
	}
	return roomsInfo
}
