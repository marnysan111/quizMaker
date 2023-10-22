import React, { useState, useEffect } from 'react';

const WebSocketClient = () => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080/ws');
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
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send('Hello from React!');
    }
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketClient;