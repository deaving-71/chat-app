import { Channel, CurrentChannel } from "@/types";
import { atom } from "recoil";

const Channels = atom<Channel[]>({
  key: "Channels",
  default: [],
});

const OwnedChannels = atom<Channel[]>({
  key: "OwnedChannels",
  default: [],
});

const CurrentChannel = atom<CurrentChannel | null>({
  key: "CurrentChannel",
  default: null,
});

export { OwnedChannels, Channels, CurrentChannel };
