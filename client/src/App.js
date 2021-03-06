import './App.css';
import * as io from "socket.io-client";
import { useState } from 'react';
import Chat from './Chat.js';


const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);


  // create condition which not allow users to chat without a user name

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };


  return (
    <div className="App">
    {!showChat ? (
      <div className="joinChatContainer">
        <h1 className='signWelcome'>Welcome To Chat App</h1>
        <input className='inPuts'
          type="text"
          placeholder="Enter User Name..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input className='inPuts'
          type="text"
          placeholder="Room ID..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join To Room</button>
      </div>
    ) : (
      <Chat socket={socket} username={username} room={room} />
    )}
  </div>
);
}


export default App;
