"use client";

import { Hashtag, PeopleIcon } from "@/lib/utils/icons";
import { cn } from "@/lib/utils";
import { RootHeader } from "../shared";
import { Button } from "../ui";
import { useSidebarContext } from "@/context";

type Props = { className?: string };

export default function Header({ className }: Props) {
  const { toggleRightinfobar } = useSidebarContext();

  return (
    <RootHeader className={cn(className, "flex items-center justify-between")}>
      <div className="flex items-center">
        <Hashtag size={24} className="mr-2" />
        <h1 className="text-2xl font-bold">Lorem Ipsum</h1>
      </div>
      <Button variant="circular" size="sm" onClick={toggleRightinfobar}>
        <PeopleIcon size={20} />
      </Button>
    </RootHeader>
  );
}
