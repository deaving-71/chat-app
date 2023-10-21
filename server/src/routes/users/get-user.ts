import { RouteHandler } from "fastify";
import { Prisma } from "../../lib";

const getUser: RouteHandler = async (request, response) => {
  const user = await Prisma.user.findUnique({
    where: {
      id: request.user.id,
    },
    include: {
      channels: true,
      friends: true,
      friendRequestSent: {
        include: {
          receiver: true,
        },
      },
      friendRequestReceived: {
        include: {
          sender: true,
        },
      },
      member: {
        select: {
          id: true,
          channels: true,
        },
      },
    },
  });
  if (!user)
    return response.badRequest({
      message: "User does not exist.",
    });
  const { password, ...User } = user;
  return response.ok(User);
};

export default getUser;
