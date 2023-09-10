import { Member } from ".";
import { List } from "./members";

export default function ChannelMembers({ list }: { list: List }) {
  return (
    <ul className="flex flex-col gap-4 max-h-[calc(100dvh-var(--header-height))] overflow-y-auto">
      <div>
        <h2 className="font-semibold px-2">Owner</h2>
        <Member
          key={list.owner.name + "owner"}
          name={list.owner.name}
          status={list.owner.status}
        />
      </div>
      <div>
        <h2 className="font-semibold px-2">Online - {list.online.length}</h2>
        {list.online.map((name, idx) => (
          <Member key={name + idx} name={name} status="on" />
        ))}
      </div>
      <div>
        <h2 className="font-semibold px-2">Offline {list.offline.length}</h2>
        {list.offline.map((name, idx) => (
          <Member key={name + idx} name={name} status="off" />
        ))}
      </div>
    </ul>
  );
}
