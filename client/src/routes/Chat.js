import React, { useState, useEffect } from 'react';
import { useChat } from '../contexts/ChatContext';

const Chat = (props) => {
  const chatState = useChat();
  console.log('chat', chatState);

  useEffect(() => {}, []);

  return (
    <div>
      <h1>Welcome to Chat</h1>
    </div>
  );
};

export default Chat;
