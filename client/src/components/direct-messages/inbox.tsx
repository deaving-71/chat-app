"use client";

import { SearchIcon } from "@/lib/utils/icons";
import { Input } from "../ui";
import { ChatThreadList } from ".";
import { RightInfoBar } from "../shared";
import { useQuery } from "@tanstack/react-query";
import { getMyConversations } from "@/lib/actions";
import { useRecoilValue } from "recoil";
import { User } from "@/lib/store";

export default function Inbox() {
  const user = useRecoilValue(User);
  const {
    data: conversations,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["MyConversations"],
    queryFn: getMyConversations,
    enabled: !!user,
    refetchOnMount: false,
  });

  if (isError) {
    console.error(error);
    return <div>There was an error</div>;
  }

  return (
    <RightInfoBar className="sticky left-0 top-0 row-span-2 w-[240px] overflow-y-auto border-l border-border">
      {!conversations || !conversations.length ? (
        <div className="flex h-full items-center justify-center p-8 text-center font-medium">
          Your inbox seem to be empty.
        </div>
      ) : (
        <>
          <div className="flex h-[60px] items-center justify-center gap-[0.125rem]">
            <label htmlFor="search" className="text-foreground-secondary">
              <SearchIcon size={24} />
            </label>
            <Input
              id="search"
              variant="transparent"
              //@ts-ignore <<< TypeScript bug
              size="sm"
              placeholder="Search"
              className="h-10 w-48 px-0 placeholder:text-sm"
            />
          </div>
          <ChatThreadList conversations={conversations} />
        </>
      )}
    </RightInfoBar>
  );
}
