import { Prisma } from "../../lib";
import { IOHandler, DirectMessage, Acknowledgment } from "../../types";
import { checkFriendship } from "./friends";

const handler: IOHandler = (app, socket) => {
  socket.on("direct-message:send-message", sendMessage);

  async function sendMessage(
    { conversationId, friend, content }: DirectMessage,
    cb: Acknowledgment
  ) {
    try {
      const areFriends = await checkFriendship(socket.data.id, friend.username);
      if (!areFriends) return;

      const conversation = await getConversation();
      if (!conversation) return;

      const message = await Prisma.directMessage.create({
        data: {
          senderId: socket.data.id,
          conversationId: conversation.id,
          content,
        },
        include: {
          sender: true,
        },
      });

      cb({
        message: "Message sent.",
        success: true,
        data: message,
      });

      const receiver = app.store.getClientById(friend.id);
      if (!receiver) return; //user is offline

      app.store.forEachSocket(receiver.username, (socketId) => {
        app.io.to(socketId).emit("direct-message:receive-message", message);
      });
    } catch (err) {
      console.log(err);
    }

    async function getConversation() {
      return conversationId === ""
        ? await Prisma.conversation.create({
            data: {
              conversationInitiatorId: socket.data.id,
              conversationReceiverId: friend.id,
            },
          })
        : await Prisma.conversation.findUnique({
            where: { id: conversationId },
          });
    }
  }
};

export default handler;
