import { cn } from "@/lib/utils";
import { Message } from "../direct-messages";
import { Input } from "../ui";
import { SendFill } from "@/lib/utils/icons";
import { ChannelMessageExtended } from "@/types";

type Props = { className?: string; messages: ChannelMessageExtended[] };

export default function Chat({ className, messages }: Props) {
  return (
    <main className={cn(className, "grid grid-rows-[var(--chat-height),auto]")}>
      <div className="overflow-y-auto">
        {messages.map((message) => (
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
      <form className="relative">
        <Input
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
