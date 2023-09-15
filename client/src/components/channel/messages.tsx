import { cn, formatDate, lastMessageTimestamp } from "@/lib/utils";
import { ThreeDots } from "@/lib/utils/icons";
import { FilteredMessage } from "@/types";
import Image from "next/image";

type Props = {
  messages: FilteredMessage[];
};

export default function Messages({ messages }: Props) {
  return messages.map(
    ({
      id,
      content,
      senderAvatar,
      senderName,
      senderId,
      timestamp,
      status,
    }) => (
      <div
        key={id}
        className={cn(
          "flex px-8 py-2 hover:bg-muted transition-all group",
          status && status === "pending" ? "opacity-60" : "opacity-100"
        )}
      >
        <Image
          src={senderAvatar}
          alt="Profile Avatar"
          width={36}
          height={36}
          className="rounded-full object-contain mr-4 w-9 h-9 inline-block"
        />
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="align-middle">
              <span className="font-medium mr-2">{senderName}</span>
              <span className="text-xs text-foreground-secondary">
                {timestamp && lastMessageTimestamp(timestamp)}
              </span>
            </div>
            <button className="invisible group-hover:visible">
              <ThreeDots />
            </button>
          </div>
          <p className="block text-sm text-foreground-secondary">{content}</p>
        </div>
      </div>
    )
  );
}
