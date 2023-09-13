import { RouteHandler } from "fastify";
import { Prisma } from "../../lib";

const getConversation: RouteHandler<{ Params: { id: string } }> = async (
  request,
  response
) => {
  const { id } = request.params;
  const conversation = await Prisma.conversation.findFirst({
    where: {
      OR: [
        {
          id: id,
          conversationInitiatorId: request.user.id,
        },
        {
          id: id,
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
  response.ok(conversation);
};

export default getConversation;
