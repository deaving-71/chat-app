import { FastifyPluginAsync } from "fastify";
import sendRequest from "./send-request";
import declineRequest from "./decline-request";
import acceptRequest from "./accept-request";

const FriendsRoute: FastifyPluginAsync = async (app) => {
  app.post("/send-request", sendRequest);
  app.post("/accept-request", acceptRequest);
  app.delete("/decline-request", declineRequest);
};

export { FriendsRoute };
