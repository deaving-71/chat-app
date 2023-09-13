import { useRecoilValue } from "recoil";
import FriendListItem from "./friend-list-item";
import { Friends } from "@/lib/store";

export default function DefaultFriendsList() {
  const friends = useRecoilValue(Friends);

  return (
    <ul className="pb-8">
      {friends.map((friend) => (
        <FriendListItem key={friend.id} {...friend} />
      ))}
    </ul>
  );
}
