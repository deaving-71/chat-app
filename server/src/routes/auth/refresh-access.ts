import { RouteHandler } from "fastify";
import { generateToken, verifyToken } from "../../lib";

const refreshAccess: RouteHandler = (request, response) => {
  const refreshToken = request.cookies["x-refresh-token"];
  if (!refreshToken) {
    response.clearCookie("x-access-token");
    response.clearCookie("x-refresh-token");
    response.badRequest({
      message: "Invalid access or refresh token, please login again.",
    });
    return;
  }
  const decodedToken = verifyToken(refreshToken, 2);
  const newToken = generateToken(decodedToken, "14m", 1);
  response.setCookie("x-access-token", newToken, {
    maxAge: 60 * 14, // 14m
  });
  response.ok({ message: "Successfuly refreshed access token." });
  return;
};

export default refreshAccess;
