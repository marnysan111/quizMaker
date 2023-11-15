import React, { useState, useContext } from 'react';
import { RoomContext } from '../contexts/roomContext';
import { AlertContext } from '../contexts/alertContext';
import axios from 'axios';
const CreateRoom = () => {
    const [roomName, setRoomName] = useState('');
    const { fetchRooms } = useContext(RoomContext);
    const { showAlert } = useContext(AlertContext);


    const createRoom = async () => {
        if (!roomName || roomName.trim() === "") {
            alert("Room name cannot be empty!");
            return;
        }
    
        // 特殊文字を含む場合の正規表現
        const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (specialChars.test(roomName)) {
            alert("Room name cannot contain special characters!");
            return;
        }
        try {
            const response = await axios.post('/api/createroom', { roomName: roomName });
            fetchRooms()
            setRoomName("")
            SuccessAlert(roomName)
        } catch (error) {
            if (error.response) {
                // サーバーがエラーレスポンスを返した場合
                console.error('Error creating room:', error.response.data);
                alert(`Error: ${error.response.data.error || 'Something went wrong'}`);
            } else if (error.request) {
                // リクエストは送信されたが、レスポンスを受け取っていない場合
                console.error('No response was received:', error.request);
                alert('No response from the server. Please try again later.');
            } else {
                // リクエストの設定中に何らかの問題が発生した場合
                console.error('Error setting up the request:', error.message);
                alert(`Error: ${error.message}`);
            }
        }
    };

    const SuccessAlert = (name) => {
        const message = '部屋の作成に成功しました　部屋名：' + name
        showAlert('success', message)
    }

    return (
        <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
            />
            </div>
            <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <button className="bg-cyberBlue transition-transform transform hover:scale-110 ease-out duration-300 text-white rounded-lg w-full h-full"onClick={createRoom}>
                部屋の作成
            </button>
            </div>
        </div>
        </div>
    );
};

export default CreateRoom;