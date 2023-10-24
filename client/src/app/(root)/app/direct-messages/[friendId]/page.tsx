"use client";

import { Header, Inbox } from "@/components/direct-messages";
import { Chat } from "@/components/direct-messages";
import { useSocket } from "@/context";
import { getConversation } from "@/lib/actions";
import { Friends, userAtom } from "@/lib/store";
import { CurrentConversation } from "@/lib/store/conversations";
import { filterConvMessages } from "@/lib/utils";
import { DirectMessageWithSender } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

type Props = {
  params: { friendId: string };
};

export default function Conversation({ params: { friendId } }: Props) {
  const user = useRecoilValue(userAtom);
  const friends = useRecoilValue(Friends);
  const setCurrentConv = useSetRecoilState(CurrentConversation);
  const { isConnected, socket, receiveConvMessage } = useSocket();

  const friend = friends.find((friend) => friend.id === friendId);
  const {
    data: conversation,
    isError,
    isSuccess,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["conversation", friendId],
    queryFn: async () => await getConversation(friendId),
    enabled: !!user && !!friend && isConnected,
    refetchInterval: 1000 * 60 * 5, //refetch to update the users status
  });

  if (isError) console.error(error);

  useEffect(() => {
    if (conversation && isSuccess) {
      setCurrentConv({
        id: conversation.id,
        messages: filterConvMessages(conversation.messages),
      });
      socket?.on(
        "direct-message:receive-message",
        (data: DirectMessageWithSender) =>
          receiveConvMessage(data, conversation.id),
      );
    }

    return () => {
      setCurrentConv(null);
      socket?.off("direct-message:receive-message");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation]);

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-[auto,1fr]">
        <Header
          friend={{
            name: friend?.name,
            lastSeen: friend?.lastSeen,
          }}
        />
        {friend ? (
          <Chat friend={{ id: friendId, username: friend.username }} />
        ) : (
          <div>You are not friends with this user, try adding them first.</div>
        )}
      </div>
      <Inbox />
    </>
  );
}
