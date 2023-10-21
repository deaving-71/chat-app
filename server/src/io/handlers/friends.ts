import { Prisma } from "../../lib";
import { Acknowledgment, IOHandler } from "../../types";

const friendsHandler: IOHandler = (app, socket) => {
  socket.on("friends:send-request", sendRequest);
  socket.on("friends:accept-request", acceptRequest);
  socket.on("friends:decline-request", declineRequest);

  async function sendRequest(receiverUsername: string, cb: Acknowledgment) {
    console.log(receiverUsername);

    try {
      if (receiverUsername === socket.data.username) {
        cb({
          success: false,
          message: "You cannot add yourself.",
          data: null,
        });
        return;
      }

      const user = await Prisma.user.findFirst({
        where: { username: receiverUsername },
      });
      if (!user) {
        cb({
          success: false,
          message: "Could not find a user with this username.",
          data: null,
        });
        return;
      }

      const areFriends = await checkFriendship(
        socket.data.id,
        receiverUsername
      );
      if (areFriends) {
        cb({
          success: false,
          message: "You are already friends with this user.",
          data: null,
        });
        return;
      }

      const requestExists = await Prisma.friendRequest.findFirst({
        where: {
          senderId: socket.data.id,
          receiverId: receiverUsername,
        },
      });
      if (requestExists) {
        cb({
          success: false,
          message: "You have already sent a friend request to this person.",
          data: null,
        });
        return;
      }

      const request = await Prisma.friendRequest.create({
        data: {
          senderId: socket.data.id,
          receiverId: user.id,
        },
        include: {
          receiver: true,
          sender: true,
        },
      });

      app.store.forEachSocket(request.receiver.username, (socketId) => {
        app.io.to(socketId).emit("friends:request-received", request);
      });
      cb({ success: true, message: "Friend request sent.", data: request });
    } catch (err) {
      app.log.error(err);
    }
  }

  async function acceptRequest(senderId: string, cb: Acknowledgment) {
    try {
      const request = await Prisma.friendRequest.findFirst({
        where: {
          senderId,
          receiverId: socket.data.id,
        },
        include: {
          sender: true,
        },
      });
      if (!request) {
        cb({
          success: false,
          message: "Friend request does not exist.",
          data: null,
        });
        return;
      }
      const acceptee = Prisma.user.update({
        where: {
          id: socket.data.id,
        },
        data: {
          friends: {
            connect: { id: senderId },
          },
        },
      });
      const accepted = Prisma.user.update({
        where: {
          id: senderId,
        },
        data: {
          friends: {
            connect: { id: socket.data.id },
          },
        },
      });
      const acceptingRequest = Prisma.friendRequest.delete({
        where: {
          id: request.id,
        },
      });
      await Promise.all([accepted, acceptee, acceptingRequest]);
      cb({ success: true, message: "Friend request accepted.", data: request });
      app.store.forEachSocket(request.sender.username, (socketId) => {
        app.io.to(socketId).emit("friends:request-accepted", request);
      });
    } catch (err) {
      app.log.error(err);
    }
  }

  async function declineRequest(requestId: string, cb: Acknowledgment) {
    try {
      const request = await Prisma.friendRequest.delete({
        where: {
          id: requestId,
        },
        include: {
          sender: true,
        },
      });
      cb({ success: true, message: "Friend request declined.", data: request });
      app.store.forEachSocket(request.sender.username, (socketId) => {
        app.io.to(socketId).emit("friends:request-declined", request);
      });
    } catch (err) {
      app.log.error(err);
    }
  }
};

export async function checkFriendship(
  senderId: string,
  receiverUsername: string
) {
  const user = await Prisma.user.findUniqueOrThrow({
    where: {
      id: senderId,
    },
    include: {
      friends: {
        where: {
          username: receiverUsername,
        },
      },
    },
  });
  return user.friends.length > 0;
}
export default friendsHandler;
