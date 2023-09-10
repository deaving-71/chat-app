import type { FastifyPluginAsync, FastifyReply } from "fastify";
import fp from "fastify-plugin";

const customresponses = fp(async (app) => {
  app.decorateReply("ok", ok);
  app.decorateReply("created", created);
  app.decorateReply("badRequest", badRequest);
  app.decorateReply("unauthorized", unauthorized);
  app.decorateReply("serverError", serverError);
});

export function ok(this: FastifyReply, payload: unknown) {
  this.code(200).send(payload);
  return;
}

function created(this: FastifyReply, payload: unknown) {
  this.code(201).send(payload);
  return;
}

function badRequest(this: FastifyReply, payload: unknown) {
  this.code(400).send(payload);
  return;
}
function unauthorized(this: FastifyReply, payload?: unknown) {
  const response = { error: "Unauthorized" };
  if (payload) Object.assign(response, payload);
  this.code(401).send(response);
  return;
}

function serverError(this: FastifyReply, payload?: unknown) {
  const response = { error: "Internal server error" };
  if (payload) Object.assign(response, payload);
  this.code(500).send(response);
  return;
}

declare module "fastify" {
  interface FastifyReply {
    ok: typeof ok;
    created: typeof created;
    badRequest: typeof badRequest;
    unauthorized: typeof unauthorized;
    serverError: typeof serverError;
  }
}

export { customresponses };
