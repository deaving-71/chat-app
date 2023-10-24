import {
  ConversationWithMessages,
  FilteredMessage,
  MessageWithStatus,
  Prettify,
} from "@/types";
import { atom } from "recoil";

type CurrentConversation = {
  id: string;
  messages: MessageWithStatus[];
} | null;

const Conversations = atom<ConversationWithMessages[]>({
  key: "Conversations",
  default: [],
});

const CurrentConversation = atom<CurrentConversation>({
  key: "CurrentConversation",
  default: null,
});

export { Conversations, CurrentConversation };
