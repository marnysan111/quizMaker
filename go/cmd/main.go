package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/marnysan111/quizMaker/handler"
	"github.com/marnysan111/quizMaker/room"
)

func main() {
	go room.RoomHub.Run()
	http.HandleFunc("/", serveHome)
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		handler.Handle(room.RoomHub, w, r)
	})
	http.HandleFunc("/room", handler.ListRoom)
	http.HandleFunc("/hoge", hoge)
	http.HandleFunc("/createroom", handler.CreateRoom)

	log.Println("Server started on :8080")
	http.ListenAndServe(":8080", nil)
}

func hoge(w http.ResponseWriter, r *http.Request) {
	fmt.Println("aaa")
	fmt.Fprint(w, "Hello World")
	room.ListRoomsName()
}

func serveHome(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL)
	if r.URL.Path != "/" {
		http.Error(w, "Not found", http.StatusNotFound)
		return
	}
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	http.ServeFile(w, r, "home.html")
}
