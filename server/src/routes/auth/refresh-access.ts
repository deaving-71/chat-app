import { RouteHandler } from "fastify";
import { Prisma, generateToken, verifyToken } from "../../lib";

const refreshAccess: RouteHandler = async (request, response) => {
  const refreshToken = request.cookies["x-refresh-token"];
  if (!refreshToken) {
    response.clearCookie("x-access-token");
    response.clearCookie("x-refresh-token");
    response.redirect("/auth/sign-in");
    // response.unauthorized({
    //   message: "Invalid access or refresh token, please login again.",
    // });
    return;
  }

  const decodedToken = verifyToken(refreshToken, 2);
  const newToken = generateToken(decodedToken, "14m", 1);
  response.setCookie("x-access-token", newToken, {
    maxAge: 60 * 14, // 14m
  });

  const user = await Prisma.user.findUnique({
    where: {
      id: decodedToken.id,
    },
    include: {
      channels: true,
      friends: true,
      friendRequestSent: {
        include: {
          receiver: true,
        },
      },
      friendRequestReceived: {
        include: {
          sender: true,
        },
      },
      member: {
        select: {
          id: true,
          channels: true,
        },
      },
    },
  });
  if (!user)
    return response.badRequest({
      message: "User does not exist.",
    });

  const { password, ...User } = user;
  response.ok(User);
};

export default refreshAccess;
