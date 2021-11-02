import './App.css';
import * as io from "socket.io-client";
import { useState } from 'react';
import Chat from './Chat.js';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');


  // create condition which not allow users to chat without a user name

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
    }
  };


  return (
    <div className='App'>
      <div className='chatheader'>
        <h1> Welcome To Chat App</h1>
      </div>

      <div className='logIn'>
        <div className='inputs'>
          <input type='text' placeholder='Enter User Name' onChange = {(event) => {setUsername(event.target.value)}}/>
          <input type='text' placeholder='Room ID' onChange = {(e) => {setRoom(e.target.value)}}/>
        </div>
        <button onClick = {joinRoom}>Enter Chat</button>
        <Chat socket={socket} username={username} room={room} />

      </div>

    </div>
  );

}


export default App;
