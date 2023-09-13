import { formatDate, lastMessageTimestamp } from "@/lib/utils";
import { ThreeDots } from "@/lib/utils/icons";
import Image from "next/image";

type Props = {
  id: string;
  senderName: string;
  senderAvatarUrl: string;
  content: string;
  timestamp: Date;
};

export default function Message({
  id,
  senderName,
  senderAvatarUrl,
  content,
  timestamp,
}: Props) {
  return (
    <div className="flex px-8 py-2 hover:bg-muted transition-all group">
      <Image
        src={senderAvatarUrl}
        alt="Profile Avatar"
        width={36}
        height={36}
        className="rounded-full object-contain mr-4 w-9 h-9 inline-block"
      />
      <div>
        <div className="flex items-center justify-between">
          <div className="align-middle">
            <span className="font-medium mr-2">{senderName}</span>
            <span className="text-xs text-foreground-secondary">
              {lastMessageTimestamp(timestamp)}
            </span>
          </div>
          <button className="invisible group-hover:visible">
            <ThreeDots />
          </button>
        </div>
        <p className="block text-sm text-foreground-secondary">{content}</p>
      </div>
    </div>
  );
}
