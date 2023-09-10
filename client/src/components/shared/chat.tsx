import { cn } from "@/lib/utils";
import { Message } from "../direct-messages";
import { Input } from "../ui";
import { SendFill } from "@/lib/utils/icons";

type Props = { className?: string };

export default function Chat({ className }: Props) {
  return (
    <main className={cn(className, "grid grid-rows-[var(--chat-height),auto]")}>
      <div className="overflow-y-auto">
        {[
          { name: "DeaViNG" },
          { name: "Yeo Rumi" },
          { name: "Gaeul" },
          { name: "Taehoon" },
          { name: "Jiksae" },
        ].map((message, idx) => (
          <Message key={message.name + idx} {...message} />
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
