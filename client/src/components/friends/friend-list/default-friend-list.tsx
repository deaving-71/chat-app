import { useRecoilValue } from "recoil";
import FriendListItem from "./friend-list-item";
import {
  FriendRequestsReceived,
  FriendRequestsSent,
  Friends,
} from "@/lib/store";

export default function DefaultFriendsList() {
  const friends = useRecoilValue(Friends);
  const friendRequestsSent = useRecoilValue(FriendRequestsSent);
  const friendRequestsReceived = useRecoilValue(FriendRequestsReceived);

  return (
    <ul className="pb-8">
      {friends.map((friend) => (
        <FriendListItem key={friend.id} {...friend} />
      ))}
      {friendRequestsSent.map(({ receiver }) => (
        <FriendListItem
          key={receiver.id}
          {...receiver}
          requestType="outgoing"
        />
      ))}
      {friendRequestsReceived.map(({ sender }) => (
        <FriendListItem key={sender.id} {...sender} requestType="incoming" />
      ))}
    </ul>
  );
}
