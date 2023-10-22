import { User as TUser } from "@/types";
import { atom } from "recoil";

const userAtom = atom<(TUser & { memberId: string }) | null>({
  key: "User",
  default: null,
});

export { userAtom };
