import { preHandlerHookHandler } from "fastify";
import { verifyToken } from "../lib";

const authenticate: preHandlerHookHandler = async (request, response) => {
  try {
    const token = request.cookies["x-access-token"];
    if (!token) {
      return response.badRequest({
        message: "Login first to perform this action.",
      });
    }

    const decodedToken = verifyToken(token, 1);
    request.user = decodedToken;
  } catch (err) {
    return response.unauthorized(err);
  }
};

export { authenticate };
