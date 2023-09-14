import { cn, socket } from "@/lib/utils";
import { Message } from "../direct-messages";
import { Input } from "../ui";
import { SendFill } from "@/lib/utils/icons";
import { ChannelMessageExtended, SendMessagePayload } from "@/types";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { User } from "@/lib/store";

type Props = {
  className?: string;
  messages?: ChannelMessageExtended[];
  channelId?: string;
};

export default function Chat({ className, messages, channelId }: Props) {
  const user = useRecoilValue(User);
  const [_messages, setMessages] = useState(messages);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();

    if (
      !inputRef ||
      !inputRef.current ||
      !channelId ||
      !user ||
      inputRef.current.value.length === 0
    )
      return;

    const messageContent = inputRef.current.value;
    const payload: SendMessagePayload = {
      channelId: channelId,
      memberId: user.memberId,
      messageContent: messageContent,
      cb: ({ message, data, success }) => {
        if (success) {
          console.log(message);
          console.log(data);
          setMessages((prev) => {
            if (prev) {
              return [...prev, data];
            }
            return [data];
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
        {_messages &&
          _messages.map((message) => (
            <Message
              key={message.id}
              id={message.id}
              senderName={message.sender.user.name}
              content={message.content}
              senderAvatarUrl={message.sender.user.avatar}
              timestamp={message.timestamp}
            />
          ))}
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
