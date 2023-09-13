import { RouteHandler } from "fastify";
import { Prisma } from "../../lib";

const getChannel: RouteHandler<{ Params: { id: string } }> = async (
  request,
  response
) => {
  const { id } = request.params;
  const channel = await Prisma.channel.findFirst({
    where: {
      id: id,
      members: {
        some: {
          userId: request.user.id,
        },
      },
    },
    include: {
      owner: true,
      messages: {
        include: {
          sender: {
            include: {
              user: true,
            },
          },
        },
      },
      members: {
        include: {
          user: true,
        },
      },
    },
  });
  if (!channel) {
    response.badRequest({
      message: "Sorry, could not find records of this conversation :(",
    });
    return;
  }
  response.ok(channel);
};

export default getChannel;
