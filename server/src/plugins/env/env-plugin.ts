import fp from "fastify-plugin";
import env, { type FastifyEnvOptions } from "@fastify/env";

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "number",
      default: 3000,
    },
    NODE_ENV: {
      type: "string",
    },
    privateKey: {
      type: "string",
    },
    privateKey2: {
      type: "string",
    },
  },
};

const options = {
  confKey: "config",
  schema,
  dotenv: true, // Will read .env in root folder
};

const fastifyEnv = fp<FastifyEnvOptions>(async (fastify) => {
  await fastify.register(env, options);
});

export { fastifyEnv };
