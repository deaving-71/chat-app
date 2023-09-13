import { Channel } from "@/types";
import { atom } from "recoil";

const Channels = atom<Channel[]>({
  key: "Channels",
  default: [],
});

const OwnedChannels = atom<Channel[]>({
  key: "OwnedChannels",
  default: [],
});

export { OwnedChannels, Channels };
