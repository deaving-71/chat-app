import { RouteHandler } from "fastify";
import { Prisma } from "../../lib";

/**
 * The url param userId, is the user that we are looking for to
 * view conversation or send them a message.
 */
const getConversation: RouteHandler<{ Params: { userId: string } }> = async (
  request,
  response
) => {
  const { userId } = request.params;
  const conversation = await Prisma.conversation.findFirst({
    where: {
      OR: [
        {
          conversationReceiverId: userId,
          conversationInitiatorId: request.user.id,
        },
        {
          conversationInitiatorId: userId,
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

  if (!conversation) {
    const createdConversation = await Prisma.conversation.create({
      data: {
        conversationInitiatorId: request.user.id,
        conversationReceiverId: userId,
      },
    });
    return response.ok(createdConversation);
  }
  response.ok(conversation);
};

export default getConversation;
