import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import queryString from 'query-string';
import { io } from 'socket.io-client';
import ChatHeader from '../components/chat-header/ChatHeader';
import ChatInput from '../components/chat-input/ChatInput';
import ChatConversation from '../components/chat-conversation/ChatConversation';
import { Flex, Box } from '@chakra-ui/react';

let socket;

const Chat = () => {
  const location = useLocation();
  const { chatState, conversation, setConversation } = useChat();
  const ENDPOINT = 'http://localhost:5000';

  // const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState();
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
      setConversation([...conversation, newMessage]);
    });
    return () => {
      socket.off();
    };
  }, [conversation]);

  return (
    <Flex
      w={['100%', '100%', 600]}
      h='100vh'
      margin='auto'
      px={2}
      direction={'column'}
      justifyContent={'center'}
    >
      <Flex
        border='1px solid'
        borderColor={'teal.400'}
        direction={'column'}
        borderRadius='md'
        h='90%'
        overflow={'hidden'}
      >
        <ChatHeader />
        <ChatConversation />
        <ChatInput socket={socket} />
      </Flex>
    </Flex>
  );
};

export default Chat;
