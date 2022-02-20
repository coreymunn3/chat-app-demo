import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { ChatProvider } from './contexts/ChatContext';

ReactDOM.render(
  <ChakraProvider>
    <ChatProvider>
      <App />
    </ChatProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
