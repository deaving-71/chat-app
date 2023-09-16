import { Socket } from "socket.io";
import { z } from "zod";
import { ExtendedError } from "socket.io/dist/namespace";

const authTokenSchema = z.object({
  id: z.string(),
  username: z.string(),
  memberId: z.string(),
});

function authenticate(socket: Socket, next: (err?: ExtendedError) => void) {
  try {
    const authToken = socket.handshake.auth;

    if (!authToken) {
      next(new Error("Unauthorized."));
      return;
    }
    socket.data = authTokenSchema.parse(authToken);
    console.log(socket.data);
    next();
  } catch (err) {
    console.log(err);
    if (err instanceof Error) next(err);
  }
}

export { authenticate };
