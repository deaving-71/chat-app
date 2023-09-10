"use client";

import { InboxIcon } from "@/lib/utils/icons";
import { RootHeader } from "../shared";
import { Button } from "../ui";
import { useSidebarContext } from "@/context";

export default function Header() {
  const { toggleRightinfobar } = useSidebarContext();

  return (
    <RootHeader className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Lorem Ipsum</h1>
        <div className="text-xs text-foreground-secondary">
          Last seen: 10:37
        </div>
      </div>
      <Button variant="circular" size="sm" onClick={toggleRightinfobar}>
        <InboxIcon size={20} />
      </Button>
    </RootHeader>
  );
}
