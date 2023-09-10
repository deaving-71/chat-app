import FriendListItem from "./friend-list-item";

const friendsList = [
  { name: "DeaViNG", status: "online" },
  { name: "another", status: "online" },
  { name: "another", status: "online" },
  { name: "another", status: "online" },
  { name: "another", status: "online" },
  { name: "another", status: "online" },
  { name: "another", status: "online" },
  { name: "another", status: "offline" },
  { name: "another", status: "offline" },
  { name: "another", status: "offline" },
  { name: "another", status: "pending" },
  { name: "another", status: "pending" },
  { name: "another", status: "pending" },
  { name: "another", status: "online" },
];

export default function MobileFriendsList() {
  return (
    <ul className="pb-4 pt-2">
      <li>
        <span className="px-2 font-medium">Online</span>
        <ul>
          {friendsList.map((friend, idx) => {
            if (friend.status === "online")
              return <FriendListItem key={friend.name + idx} {...friend} />;
          })}
        </ul>
      </li>
      <li className="mt-2">
        <span className="px-2 font-medium">Offline</span>
        <ul>
          {friendsList.map((friend, idx) => {
            if (friend.status === "offline")
              return <FriendListItem key={friend.name + idx} {...friend} />;
          })}
        </ul>
      </li>
      <li className="mt-2">
        <span className="px-2 font-medium">Pending</span>
        <ul>
          {friendsList.map((friend, idx) => {
            if (friend.status === "pending")
              return <FriendListItem key={friend.name + idx} {...friend} />;
          })}
        </ul>
      </li>
    </ul>
  );
}
