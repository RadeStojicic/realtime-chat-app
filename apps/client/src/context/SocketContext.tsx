import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

type TSocketContextType = {
  socket: Socket | null;
  onlineUsers: string[];
};

export const SocketContext = createContext<TSocketContextType | null>(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { authUser } = useAuthContext();
  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:3000", {
        query: { userId: authUser._id },
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
