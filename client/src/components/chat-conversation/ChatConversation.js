import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { useChat } from '../../contexts/ChatContext';
import ChatMessage from '../chat-message/ChatMessage';
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatConversation = (props) => {
  const { conversation, setConversation, chatState } = useChat();
  return (
    <Box flex={1} p={4} overflow={'scroll'}>
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
      </Stack>
    </Box>
  );
};

export default ChatConversation;
