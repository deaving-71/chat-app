import { Prisma } from "../../lib";
import { IOHandler, DirectMessage } from "../../types";
import { checkFriendship } from "./friends";

const handler: IOHandler = (app, socket) => {
  socket.on("direct-message:send-message", sendMessage);

  async function sendMessage({
    conversationId,
    receiverId,
    content,
  }: DirectMessage) {
    try {
      const areFriends = await checkFriendship(socket.data.id, receiverId);
      if (!areFriends) return;

      const conversation = await getConversation();
      console.log("conversation: ", conversation);

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

      const receiver = app.store.getClientById(receiverId);

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
              conversationReceiverId: receiverId,
            },
          })
        : await Prisma.conversation.findUnique({
            where: { id: conversationId },
          });
    }
  }
};

export default handler;
