"use client";

import Link from "next/link";
import Image from "next/image";
import StatusDot from "../shared/status-dot";
import { ThreeDots } from "@/lib/utils/icons";
import { MyConversation } from "@/types";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/lib/store";
import { lastMessageTimestamp } from "@/lib/utils";

type Props = {
  conversations: MyConversation[];
};

export default function ChatThreadList({ conversations }: Props) {
  const user = useRecoilValue(userAtom);

  return (
    <ul className="max-h-[calc(100dvh-var(--header-height))] overflow-y-auto">
      {conversations.map(
        ({
          id,
          conversationInitiator,
          conversationReceiver,
          conversationInitiatorId,
          conversationReceiverId,
          messages,
        }) => {
          let repartee;
          if (conversationInitiatorId === user?.id)
            repartee = conversationReceiver;
          else if (conversationReceiverId === user?.id)
            repartee = conversationInitiator;

          if (!repartee) return;

          const lastMessage = messages.at(-1)!;
          return (
            <li key={id}>
              <Link
                href={`/app/direct-messages/${id}`}
                className="group flex gap-2 p-1 transition-all hover:bg-muted"
              >
                <div className="relative h-8 w-8 rounded-full">
                  <Image
                    src={repartee.avatar}
                    alt="Profile Avatar"
                    width={32}
                    height={32}
                    className="inline-block h-8 w-8 rounded-full object-contain"
                  />
                  <StatusDot status={repartee.isActive} />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="align-middle">
                      <span className="mr-2 text-sm font-medium">
                        {repartee.name}
                      </span>
                      <span className="text-xs text-foreground-secondary">
                        {lastMessageTimestamp(lastMessage.timestamp)}
                      </span>
                    </div>
                    <button className="invisible group-hover:visible">
                      <ThreeDots />
                    </button>
                  </div>
                  <p className="block h-5 w-[186px] truncate text-xs text-foreground-secondary">
                    {lastMessage.content}
                  </p>
                </div>
              </Link>
            </li>
          );
        },
      )}
    </ul>
  );
}
