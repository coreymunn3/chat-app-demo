import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Spacer,
  Stack,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  Text,
} from '@chakra-ui/react';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { useChat } from '../../contexts/ChatContext';

const ChatHeader = (props) => {
  const { socket } = props;
  const navigate = useNavigate();
  const { chatState, roomAndUsers } = useChat();
  const { users: usersInRoom } = roomAndUsers;

  const disconnect = () => {
    socket.disconnect();
    navigate('/');
  };

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
        <Popover>
          <PopoverTrigger>
            <Button
              variant={'ghost'}
              _hover={{ backgroundColor: 'teal.600' }}
              outline={'none'}
            >
              {chatState.room || 'Room'}
            </Button>
          </PopoverTrigger>
          <PopoverContent bgColor={'teal.800'}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>In This Room</PopoverHeader>
            <PopoverBody>
              {usersInRoom &&
                usersInRoom.map(({ name }) => <Text key={name}>{name}</Text>)}
            </PopoverBody>
          </PopoverContent>
        </Popover>
        {/* <Box>{chatState.room || 'Room'}</Box> */}
      </Stack>
      <Spacer />
      <Icon as={IoClose} boxSize={6} cursor={'pointer'} onClick={disconnect} />
    </Flex>
  );
};

export default ChatHeader;
