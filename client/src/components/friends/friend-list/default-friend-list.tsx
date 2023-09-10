import FriendListItem from "./friend-list-item";

export default function DefaultFriendsList() {
  return (
    <ul className="pb-8">
      {[
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
      ].map((friend, idx) => {
        return <FriendListItem key={friend.name + idx} {...friend} />;
      })}
    </ul>
  );
}
