import { Friends } from "@/lib/store";
import { socket } from "@/lib/utils";
import { SocketData } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

type SocketContext = {
  isConnected: boolean;
};

const SocketContext = createContext<SocketContext | null>(null);

const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("useSocket must be used within a SocketContextrovider");

  return context;
};

type Props = {
  children: React.ReactNode;
};

const SocketContextProvider = ({ children }: Props) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const setFriends = useSetRecoilState(Friends);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function handleUserStatus(data: SocketData & { isActive: boolean }) {
      setFriends((prev) => {
        return prev.map((friend) => {
          if (friend.id === data.id) {
            return { ...friend, isActive: data.isActive };
          }
          return friend;
        });
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("user:status", handleUserStatus);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export { useSocket, SocketContextProvider };
