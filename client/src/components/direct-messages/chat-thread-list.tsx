import { ThreeDots } from "@/lib/utils/icons";
import Image from "next/image";
import StatusDot from "../shared/status-dot";

type Props = {
  list: {
    name: string;
    status: string;
    lastMessageTimestamp: string;
    lastMessage: string;
  }[];
};

export default function ChatThreadList({ list }: Props) {
  return (
    <ul className="max-h-[calc(100dvh-var(--header-height))] overflow-y-auto">
      {list.map(({ name, status, lastMessageTimestamp, lastMessage }, idx) => {
        return (
          <li
            key={name + idx}
            className="flex gap-2 p-1 hover:bg-muted transition-all group"
          >
            <div className="relative rounded-full w-8 h-8">
              <Image
                src={"/assets/default_avatar.png"}
                alt="Profile Avatar"
                width={32}
                height={32}
                className="rounded-full object-contain w-8 h-8 inline-block"
              />
              <StatusDot status={status} />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div className="align-middle">
                  <span className="font-medium mr-2 text-sm">{name}</span>
                  <span className="text-xs text-foreground-secondary">
                    {lastMessageTimestamp}
                  </span>
                </div>
                <button className="invisible group-hover:visible">
                  <ThreeDots />
                </button>
              </div>
              <p className="block text-xs text-foreground-secondary h-5 truncate w-[186px]">
                {lastMessage}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
