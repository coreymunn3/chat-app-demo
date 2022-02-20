import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import queryString from 'query-string';
import { io } from 'socket.io-client';

let socket;

const Chat = () => {
  const location = useLocation();
  const { chatState } = useChat();
  console.log('chat context', chatState);
  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    // const { queryName, queryRoom } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    socket.on('connect', () => {
      console.log('socket connected');
      console.log(socket);
    });

    socket.emit('join', chatState);

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [chatState, ENDPOINT]);

  return (
    <div>
      <h1>Welcome to Chat</h1>
    </div>
  );
};

export default Chat;
