import "@total-typescript/ts-reset";
import { Server } from "socket.io";
import { Store } from "../decorators/store";
import { SocketData } from "./io";

declare module "fastify" {
  export interface FastifyInstance {
    config: {
      PORT: number;
      HASH: string;
    };
    io: Server;
    store: Store;
  }
  export interface FastifyRequest {
    user: {
      id: string;
      username: string;
    };
  }
}
