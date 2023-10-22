import { cn } from "@/lib/utils";
import { Input } from "../ui";
import { SendFill } from "@/lib/utils/icons";
import {
  AcknowledgementCallback,
  ChannelMessageWithStatus,
  FilteredMessage,
  SendChannelMessagePayload,
} from "@/types";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { CurrentChannel, userAtom } from "@/lib/store";
import { Messages } from "../channel";
import { useSocket } from "@/context";

type Props = {
  className?: string;
};

export default function Chat({ className }: Props) {
  const user = useRecoilValue(userAtom);
  const currentChannel = useRecoilValue(CurrentChannel);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { socket, appendChannelMessage, updateChannelMessage } = useSocket();

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();

    if (
      !inputRef ||
      !inputRef.current ||
      !user ||
      !currentChannel ||
      inputRef.current.value.trim() === ""
    )
      return;

    const generatedId = crypto.randomUUID();
    const messageContent = inputRef.current.value;
    const optimisticMessage: FilteredMessage = {
      id: generatedId,
      senderAvatar: user.avatar,
      senderName: user.name,
      senderId: user.memberId,
      content: messageContent,
      status: "pending",
    };

    inputRef.current.value = "";
    appendChannelMessage(optimisticMessage);
    const payload: SendChannelMessagePayload = {
      channelId: currentChannel?.id,
      memberId: user.memberId,
      messageContent: messageContent,
    };
    const ack: AcknowledgementCallback<ChannelMessageWithStatus> = ({
      message,
      data,
      success,
    }) => {
      if (success) {
        console.log(message);
        console.log(data);
        updateChannelMessage(
          {
            id: data.id,
            content: data.content,
            senderAvatar: data.sender.user.avatar,
            senderName: data.sender.user.name,
            senderId: data.senderId,
            channelId: data.channelId,
            status: "sent",
            timestamp: data.timestamp,
          },
          generatedId,
        );
      } else {
        console.error(message);
      }
    };
    socket?.emit("channel:send-message", payload, ack);
  }

  return (
    <main className={cn(className, "grid grid-rows-[var(--chat-height),auto]")}>
      <div className="overflow-y-auto">
        {currentChannel && <Messages messages={currentChannel.messages} />}
      </div>
      <form className="relative" onSubmit={(e) => sendMessage(e)}>
        <Input
          ref={inputRef}
          className="h-input w-full border-t"
          placeholder="Write a message"
        />
        <button className="absolute right-4 top-4">
          <SendFill />
        </button>
      </form>
    </main>
  );
}
