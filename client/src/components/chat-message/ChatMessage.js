import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { calculateRelativeTime } from '../../utils/util';

const ChatMessage = (props) => {
  const { user, text, time: sentTime, currentUser } = props;
  const isMyMessage = currentUser === user.name;
  const relativeSentTime = calculateRelativeTime(
    new Date() - new Date(sentTime)
  );
  if (user.name === 'admin') {
    // it's an admin message, render that differently
    return (
      <Text align='center' color={'gray.400'}>
        {text}
      </Text>
    );
  }
  return (
    <Flex
      w='100%'
      alignItems={'center'}
      direction={isMyMessage ? 'row' : 'row-reverse'}
    >
      {/* a spacer */}
      <Box flex={1} />
      {/* saying who it's from and when */}
      <Box p={2} maxW={'30%'}>
        <Text align={isMyMessage ? 'right' : 'left'} color={'gray.300'}>
          {user.name}
        </Text>
        <Text
          align={isMyMessage ? 'right' : 'left'}
          color={'gray.300'}
          fontSize={'xs'}
        >
          {relativeSentTime + ' ago'}
        </Text>
      </Box>
      {/* the actual message sent */}
      <Box
        p={2}
        color={isMyMessage ? 'white' : 'black'}
        bgColor={isMyMessage ? 'teal.400' : 'gray.200'}
        borderRadius='md'
      >
        {text}
      </Box>
    </Flex>
  );
};

export default ChatMessage;
