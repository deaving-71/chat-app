import z from "zod";

const envVariables = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.string(),
  privateKey: z.string(),
  privateKey2: z.string(),
  PORT: z.number(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
