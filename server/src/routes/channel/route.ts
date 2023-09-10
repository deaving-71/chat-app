import { FastifyPluginAsync } from "fastify";
import createChannel from "./create-channel";

const ChannelRoute: FastifyPluginAsync = async (app) => {
  app.post("/", createChannel);
};

export { ChannelRoute };
