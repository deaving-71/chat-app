import { ChannelMessageExtended, Sender } from "@/types";

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

function filterChannelMessages(messages: ChannelMessageExtended[]) {
  return messages.map((message) => {
    const { sender, ...rest } = message;
    return {
      ...rest,
      senderName: sender.user.name,
      senderAvatar: sender.user.avatar,
    };
  });
}

export { filterMembers, filterChannelMessages };
