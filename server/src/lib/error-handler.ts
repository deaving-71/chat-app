import { ZodError } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { Prisma } from "@prisma/client";

async function errorHandler(
  error: unknown,
  request: FastifyRequest,
  response: FastifyReply
): Promise<void> {
  console.log("error: ", error);

  if (error instanceof ZodError) {
    const flattenedZodError = error.flatten();
    return response.badRequest(flattenedZodError);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error, response);
  }

  if (error instanceof Error) {
    return response.serverError({ message: error.message });
  }

  return response.serverError();
}

function handlePrismaError(
  err: Prisma.PrismaClientKnownRequestError,
  response: FastifyReply
) {
  if (err.code === "P2002" && err.meta) {
    //unique
    const { target } = err.meta;
    return response.badRequest({ message: `${target} is already in use.` });
  }
  return response.badRequest({ ...err });
}

export { errorHandler };
