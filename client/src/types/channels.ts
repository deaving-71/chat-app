import { Channel, ChannelMessage, Member, User } from ".";
import { Optional } from "./utility";

export type ChannelQueryResponse = Channel & {
  members: Sender[];
  messages: ChannelMessageWithStatus[];
  owner: User;
};

export type ChannelMessageWithStatus = ChannelMessage & {
  sender: Sender;
  status?: "pending" | "sent";
};

export type Sender = {
  /** Sender id is member id when the message is a Channel Message. */
  id: string;
  user: User;
  userId: string;
};

export type SendChannelMessagePayload = {
  channelId: string;
  memberId: string;
  messageContent: string;
};

export type FilteredChannelMessages = Omit<
  ChannelMessageWithStatus,
  "sender"
> & {
  senderName: string;
  senderAvatar: string;
};

export type FilteredMessage = Optional<
  FilteredChannelMessages,
  "timestamp" | "channelId"
>;

export type CurrentChannel = Omit<ChannelQueryResponse, "messages"> & {
  messages: FilteredMessage[];
  members: Member[];
  owner: User;
};
