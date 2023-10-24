"use client";

import { cn } from "@/lib/utils";
import { Input } from "../ui";
import { SendFill } from "@/lib/utils/icons";
import {
  AcknowledgementCallback,
  DirectMessagePayload,
  DirectMessageWithSender,
  MessageWithStatus,
} from "@/types";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { userAtom, CurrentConversation } from "@/lib/store";
import { Messages } from "../channel";
import { useSocket } from "@/context";

type Props = {
  className?: string;
  friend: {
    id: string;
    username: string;
  };
};

export function Chat({ className = "", friend }: Props) {
  const user = useRecoilValue(userAtom);
  const currentConv = useRecoilValue(CurrentConversation);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { socket, appendConvMessage, updateConvMessage } = useSocket();

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();

    if (
      !inputRef ||
      !inputRef.current ||
      !user ||
      inputRef.current.value.trim() === ""
    )
      return;

    const generatedId = crypto.randomUUID();
    const messageContent = inputRef.current.value;
    const optimisticMessage: MessageWithStatus = {
      id: generatedId,
      senderAvatar: user.avatar,
      senderName: user.name,
      senderId: user.memberId,
      content: messageContent,
      status: "pending",
    };

    inputRef.current.value = "";
    appendConvMessage(optimisticMessage);
    const payload: DirectMessagePayload = {
      conversationId: currentConv?.id ?? "",
      friend: friend,
      content: messageContent,
    };

    const ack: AcknowledgementCallback<DirectMessageWithSender> = ({
      message,
      data,
      success,
    }) => {
      if (success) {
        updateConvMessage(
          {
            id: data.id,
            content: data.content,
            senderAvatar: data.sender.avatar,
            senderName: data.sender.name,
            senderId: data.senderId,
            conversationId: data.conversationId,
            status: "sent",
            timestamp: data.timestamp,
          },
          generatedId,
        );
      } else {
        console.error(message);
      }
    };

    socket?.emit("direct-message:send-message", payload, ack);
  }

  return (
    <main className={cn(className, "grid grid-rows-[var(--chat-height),auto]")}>
      <div className="overflow-y-auto">
        <Messages messages={currentConv?.messages ?? []} />
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
