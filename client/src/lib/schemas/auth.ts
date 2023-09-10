import { z } from "zod";

const credentialSchema = z.object({
  username: z.string().min(1, "Please enter your username."),
  password: z.string().min(1, "Please enter your password."),
});

const signupSchema = z
  .object({
    username: z.string().min(2, "Minimum username length is 2 characters."),
    name: z.string().min(2, "Minimum name length is 2 characters."),
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(6, "Minimum password length is 6 characters."),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do no match.",
    path: ["confirm_password"],
  });

export { credentialSchema, signupSchema };
