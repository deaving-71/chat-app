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
}: Partial<Props>) {
  return (
    <div className="group flex px-8 py-2 transition-all hover:bg-muted">
      <Image
        src={senderAvatarUrl}
        alt="Profile Avatar"
        width={36}
        height={36}
        className="mr-4 inline-block h-9 w-9 rounded-full object-contain"
      />
      <div>
        <div className="flex items-center justify-between">
          <div className="align-middle">
            <span className="mr-2 font-medium">{senderName}</span>
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
