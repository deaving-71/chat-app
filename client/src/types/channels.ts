import { Channel, ChannelMessage, User } from ".";

export type Sender = {
  /** Sender id is member id when the message is a Channel Message. */
  id: string;
  user: User;
  userId: string;
};

export type ChannelMessageExtended = ChannelMessage & {
  sender: Sender;
};

export type ChannelExtended = Channel & {
  members: Sender[];
  messages: ChannelMessageExtended[];
  owner: User;
};
