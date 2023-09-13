import { FastifyPluginAsync } from "fastify";
import getMyConversations from "./get-my-conversations";
import getConversation from "./get-conversation";

const ConversationsRoute: FastifyPluginAsync = async (app) => {
  app.get("/my-conversations", getMyConversations);
  app.get("/:id", getConversation);
};

export { ConversationsRoute };
