import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { IoSend } from 'react-icons/io5';

const SendButton = (props) => {
  const { onClick, ...other } = props;
  return (
    <Button
      colorScheme={'teal'}
      borderRadius={0}
      h='100%'
      w='20%'
      onClick={onClick}
      {...other}
    >
      <Icon as={IoSend} boxSize={4} ml={1} />
    </Button>
  );
};

export default SendButton;
