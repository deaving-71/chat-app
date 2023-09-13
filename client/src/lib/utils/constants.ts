import { PeopleIcon, Message } from "./icons";

export const sidebar = [
  { title: "Friends", href: "/app", Icon: PeopleIcon },
  { title: "Direct Messages", href: "/app/direct-messages", Icon: Message },
];

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

/*
const list = {
  owner: {
    name: "DeaViNG",
    status: "on",
  },
  online: ["Gaeul", "Taehoon", "Jiksae"],
  offline: ["Gyeoul", "Choi Bomi", "Yeo Rumi"],
};
[
  { name: "DeaViNG" },
  { name: "Yeo Rumi" },
  { name: "Gaeul" },
  { name: "Taehoon" },
  { name: "Jiksae" },
]
*/
