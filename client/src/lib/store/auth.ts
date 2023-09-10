import { Session } from "@/types";
import { atom } from "recoil";

const defaultSession: Session = {
  status: "unauthenticated",
};

const Session = atom<Session>({
  key: "session",
  default: defaultSession,
});

export { Session };
