import { PeopleIcon, Message } from "./icons";
import io from "socket.io-client";

export const sidebar = [
  { title: "Friends", href: "/app", Icon: PeopleIcon },
  { title: "Direct Messages", href: "/app/direct-messages", Icon: Message },
];

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
  autoConnect: true,
  withCredentials: true,
});

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
