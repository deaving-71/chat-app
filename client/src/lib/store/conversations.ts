import { MyConversation } from "@/types";
import { atom } from "recoil";

const Conversations = atom<MyConversation[]>({
  key: "Conversations",
  default: [],
});

export { Conversations };
