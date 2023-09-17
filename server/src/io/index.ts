import { FastifyInstance } from "fastify";
import { ExtendedError } from "socket.io/dist/namespace";
import { Socket } from "socket.io";
import { Prisma } from "../lib";
import { authenticate } from "./middlewares";
import {
  registerChannelsHandler,
  registerConversationHandler,
  registerFriendsHandler,
} from "./handlers";

const initilizeSocketIO = (app: FastifyInstance) => {
  function onConnection(socket: Socket) {
    console.log(`${socket.data.username} has connected with id: ${socket.id}`);
    
    handleOnConnection(socket);
    registerFriendsHandler(app, socket);
    registerConversationHandler(app, socket);
    registerChannelsHandler(app, socket);

    socket.on("disconnect", async (reason) => {
      await Prisma.user.update({
        where: {
          id: socket.data.id,
        },
        data: {
          isActive: false,
          lastSeen: new Date(),
        },
      });

      app.store.removeSocket(socket.data.username, socket.id);
      app.io.emit("user:status", { ...socket.data, isActive: false });
      console.log(`${socket.data.username} disconnected due to ${reason}`);
    });
  }

  async function handleOnConnection(socket: Socket) {
    //TODO: get the IOHandler typed properly to get socket.data completion
    app.store.addClient(socket.data, socket.id);

    await Prisma.user.update({
      where: {
        id: socket.data.id,
      },
      data: {
        isActive: true,
      },
    });
    app.io.emit("user:status", { ...socket.data, isActive: true });
    console.log(app.store.socketClients);
  }

  async function joinChannels(
    socket: Socket,
    next: (err?: ExtendedError) => void
  ) {
    try {
      const member = await Prisma.member.findUnique({
        where: {
          id: socket.data.memberId,
        },
        include: {
          channels: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!member) {
        throw new Error(
          `Could not fetch member with id of: ${socket.data.memberId}`
        );
      }

      const channels = member.channels.map((channel) => channel.id);
      socket.join(channels);
      console.log(`${socket.data.username} joined channels ${channels}`);
      next();
    } catch (err) {
      console.log(err);
    }
  }

  app.io.use(authenticate);
  app.io.use(joinChannels); // on connection user joins all channels they are members of.
  app.io.on("connection", onConnection);
};

export { initilizeSocketIO };
