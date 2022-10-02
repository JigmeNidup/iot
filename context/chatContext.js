import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

export default function ChatContextProvider({ children }) {
  const [user, setUser] = useState();
  const [room, setRoom] = useState("newiothomeroom");

  const [state, setUpdate] = useState(Math.random());
  return (
    <ChatContext.Provider
      value={{ user, setUser, room, setRoom, state, setUpdate }}
    >
      {children}
    </ChatContext.Provider>
  );
}
