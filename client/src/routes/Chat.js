import React, { useState, useEffect } from 'react';
import { useChat } from '../contexts/ChatContext';
import { io } from 'socket.io-client';
import ChatHeader from '../components/chat-header/ChatHeader';
import ChatInput from '../components/chat-input/ChatInput';
import ChatConversation from '../components/chat-conversation/ChatConversation';
import { Flex, Box } from '@chakra-ui/react';

let socket;

const Chat = () => {
  const {
    chatState,
    conversation,
    setConversation,
    roomAndUsers,
    setRoomAndUsers,
  } = useChat();
  const ENDPOINT = 'http://localhost:5000';

  // effect for handling joining a room
  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on('connect', () => {
      console.log('socket connected');
      console.log(socket);
    });

    socket.emit('join', chatState, () => {});

    return () => {
      socket.off();
    };
  }, [chatState, ENDPOINT]);

  // effect for handling messages
  useEffect(() => {
    socket.on('message', (newMessage) => {
      setConversation([...conversation, newMessage]);
    });

    socket.on('roomData', (data) => {
      setRoomAndUsers(data);
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
      alignItems={'center'}
    >
      {/* the chat window */}
      <Flex
        border='1px solid'
        borderColor={'teal.400'}
        direction={'column'}
        borderRadius='md'
        h='90%'
        w='100%'
        overflow={'hidden'}
      >
        <ChatHeader socket={socket} />
        <ChatConversation />
        <ChatInput socket={socket} />
      </Flex>
    </Flex>
  );
};

export default Chat;
