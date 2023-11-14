import React, { useState } from 'react';
import RoomList from "../components/roomList"
import CreateRoom from "../components/createRoom"
import { RoomProvider } from '../contexts/roomContext';
import { AlertProvider } from '../contexts/alertContext';
import AlertMessage from '../components/alert';
export default function Room() {
    return (    
        <RoomProvider>
            <AlertProvider>
                <AlertMessage />
                <CreateRoom/>
                <RoomList />
            </AlertProvider>
        </RoomProvider>
    )
}