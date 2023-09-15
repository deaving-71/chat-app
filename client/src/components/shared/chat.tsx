import { cn, socket } from "@/lib/utils";
import { Input } from "../ui";
import { SendFill } from "@/lib/utils/icons";
import { FilteredMessage, SendMessagePayload } from "@/types";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { User } from "@/lib/store";
import { Messages } from "../channel";

type Props = {
  className?: string;
  filteredMessages?: FilteredMessage[];
  channelId?: string;
};

export default function Chat({
  className,
  filteredMessages,
  channelId,
}: Props) {
  const user = useRecoilValue(User);
  const [messages, setMessages] = useState(filteredMessages);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function appendMessage(message: FilteredMessage) {
    setMessages((prev) => {
      if (prev) {
        return [...prev, message];
      }
      return [message];
    });
  }
  function sendMessage(e: React.FormEvent) {
    e.preventDefault();

    if (
      !inputRef ||
      !inputRef.current ||
      !channelId ||
      !user ||
      inputRef.current.value.trim() === ""
    )
      return;

    const messageContent = inputRef.current.value;
    const optimisticMessage: FilteredMessage = {
      id: crypto.randomUUID(),
      senderAvatar: user.avatar,
      senderName: user.name,
      senderId: user.memberId,
      content: messageContent,
      status: "pending",
    };

    inputRef.current.value = "";
    appendMessage(optimisticMessage);
    const payload: SendMessagePayload = {
      channelId: channelId,
      memberId: user.memberId,
      messageContent: messageContent,
      cb: ({ message, data, success }) => {
        if (success) {
          console.log(message);
          console.log(data);
          appendMessage({
            id: data.id,
            content: data.content,
            senderAvatar: data.sender.user.avatar,
            senderName: data.sender.user.name,
            senderId: data.senderId,
            channelId: data.channelId,
            status: "sent",
            timestamp: data.timestamp,
          });
        } else {
          console.error(message);
        }
      },
    };
    socket.emit("channel:send-message", payload);
  }

  return (
    <main className={cn(className, "grid grid-rows-[var(--chat-height),auto]")}>
      <div className="overflow-y-auto">
        {messages && <Messages messages={messages} />}
      </div>
      <form className="relative" onSubmit={(e) => sendMessage(e)}>
        <Input
          ref={inputRef}
          className="border-t w-full h-input"
          placeholder="Write a message"
        />
        <button className="absolute right-4 top-4">
          <SendFill />
        </button>
      </form>
    </main>
  );
}
