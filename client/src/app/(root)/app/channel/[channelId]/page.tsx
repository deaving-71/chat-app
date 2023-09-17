"use client";

import { Header, Members } from "@/components/channel";
import { Chat } from "@/components/shared";
import { CurrentChannel, User } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getChannel } from "@/lib/actions";
import { filterChannelMessages } from "@/lib/utils";
import { useEffect } from "react";
import { useSocket } from "@/context";

type Props = {
  params: { channelId: string };
};

export default function Channel({ params: { channelId } }: Props) {
  const setCurrentChannel = useSetRecoilState(CurrentChannel);
  const { isConnected } = useSocket();
  const user = useRecoilValue(User);
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
    refetchInterval: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (channel && isSuccess) {
      setCurrentChannel({
        ...channel,
        messages: filterChannelMessages(channel.messages),
      });
    }

    return () => {
      setCurrentChannel(null);
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
