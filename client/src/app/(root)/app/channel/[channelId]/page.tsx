"use client";

import { Header, Members } from "@/components/channel";
import { Chat } from "@/components/channel";
import { CurrentChannel, userAtom } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getChannel } from "@/lib/actions";
import { filterMessages } from "@/lib/utils";
import { useEffect } from "react";
import { useSocket } from "@/context";

type Props = {
  params: { channelId: string };
};

export default function Channel({ params: { channelId } }: Props) {
  const setCurrentChannel = useSetRecoilState(CurrentChannel);
  const { isConnected, socket, receiveChannelMessage } = useSocket();
  const user = useRecoilValue(userAtom);
  const {
    data: channel,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: () => getChannel(channelId),
    enabled: !!user && isConnected,
    refetchInterval: 1000 * 60 * 5, //refetch to update the users status
  });

  useEffect(() => {
    if (channel && isSuccess) {
      setCurrentChannel({
        ...channel,
        messages: filterMessages(channel.messages),
      });
      socket?.on("channel:received-message", receiveChannelMessage);
    }

    return () => {
      setCurrentChannel(null);
      socket?.off("channel:received-message");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel?.id, isSuccess]);

  if (isError) console.error(error);
  if (isLoading) return <div>Loading...</div>;
  if (!channel)
    return <div>error while trying to get this channel&apos;s records </div>;

  return (
    <>
      <div className="flex h-screen flex-col">
        <Header channelName={channel.name} />
        <Chat className="flex-1" />
      </div>
      <Members />
    </>
  );
}
