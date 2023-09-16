import Fastify from "fastify";
import cors from "@fastify/cors";
import SocketIO from "fastify-socket.io";
import { LoggerOptions } from "pino";
import cookie, { type FastifyCookieOptions } from "@fastify/cookie";
import { fastifyEnv } from "./plugins";
import { customresponses, store } from "./decorators";
import {
  Auth,
  FriendsRoute,
  SignOut,
  UserRoute,
  ChannelRoute,
  ConversationsRoute,
} from "./routes";
import { authenticate } from "./hooks";
import { errorHandler } from "./lib";
import { initilizeSocketIO } from "./io";

const envToLogger: Record<string, LoggerOptions | boolean> = {
  dev: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

const app = Fastify({
  logger: envToLogger.dev,
});

const corsOptions = {
  origin: ["http://localhost:4000", "http:127.0.0.1:4000"],
  credentials: true,
};

app.register(fastifyEnv);
app.register(cors, corsOptions);
app.register(SocketIO, {
  cors: corsOptions
});
app.register(store);
app.register(customresponses);
app.setErrorHandler(errorHandler);

app.register(cookie, {
  parseOptions: {
    path: "/",
    sameSite: "none",
    httpOnly: true,
    secure: true,
  },
} satisfies FastifyCookieOptions);

/* ================================== ROUTES ================================== */
app.register(async (app) => {
  /* non authenticated routes */
  app.register(Auth, { prefix: "/api/auth" });
  app.get("/healthcheck", () => {
    return "ok";
  });
});

app.register(async (app) => {
  /* authenticated routes */
  app.addHook("preHandler", authenticate);

  app.register(UserRoute, { prefix: "api/users" });
  app.register(FriendsRoute, { prefix: "api/friends" });
  app.register(ChannelRoute, { prefix: "api/channels" });
  app.register(ConversationsRoute, { prefix: "api/conversations" });
  app.register(SignOut, { prefix: "api/auth" });
});

async function start() {
  try {
    await app.ready();
    await app.listen({ port: app.config.PORT });
    initilizeSocketIO(app);
    console.log(
      "\n",
      app.printRoutes({
        commonPrefix: false,
      })
    );
    console.log("==================================");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();

export default app;
