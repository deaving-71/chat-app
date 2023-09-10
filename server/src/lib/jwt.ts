import { verify, sign, JwtPayload } from "jsonwebtoken";
import { z } from "zod";

const tokenSchema = z.object({
  id: z.string(),
  username: z.string(),
  memberId: z.string(),
});

const generateToken = (
  payload: JwtPayload,
  expiresIn: string | number,
  key: 1 | 2
) => {
  const privateKey = {
    1: process.env.privateKey,
    2: process.env.privateKey2,
  }[key];
  return sign(payload, privateKey, {
    expiresIn: expiresIn,
  });
};

const verifyToken = (token: string, key: 1 | 2) => {
  const privateKey = {
    1: process.env.privateKey,
    2: process.env.privateKey2,
  }[key];
  const decodedToken = verify(token, privateKey);
  return tokenSchema.parse(decodedToken);
};

export { generateToken, verifyToken };
