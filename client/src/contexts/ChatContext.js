import { createContext, useContext, useState, useMemo, useEffect } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [chatState, setChatState] = useState({
    user: null,
    room: null,
  });
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const providerValue = useMemo(
    () => ({
      chatState,
      setChatState,
      message,
      setMessage,
      conversation,
      setConversation,
    }),
    [
      chatState,
      setChatState,
      message,
      setMessage,
      conversation,
      setConversation,
    ]
  );

  return (
    <ChatContext.Provider value={providerValue}>
      {children}
    </ChatContext.Provider>
  );
};
