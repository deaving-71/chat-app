import { FriendRequest, User } from ".";

export type FriendRequestReceived = FriendRequest & {
  sender: User;
};

export type FriendRequestSent = FriendRequest & {
  receiver: User;
};

export type FriendRequestQueryResponse = FriendRequest & {
  sender: User;
  receiver: User;
};
