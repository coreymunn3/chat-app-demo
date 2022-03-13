import { createContext, useContext, useState, useMemo, useEffect } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [chatState, setChatState] = useState({
    name: null,
    room: null,
  });
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [roomAndUsers, setRoomAndUsers] = useState({});

  const providerValue = useMemo(
    () => ({
      chatState,
      setChatState,
      message,
      setMessage,
      conversation,
      setConversation,
      roomAndUsers,
      setRoomAndUsers,
    }),
    [
      chatState,
      setChatState,
      message,
      setMessage,
      conversation,
      setConversation,
      roomAndUsers,
      setRoomAndUsers,
    ]
  );

  return (
    <ChatContext.Provider value={providerValue}>
      {children}
    </ChatContext.Provider>
  );
};
