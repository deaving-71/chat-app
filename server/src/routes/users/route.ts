import { FastifyPluginAsync } from "fastify";
import getUser from "./get-user";

const UserRoute: FastifyPluginAsync = async (app) => {
  app.get("/my-profile", getUser);
};

export { UserRoute };
