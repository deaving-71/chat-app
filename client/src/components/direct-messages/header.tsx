"use client";

import dynamic from "next/dynamic";
import { InboxIcon } from "@/lib/utils/icons";
import { Button } from "../ui";
import { useSidebarContext } from "@/context";
import { formatDate } from "@/lib/utils";

const RootHeader = dynamic(() => import("../shared/root-header"), {
  ssr: false,
});

type Props = {
  friend?: {
    name?: string;
    lastSeen?: Date | null;
  };
};

export default function Header({ friend }: Props) {
  const { toggleRightinfobar } = useSidebarContext();

  return (
    <RootHeader className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{friend?.name}</h1>
        <div className="text-xs text-foreground-secondary">
          {formatDate(friend?.lastSeen) ?? "online"}
        </div>
      </div>

      <Button variant="circular" size="sm" onClick={toggleRightinfobar}>
        <InboxIcon size={20} />
      </Button>
    </RootHeader>
  );
}
