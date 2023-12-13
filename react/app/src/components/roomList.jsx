import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { RoomContext } from '../contexts/roomContext';
export default function RoomList() {
    //const [rooms, setRooms] = useState([]);
    const [ws, setWs] = useState(null);
    const [message, setMessages] = useState([])
    const joinRoom = (roomID) => {
        console.log(roomID)
        // 既存のWebSocket接続をクローズ
        if (ws) {
            ws.close();
        }

        const websocket = new WebSocket('ws://localhost:8080/api/ws?roomID=' + roomID);
        websocket.onopen = () => {
            console.log('Connected to the websocket');
        };
        websocket.onmessage = (event) => {
            console.log(event)
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };
        websocket.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };
        websocket.onclose = (event) => {
            if (event.wasClean) {
                console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
            } else {
                console.error('Connection died');
            }
        };
        setWs(websocket);
    };

    const sendMessage = () => {
        if (ws) {
            ws.send('Hello from React!');
        }
    };

    const { rooms, fetchRooms } = useContext(RoomContext);

    useEffect(() => {
      fetchRooms();
    }, []); 

    return (
        <>
        <div className="container mx-auto p-4">
        <div className='text-white p-4 text-lg font-bold'>部屋一覧</div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rooms && rooms.length > 0 ? (
                rooms.map((room, index) => (
                <div key={index} className="border rounded p-4 text-white hover:bg-white hover:text-black transition-transform transform hover:scale-110 ease-out duration-300" onClick={() => joinRoom(room.roomID)}>
                    <h2 className="text-lg font-bold">{room.roomName}</h2>
                    <p>{room.createUserName}</p>
                    <p>{room.roomID}</p>
                </div>
                ))
            ) : (
                <div className='text-white p-4 text-md font-bold'>部屋が作られていません</div>
            )}
            </div>
            <button onClick={sendMessage}>send</button>
            <div className='text-white'>{message}</div>
        </div>
        </>
    )
}