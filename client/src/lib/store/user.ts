import { User as TUser} from "@/types";
import { atom } from "recoil";

const User = atom<TUser | null>({
  key: "User",
  default: null,
});

export { User };
