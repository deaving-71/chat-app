import { Conversation, User, DirectMessage, Prettify } from ".";

type Message = DirectMessage & {
  sender: User;
};

export type MyConversation = Prettify<
  Conversation & {
    conversationInitiator: User;
    conversationReceiver: User;
    messages: Message[];
  }
>;
