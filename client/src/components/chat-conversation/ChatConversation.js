import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { useChat } from '../../contexts/ChatContext';
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatConversation = (props) => {
  const { conversation, setConversation } = useChat();
  return (
    <Box flex={1} p={4}>
      <Stack>
        {conversation.map(({ user, text }, idx) => (
          <Box key={idx}>{text}</Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ChatConversation;
