import { AcknowledgementCallback, Channel, ChannelMessage, User } from ".";
import { Optional } from "./utility";

export type ChannelQueryResponse = Channel & {
  members: Sender[];
  messages: ChannelMessageExtended[];
  owner: User;
};

export type ChannelMessageExtended = ChannelMessage & {
  sender: Sender;
  status?: "pending" | "sent";
};

export type Sender = {
  /** Sender id is member id when the message is a Channel Message. */
  id: string;
  user: User;
  userId: string;
};

export type SendMessagePayload = {
  channelId: string;
  memberId: string;
  messageContent: string;
  cb: AcknowledgementCallback<ChannelMessageExtended>;
};

export type FilterChannelMessages = Omit<ChannelMessageExtended, "sender"> & {
  senderName: string;
  senderAvatar: string;
};

export type FilteredMessage = Optional<
  FilterChannelMessages,
  "timestamp" | "channelId"
>;
