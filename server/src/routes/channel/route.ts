import { FastifyPluginAsync } from "fastify";
import createChannel from "./create-channel";
import getChannel from "./get-channel";

const ChannelRoute: FastifyPluginAsync = async (app) => {
  app.post("/", createChannel);
  app.get("/:id", getChannel);
};

export { ChannelRoute };
