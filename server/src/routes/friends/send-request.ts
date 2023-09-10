import { RouteHandler } from "fastify";
import z from "zod";
import { Prisma } from "../../lib";

const requestSchema = z.object({
  receiverId: z.string().min(1, "Invalid user id"),
});

const sendRequest: RouteHandler = async (request, response) => {
  const { receiverId } = requestSchema.parse(request.query);
  if (request.user.id === receiverId)
    return response.badRequest({
      message:
        "You can't be friends with yourself, that is not how it works you know.",
    });
  await Prisma.friendRequest.create({
    data: {
      senderId: request.user.id,
      receiverId: receiverId,
    },
  });
  return response.ok({ message: "Request sent." });
};

export default sendRequest;
