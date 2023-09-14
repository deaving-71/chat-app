import { z } from "zod";

const envVariables = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  NEXT_PUBLIC_SOCKET_URL: z.string(),
});

export default envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
