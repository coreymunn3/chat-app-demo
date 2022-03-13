import React, { useRef, useEffect } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { useChat } from '../../contexts/ChatContext';
import ChatMessage from '../chat-message/ChatMessage';

const ChatConversation = (props) => {
  const { conversation, setConversation, chatState } = useChat();
  const messagesEnd = useRef(null);

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <Box flex={1} p={4} overflow={'auto'}>
      <Stack>
        {conversation.map(({ user, text, time }, idx) => (
          <ChatMessage
            key={idx}
            user={user}
            text={text}
            time={time}
            currentUser={chatState.name}
          />
        ))}
        <div ref={messagesEnd}></div>
      </Stack>
    </Box>
  );
};

export default ChatConversation;
