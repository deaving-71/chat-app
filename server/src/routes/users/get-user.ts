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
      friendRequestSent: true,
      friendRequestReceived: true,
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
      message: "Could not fetch user.",
    });
  const { password, ...User } = user;
  return response.ok(User);
};

export default getUser;
