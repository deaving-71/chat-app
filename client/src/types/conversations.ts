import { Conversation, User, DirectMessage, Prettify, Optional } from ".";

export type DirectMessageWithSender = DirectMessage & {
  sender: User;
};

export type MessageWithStatus = Prettify<
  Optional<
    DirectMessage & {
      senderName: string;
      senderAvatar: string;
      status?: "pending" | "sent";
    },
    "conversationId" | "timestamp"
  >
>;

export type ConversationWithMessages = Prettify<
  Conversation & {
    conversationInitiator: User;
    conversationReceiver: User;
    messages: DirectMessageWithSender[];
  }
>;

export type DirectMessagePayload = {
  conversationId: string;
  friend: {
    id: string;
    username: string;
  };
  content: string;
};
