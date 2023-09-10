"use client";

import { UserRectangle } from "@/lib/utils/icons";
import { RootHeader } from "../shared";
import { Button } from "../ui";
import { useSidebarContext } from "@/context";

export default function Header() {
  const { toggleRightinfobar } = useSidebarContext();

  return (
    <RootHeader className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Friends</h1>
      <Button variant="circular" size="sm" onClick={toggleRightinfobar}>
        <UserRectangle size={20} />
      </Button>
    </RootHeader>
  );
}
