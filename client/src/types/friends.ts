import { FriendRequest, Prettify, User } from ".";

export type FriendRequestReceived = FriendRequest & {
  sender: User;
};

export type FriendRequestSent = FriendRequest & {
  receiver: User;
};

export type FriendRequestQueryResponse = Prettify<
  FriendRequest & {
    sender: User;
    receiver: User;
  }
>;
