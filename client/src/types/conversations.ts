import { Conversation, User, DirectMessage } from ".";

type Message = DirectMessage & {
  sender: User;
};

export type MyConversation = Conversation & {
  conversationInitiator: User;
  conversationReceiver: User;
  messages: Message[];
};
