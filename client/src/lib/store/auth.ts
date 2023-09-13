import { Session } from "@/types";
import { atom } from "recoil";

const defaultSession: Session = {
  status: "loading",
};

const Session = atom<Session>({
  key: "Session",
  default: defaultSession,
});

export { Session };
