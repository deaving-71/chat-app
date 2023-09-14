import { User as TUser } from "@/types";
import { atom } from "recoil";

const User = atom<(TUser & { memberId: string }) | null>({
  key: "User",
  default: null,
});

export { User };
