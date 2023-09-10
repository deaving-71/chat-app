import z from "zod";
import { type RouteHandler } from "fastify";
import { compareSync } from "bcryptjs";
import { generateToken, Prisma } from "../../lib";
import { User } from "@prisma/client";

const loginCredential = z.object({
  username: z.string().min(1, "Username field is left blank."),
  password: z.string().min(1, "Password field is left blank."),
});

const login: RouteHandler = async (request, response) => {
  const { username, password: plaintextPassword } = loginCredential.parse(
    request.query
  );
  const user = await Prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      channels: true,
      friends: true,
      friendRequestReceived: true,
      friendRequestSent: true,
      member: {
        select: {
          id: true,
          channels: true,
        },
      },
    },
  });
  if (!user)
    return response.badRequest({ error: "Invalid username or password" });

  const isPasswordMatch = compareSync(plaintextPassword, user.password);
  if (!isPasswordMatch) {
    return response.badRequest({ error: "Invalid username or password" });
  }

  const accesstoken = generateToken(
    { id: user.id, username: user.username, memberId: user.member?.id },
    "14m",
    1
  );
  const refreshToken = generateToken(
    { id: user.id, username: user.username, memberId: user.member?.id },
    "30d",
    2
  );
  response.setCookie("x-access-token", accesstoken, {
    maxAge: 60 * 14, // 14m
  });
  response.setCookie("x-refresh-token", refreshToken, {
    maxAge: 60 * 60 * 24 * 30, // 30d
  });
  const { password } = user; // excluding the password;
  return response.ok({ message: "You have logged in successfuly", data: user });
};

export default login;
