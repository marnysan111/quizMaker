import React, { createContext, useState } from 'react';
import axios from 'axios';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('/api/room');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  // 他のコンポーネントで使用できるように値をコンテキストプロバイダーに渡します
  return (
    <RoomContext.Provider value={{ rooms, fetchRooms }}>
      {children}
    </RoomContext.Provider>
  );
};



