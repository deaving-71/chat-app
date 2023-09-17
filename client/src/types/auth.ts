import { z } from "zod";
import { credentialSchema, signupSchema } from "@/lib/schemas";
import {
  Channel,
  FriendRequestReceived,
  FriendRequestSent,
  Prettify,
  User,
} from ".";

export type LoginCredentials = z.infer<typeof credentialSchema>;

export type SignupForm = z.infer<typeof signupSchema>;

export type SessionStatus = "authenticated" | "unauthenticated" | "loading";

export type Session = {
  status: SessionStatus;
  /** interval time in milli-seconds */
  expiresIn?: number;
} | null;

export type UserProfileInfo = Prettify<
  User & {
    friends: User[];
    friendRequestSent: FriendRequestSent[];
    friendRequestReceived: FriendRequestReceived[];
    member: { id: string; channels: Channel[] };
    channels: Channel[];
  }
>;

export type LoginResponse = {
  message: string;
  data: UserProfileInfo;
};

export type SignInOptions = {
  redirectPath?: string;
};
