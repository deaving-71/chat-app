import { Sender, User } from "@/types";
import { Member } from ".";
import { filterMembers } from "@/lib/utils";

type Props = {
  channelOwner: User;
  members: Sender[];
};

export default function ChannelMembers({ channelOwner, members }: Props) {
  const [onlineMembers, offlineMembers] = filterMembers(members);

  return (
    <ul className="flex flex-col gap-4 max-h-[calc(100dvh-var(--header-height))] overflow-y-auto">
      <div>
        <h2 className="font-semibold px-2">Owner</h2>
        <Member
          key={channelOwner.id}
          name={channelOwner.name}
          status={channelOwner.isActive}
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
