import { FriendRequest, User } from ".";

export type FriendRequestReceived = FriendRequest & {
  sender: User;
};

export type FriendRequestSent = FriendRequest & {
  receiver: User;
};
