import { RouteHandler } from "fastify";
import z from "zod";
import { genSaltSync, hashSync } from "bcryptjs";
import { Prisma } from "../../lib";

const signupCredentials = z
  .object({
    username: z.string().min(2, "Minimum username length is 2 characters."),
    name: z.string().min(1, "Please enter your name."),
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(6, "Minimum password length is 6 characters."),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do no match.",
    path: ["confirm_password"],
  });

const signup: RouteHandler = async (request, response) => {
  console.log(request.body);
  const { username, email, name, password } = signupCredentials.parse(
    request.body
  );
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);
  const user = await Prisma.user.create({
    data: { username, email, name, password: hashedPassword },
  });
  await Prisma.member.create({
    data: {
      userId: user.id,
    },
  });
  return response.created({ message: "You have successfuly signed up." });
};

export default signup;
