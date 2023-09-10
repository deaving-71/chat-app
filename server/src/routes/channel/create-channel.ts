import { RouteHandler } from "fastify";
import { z } from "zod";
import { Prisma } from "../../lib";

const schema = z.object({
  name: z.string().min(1, "Please enter a channel name."),
});

const createChannel: RouteHandler = async (request, response) => {
  const { name } = schema.parse(request.body);
  const channel = await Prisma.channel.create({
    data: {
      name,
      ownerId: request.user.id,
      members: {
        connect: {
          userId: request.user.id,
        },
      },
    },
  });
  response.ok(channel);
};

export default createChannel;
