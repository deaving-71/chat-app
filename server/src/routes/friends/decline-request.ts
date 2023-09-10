import { RouteHandler } from "fastify";
import z from "zod";
import { Prisma } from "../../lib";

const requestSchema = z.object({
  requestId: z.string().min(1, "Invalid user id"),
});

const declineRequest: RouteHandler = async (request, response) => {
  const { requestId } = requestSchema.parse(request.body);
  await Prisma.friendRequest.delete({
    where: {
      id: requestId,
      receiverId: request.user.id,
    },
  });
  return response.ok({ message: "Removed request." });
};

export default declineRequest;
