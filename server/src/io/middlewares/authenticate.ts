import { Socket } from "socket.io";
import { parse } from "cookie";
import { z } from "zod";
import { verifyToken } from "../../lib";
import { ExtendedError } from "socket.io/dist/namespace";

function authenticate(socket: Socket, next: (err?: ExtendedError) => void) {
  try {
    const cookies = socket.request.headers["set-cookie"];
    if (!cookies) {
      next(new Error("Unauthorized."));
      return;
    }
    const tokens = parseCookies(cookies);
    const accessToken = tokens["x-access-token"];
    socket.data = verifyToken(accessToken, 1);
    console.log(socket.data);
    next();
  } catch (err) {
    console.log(err);
  }
}

function parseCookies(strs: string[]) {
  const cookieSchema = z.object({
    "x-access-token": z.string(),
    "x-refresh-token": z.string().optional(),
  });
  const cookies: Record<string, string> = {};
  const validKeys = ["x-access-token", "x-refresh-token"];
  strs.forEach((str) => {
    const cookie = parse(str);
    const keys = Object.keys(cookie);
    keys.forEach((key) => {
      //@ts-ignore
      if (validKeys.includes(key)) cookies[key] = cookie[key];
    });
  });
  return cookieSchema.parse(cookies);
}

export { authenticate };
