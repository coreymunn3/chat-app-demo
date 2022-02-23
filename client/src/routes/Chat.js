import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import queryString from 'query-string';
import { io } from 'socket.io-client';

let socket;

const Chat = () => {
  const location = useLocation();
  const { chatState } = useChat();
  const ENDPOINT = 'http://localhost:5000';

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  // effect for handling joining a room
  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on('connect', () => {
      console.log('socket connected');
      console.log(socket);
    });

    socket.emit('join', chatState, () => {});

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [chatState, ENDPOINT]);

  // effect for handling messages
  useEffect(() => {
    socket.on('message', (newMessage) => {
      console.log(newMessage);
      setMessages([...messages, newMessage]);
    });
  }, [messages]);

  // effect for sending messages
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  // console.log(message, messages);

  return (
    <div>
      <h1>Welcome to Chat</h1>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
        style={{ border: '1px solid black' }}
      />
      <ul>
        {messages.map((message) => (
          <li>
            {message.text} from {message.user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
