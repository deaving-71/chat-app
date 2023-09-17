import { Channel, ChannelMessage, Member, User } from ".";
import { Optional, Prettify } from "./utility";

export type ChannelQueryResponse = Channel & {
  members: Sender[];
  messages: ChannelMessageWithStatus[];
  owner: User;
};

export type ChannelMessageWithStatus = Prettify<
  ChannelMessage & {
    sender: Sender;
    status?: "pending" | "sent";
  }
>;

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

export type FilteredChannelMessages = Prettify<
  Omit<ChannelMessageWithStatus, "sender"> & {
    senderName: string;
    senderAvatar: string;
  }
>;

export type FilteredMessage = Prettify<
  Optional<FilteredChannelMessages, "timestamp" | "channelId">
>;

export type CurrentChannel = Prettify<
  Omit<ChannelQueryResponse, "messages"> & {
    messages: FilteredMessage[];
    members: Member[];
    owner: User;
  }
>;
