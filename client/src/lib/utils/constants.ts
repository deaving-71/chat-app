import { PeopleIcon, Message } from "./icons";

export const sidebar = [
  { title: "Friends", href: "/app", Icon: PeopleIcon },
  { title: "Direct Messages", href: "/app/direct-messages", Icon: Message },
];

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
