import { FastifyInstance } from "fastify";
import type { Socket } from "socket.io";

export type IOHandler = (io: FastifyInstance, socket: Socket) => void;

export type SocketClient = {
  socketIds: string[];
  userId: string;
  username: string;
};

export type SocketClients = Record<string, SocketClient>;

export type SocketData = {
  id: string;
  username: string;
  memberId: string;
};

export type DirectMessage = {
  friend: {
    id: string;
    username: string;
  };
  conversationId: string;
  content: string;
};

export type SocketEventListener<T> =
  | ((payload: T) => void)
  | ((payload: T, ack: Acknowledgment) => void);

export type Acknowledgment = (arg: {
  message: string;
  success: boolean;
  data: any;
}) => void;
