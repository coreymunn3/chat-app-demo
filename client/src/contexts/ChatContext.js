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

  const providerValue = useMemo(
    () => ({
      chatState,
      setChatState,
    }),
    [chatState, setChatState]
  );

  return (
    <ChatContext.Provider value={providerValue}>
      {children}
    </ChatContext.Provider>
  );
};
