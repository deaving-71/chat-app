"use client";

import { Header, Members } from "@/components/channel";
import { Chat } from "@/components/shared";
import { User } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { getChannel } from "@/lib/actions";
import { filterChannelMessages } from "@/lib/utils";

type Props = {
  params: { channelId: string };
};

export default function Channel({ params: { channelId } }: Props) {
  const user = useRecoilValue(User);
  const {
    data: channel,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: () => getChannel(channelId),
    enabled: !!user,
  });

  if (isError) console.error(error);
  if (isLoading) return <div>Loading...</div>;
  if (!channel)
    return <div>error while trying to get this channel&apos;s records </div>;

  console.log(channel);
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header channelName={channel.name} />
        <Chat
          className="flex-1"
          filteredMessages={filterChannelMessages(channel.messages)}
          channelId={channel.id}
        />
      </div>
      <Members channelOwner={channel.owner} members={channel.members} />
    </>
  );
}
