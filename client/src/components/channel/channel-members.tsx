import { Sender, User } from "@/types";
import { Member } from ".";
import { filterMembers } from "@/lib/utils";
import { useState } from "react";
import { CurrentChannel } from "@/lib/store";
import { useRecoilValue } from "recoil";

export default function ChannelMembers() {
  const currentChannel = useRecoilValue(CurrentChannel);
  if (!currentChannel) return;

  const [onlineMembers, offlineMembers] = filterMembers(
    currentChannel.members,
    currentChannel.ownerId
  );

  return (
    <ul className="flex flex-col gap-4 max-h-[calc(100dvh-var(--header-height))] overflow-y-auto">
      <div>
        <h2 className="font-semibold px-2">Owner</h2>
        <Member
          key={currentChannel.ownerId}
          name={currentChannel.owner.name}
          status={currentChannel.owner.isActive}
        />
      </div>
      <div>
        <h2 className="font-semibold px-2">Online - {onlineMembers.length}</h2>
        {onlineMembers.map((member) => (
          <Member
            key={member.id}
            name={member.user.name}
            status={member.user.isActive}
          />
        ))}
      </div>
      <div>
        <h2 className="font-semibold px-2">Offline {offlineMembers.length}</h2>
        {offlineMembers.map((member) => (
          <Member
            key={member.id}
            name={member.user.name}
            status={member.user.isActive}
          />
        ))}
      </div>
    </ul>
  );
}
