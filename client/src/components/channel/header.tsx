"use client";

import dynamic from "next/dynamic";
import { Hashtag, PeopleIcon } from "@/lib/utils/icons";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { useSidebarContext } from "@/context";

const RootHeader = dynamic(() => import("../shared/root-header"), {
  ssr: false,
});

type Props = { className?: string; channelName: string };

export default function Header({ className, channelName }: Props) {
  const { toggleRightinfobar } = useSidebarContext();

  return (
    <RootHeader className={cn(className, "flex items-center justify-between")}>
      <div className="flex items-center">
        <Hashtag size={24} className="mr-2" />
        <h1 className="text-2xl font-bold">{channelName}</h1>
      </div>
      <Button variant="circular" size="sm" onClick={toggleRightinfobar}>
        <PeopleIcon size={20} />
      </Button>
    </RootHeader>
  );
}
