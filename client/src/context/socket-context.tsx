"use client";

import {
  CurrentChannel,
  FriendRequestsReceived,
  FriendRequestsSent,
  Friends,
  Session,
  userAtom,
} from "@/lib/store";
import {
  ChannelMessageWithStatus,
  FilteredMessage,
  FriendRequestQueryResponse,
  FriendRequestReceived,
  FriendRequestSent,
  SocketData,
  User,
} from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Socket, io as ClientIO } from "socket.io-client";

type SocketContext = {
  isConnected: boolean;
  socket: Socket | null;
  appendChannelMessage: (message: FilteredMessage) => void;
  updateChannelMessage: (message: FilteredMessage, messageId: string) => void;
  appendFriend: (friend: User) => void;
  removeFriend: (friendId: string) => void;
  appendFriendRequestsSent: (FriendRequest: FriendRequestSent) => void;
  removeFriendRequestsSent: (requestId: string) => void;
  appendFriendRequestsReceived: (FriendRequest: FriendRequestReceived) => void;
  removeFriendRequestsReceived: (requestId: string) => void;
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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(socket?.connected || false);
  const session = useRecoilValue(Session);
  const user = useRecoilValue(userAtom);
  const setFriends = useSetRecoilState(Friends);
  const setFriendRequestsReceived = useSetRecoilState(FriendRequestsReceived);
  const setFriendRequestsSents = useSetRecoilState(FriendRequestsSent);
  const [currentChannel, setCurrentChannel] = useRecoilState(CurrentChannel);

  const onConnect = () => setIsConnected(true);
  const onDisconnect = () => setIsConnected(false);

  function appendChannelMessage(message: FilteredMessage) {
    setCurrentChannel((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, message],
      };
    });
  }

  function updateChannelMessage(updates: FilteredMessage, id: string) {
    setCurrentChannel((prev) => {
      if (!prev) return null;

      const messages = prev.messages.map((message) => {
        if (message.id !== id) return message;
        return updates;
      });

      return {
        ...prev,
        messages: messages,
      };
    });
  }

  function ReceiveChannelMessage(message: ChannelMessageWithStatus) {
    if (message.senderId === user?.memberId) return;
    if (message.channelId !== currentChannel?.id) return;
    const {
      sender: {
        user: { avatar, name },
      },
      ...rest
    } = message;
    appendChannelMessage({
      ...rest,
      senderAvatar: avatar,
      senderName: name,
    });
  }

  function appendFriendRequestsSent(FriendRequest: FriendRequestSent) {
    setFriendRequestsSents((prev) => [...prev, FriendRequest]);
  }

  function removeFriendRequestsSent(requestId: string) {
    setFriendRequestsSents((prev) =>
      prev.filter((request) => request.id !== requestId),
    );
  }

  function appendFriendRequestsReceived(FriendRequest: FriendRequestReceived) {
    setFriendRequestsReceived((prev) => [...prev, FriendRequest]);
  }

  function removeFriendRequestsReceived(requestId: string) {
    setFriendRequestsReceived((prev) =>
      prev.filter((request) => request.id !== requestId),
    );
  }

  function appendFriend(friend: User) {
    setFriends((prev) => [...prev, friend]);
  }

  function removeFriend(friendId: string) {
    setFriends((prev) => prev.filter((friend) => friend.id !== friendId));
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
    setCurrentChannel((prev) => {
      if (!prev) return null;

      if (prev.ownerId === data.id) {
        const owner = { ...prev.owner, isActive: data.isActive };
        return { ...prev, owner };
      }
      const updatedMemberList = prev.members.map((member) => {
        console.log(member, data);
        if (member.id === data.memberId) {
          const user = { ...member.user, isActive: data.isActive };
          const updatedMember = { ...member, user: user };
          return updatedMember;
        }
        return member;
      });
      return { ...prev, members: updatedMemberList };
    });
  }

  useEffect(() => {
    if (session?.status === "authenticated" && user) {
      const socketInstance = ClientIO(process.env.NEXT_PUBLIC_SOCKET_URL, {
        path: "/socket.io",
        autoConnect: false,
        withCredentials: true,
        auth: {
          id: user.id,
          username: user.username,
          memberId: user.memberId,
        },
      });
      socketInstance.connect();
      socketInstance.on("connect", onConnect);
      socketInstance.on("disconnect", onDisconnect);
      socketInstance.on("channel:received-message", ReceiveChannelMessage);
      socketInstance.on("user:status", handleUserStatus);
      socketInstance.on(
        "friends:request-accepted",
        (data: FriendRequestQueryResponse) => {
          removeFriendRequestsSent(data.id);
          appendFriend(data.receiver);
        },
      );
      socketInstance.on(
        "friends:request-received",
        appendFriendRequestsReceived,
      );
      socketInstance.on("friends:request-declined", removeFriendRequestsSent);
      socketInstance.on(
        "friends:request-canceled",
        removeFriendRequestsReceived,
      );
      setSocket(socketInstance);
    }

    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
      socket?.off("user:status");
      socket?.off("friends:request-accepted");
      socket?.off("friends:request-declined");
      socket?.off("friends:request-received");
      socket?.off("friends:request-canceled");
      socket?.off("channel:received-message");
      socket?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.status, user?.id]);
  return (
    <SocketContext.Provider
      value={{
        isConnected,
        socket,
        appendChannelMessage,
        updateChannelMessage,
        appendFriend,
        removeFriend,
        appendFriendRequestsSent,
        removeFriendRequestsSent,
        appendFriendRequestsReceived,
        removeFriendRequestsReceived,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { useSocket, SocketContextProvider };
