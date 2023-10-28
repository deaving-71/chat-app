"use client";

import { useMediaQuery } from "@/hooks";
import DefaultFriendsList from "./friend-list/default-friend-list";
import MobileFriendsList from "./friend-list/mobile-friend-list";

function FriendsList() {
  const md = useMediaQuery(768);

  return md ? <MobileFriendsList /> : <DefaultFriendsList />;
}

export { FriendsList };
