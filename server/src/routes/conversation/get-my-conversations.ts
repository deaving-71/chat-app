import { RouteHandler } from "fastify";
import { Prisma } from "../../lib";

const getMyConversations: RouteHandler = async (request, response) => {
  const conversations = await Prisma.conversation.findMany({
    where: {
      OR: [
        {
          conversationInitiatorId: request.user.id,
        },
        {
          conversationReceiverId: request.user.id,
        },
      ],
    },
    include: {
      conversationInitiator: true,
      conversationReceiver: true,
      messages: {
        include: {
          sender: true,
        },
      },
    },
  });
  response.ok(conversations);
};

export default getMyConversations;
