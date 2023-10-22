import React, { useState } from 'react';
import axios from 'axios';

const CreateRoom = () => {
    const [roomName, setRoomName] = useState('');
    const [res, setRes] = useState({roomID: "", roomName: ""})

    const createRoom = async () => {
        try {
            const response = await axios.post('/createroom', { roomName: roomName });
            console.log('Created room with ID:', response.data);
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    return (
        <div>
            <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
            />
            <button onClick={createRoom}>Create Room</button>
        </div>
    );
};

export default CreateRoom;