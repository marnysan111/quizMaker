import { useState } from "react"
import {Button} from '@mui/materia'
export default function JoinRoom(roomID) {
    const [roomID, setRoomID] = useState('')
    const [ws, setWs] = useState(null)

    setRoomID(props.roomID)
    const joinRoom = async () => {
        const websocket = new WebSocket('ws://localhost:8080/api/ws?roomID=' + roomID)
        websocket.onopen = () => {
            console.log('Connected to the websocket');
          };
          websocket.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
          };
          websocket.onerror = (error) => {
              console.error("WebSocket Error:", error); // エラーをコンソールに出力
          };
      
          websocket.onclose = (event) => {
              if (event.wasClean) {
                  console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
              } else {
                  console.error('Connection died'); // 例えば、サーバープロセスが停止した場合など
              }
          };
          setWs(websocket);
          
          return () => {
            websocket.close();
          };
    }
    
    return (
        <>
            <Button onClick={joinRoom}>join room</Button>
        </>
    )
}