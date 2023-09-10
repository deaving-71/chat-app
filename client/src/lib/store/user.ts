import { User } from "@/types";
import { atom } from "recoil";

const User = atom<User | null>({
  key: "user",
  default: null,
});

export { User };
