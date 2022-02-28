import React from 'react';
import { Flex, Spacer, Box, Stack, Icon } from '@chakra-ui/react';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { useChat } from '../../contexts/ChatContext';

const ChatHeader = (props) => {
  const { chatState } = useChat();
  return (
    <Flex
      direction={'row'}
      alignItems={'center'}
      color={'white'}
      bgColor={'teal.400'}
      p={4}
    >
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Icon as={HiOutlineStatusOnline} boxSize={6} />
        <Box>{chatState.room || 'Room'}</Box>
      </Stack>
      <Spacer />
      <Icon as={IoClose} boxSize={6} cursor={'pointer'} />
    </Flex>
  );
};

export default ChatHeader;
