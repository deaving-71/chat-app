"use client";

import dynamic from "next/dynamic";
import { useMediaQuery } from "usehooks-ts";
import DefaultFriendsList from "./friend-list/default-friend-list";
import MobileFriendsList from "./friend-list/mobile-friend-list";

function FriendsList() {
  const lg = useMediaQuery("(min-width: 1024px)");

  const CurrrentFriendList = {
    default: DefaultFriendsList,
    mobile: MobileFriendsList,
  }[lg ? "default" : "mobile"];

  return <CurrrentFriendList />;
}

export default dynamic(() => Promise.resolve(FriendsList), { ssr: false });
