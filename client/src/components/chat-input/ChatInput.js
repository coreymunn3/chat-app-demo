import React, { useState } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { Flex, FormControl, Input } from '@chakra-ui/react';
import SendButton from '../send-button/SendButton';

const ChatInput = (props) => {
  const { socket, inputProps, ...rest } = props;
  const { message, setMessage, conversation } = useChat();

  const handleChange = (e) => setMessage(e.target.value);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      console.log(message);
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <Flex
      direction={'row'}
      h='3rem'
      borderTop='1px solid'
      borderTopColor={'teal.400'}
      {...rest}
    >
      <FormControl flex={1}>
        <Input
          borderRadius={0}
          h='100%'
          outline='none'
          focusBorderColor='none'
          value={message}
          onChange={handleChange}
          {...inputProps}
        />
      </FormControl>
      <SendButton onClick={sendMessage} />
    </Flex>
  );
};

export default ChatInput;
