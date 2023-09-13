"use client";

import Link from "next/link";
import Image from "next/image";
import StatusDot from "../shared/status-dot";
import { ThreeDots } from "@/lib/utils/icons";
import { MyConversation } from "@/types";
import { useRecoilValue } from "recoil";
import { User } from "@/lib/store";
import { lastMessageTimestamp } from "@/lib/utils";

type Props = {
  conversations: MyConversation[];
};

export default function ChatThreadList({ conversations }: Props) {
  const user = useRecoilValue(User);

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
                className="flex gap-2 p-1 hover:bg-muted transition-all group"
              >
                <div className="relative rounded-full w-8 h-8">
                  <Image
                    src={repartee.avatar}
                    alt="Profile Avatar"
                    width={32}
                    height={32}
                    className="rounded-full object-contain w-8 h-8 inline-block"
                  />
                  <StatusDot status={repartee.isActive} />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="align-middle">
                      <span className="font-medium mr-2 text-sm">
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
                  <p className="block text-xs text-foreground-secondary h-5 truncate w-[186px]">
                    {lastMessage.content}
                  </p>
                </div>
              </Link>
            </li>
          );
        }
      )}
    </ul>
  );
}
