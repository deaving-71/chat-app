import { FastifyInstance } from "fastify";
import login from "./login";
import signup from "./sign-up";
import signout from "./sign-out";
import refreshAccess from "./refresh-access";

const Auth = async (app: FastifyInstance) => {
  app.post("/login", login);
  app.post("/sign-up", signup);
  app.get("/refresh-access", refreshAccess);
};

// idk what to name it
const SignOut = async (app: FastifyInstance) => {
  app.get("/sign-out", signout);
};

export { Auth, SignOut };
