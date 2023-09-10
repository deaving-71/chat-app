import { RouteHandler } from "fastify";
import z from "zod";
import { Prisma } from "../../lib";

const requestSchema = z.object({
  senderId: z.string().min(1, "Invalid user id"),
});

const acceptRequest: RouteHandler = async (request, response) => {
  const { senderId } = requestSchema.parse(request.query);
  const receiverId = request.user.id;

  const friendrequest = await Prisma.friendRequest.findFirst({
    where: {
      senderId,
      receiverId,
    },
  });
  if (!friendrequest)
    return response.badRequest({ message: "Friend request does not exist." });

  const acceptee = Prisma.user.update({
    where: {
      id: receiverId,
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
        connect: { id: receiverId },
      },
    },
  });
  await Promise.all([accepted, acceptee]);

  await Prisma.friendRequest.delete({
    where: {
      id: friendrequest.id,
    },
  });
  return response.ok({ message: "Friend request accepted." });
};

export default acceptRequest;
