"use client";

import { Header, Inbox } from "@/components/direct-messages";
import { Chat } from "@/components/shared";
import { getConversation } from "@/lib/actions";
import { User } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

const friend = {
  name: "Lorem ipsum",
  lastSeen: new Date(),
};
type Props = {
  params: { conversationId: string };
};

export default function Conversation({ params: { conversationId } }: Props) {
  const user = useRecoilValue(User);
  const {
    data: conversation,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: async () => await getConversation(conversationId),
    enabled: !!user,
  });

  if (isError) console.error(error);

  return (
    <>
      <div className="grid grid-rows-[auto,1fr] grid-cols-1">
        <Header friend={friend} />
        {conversation ? <Chat /> : <div></div>}
      </div>
      <Inbox />
    </>
  );
}
