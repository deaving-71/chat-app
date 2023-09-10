import { RouteHandler } from "fastify";

const signout: RouteHandler = async (request, response) => {
  response.clearCookie("x-access-token");
  response.clearCookie("x-refresh-token");
  return response.ok({ message: "You have successfully signed out" });
};

export default signout;
