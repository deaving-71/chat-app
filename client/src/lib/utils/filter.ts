import { Sender } from "@/types";

/**
 * filter online and offline members from a list of members of a certain channel.
 */
function filterMembers(members: Sender[]) {
  const onlineMembers: Sender[] = [];
  const offlineMembers: Sender[] = [];

  for (let member of members) {
    member.user.isActive
      ? onlineMembers.push(member)
      : offlineMembers.push(member);
  }

  return [onlineMembers, offlineMembers];
}

export { filterMembers };
