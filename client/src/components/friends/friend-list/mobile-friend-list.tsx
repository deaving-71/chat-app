import { useRecoilValue } from "recoil";
import FriendListItem from "./friend-list-item";
import { Friends } from "@/lib/store";

export default function MobileFriendsList() {
  const friends = useRecoilValue(Friends);

  return (
    <ul className="pb-4 pt-2">
      <li>
        <span className="px-2 font-medium">Online</span>
        <ul>
          {friends.map((friend, idx) => {
            if (friend.isActive)
              //online friends
              return <FriendListItem key={friend.name + idx} {...friend} />;
          })}
        </ul>
      </li>
      <li className="mt-2">
        <span className="px-2 font-medium">Offline</span>
        <ul>
          {friends.map((friend, idx) => {
            if (!friend.isActive)
              //offline friends
              return <FriendListItem key={friend.name + idx} {...friend} />;
          })}
        </ul>
      </li>
      {/* <li className="mt-2">
        <span className="px-2 font-medium">Pending</span>
        <ul>
          {friends.map((friend, idx) => {
            if (friend.status === "pending")
              return <FriendListItem key={friend.name + idx} {...friend} />;
          })}
        </ul>
      </li> */}
    </ul>
  );
}
