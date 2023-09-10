"use client";

import { useMediaQuery } from "usehooks-ts";
import DefaultFriendsList from "./default-friend-list";
import MobileFriendsList from "./mobile-friend-list";

export function FriendsList() {
  const lg = useMediaQuery("(min-width: 1024px)");

  const CurrrentFriendList = {
    default: DefaultFriendsList,
    mobile: MobileFriendsList,
  }[lg ? "default" : "mobile"];

  return <CurrrentFriendList />;
}
