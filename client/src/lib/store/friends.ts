import { FriendRequestReceived, FriendRequestSent, User } from "@/types";
import { atom, selector } from "recoil";

const Friends = atom<User[]>({
  key: "Friends",
  default: [],
});

const FriendRequestsReceived = atom<FriendRequestReceived[]>({
  key: "FriendRequestsReceived",
  default: [],
});

const FriendRequestsSent = atom<FriendRequestSent[]>({
  key: "FriendRequestsSent",
  default: [],
});

const SelectedFriendId = atom<string>({
  key: "SelectedFriendProfile",
  default: "",
});

const SelectedFriend = selector<User | null>({
  key: "SelectedFriends",
  get: ({ get }) => {
    const selectedFriendId = get(SelectedFriendId);
    const friends = get(Friends);
    const selectedFriendProfile = friends.find(
      (friend) => friend.id === selectedFriendId,
    );
    if (!selectedFriendProfile) return null;
    return selectedFriendProfile;
  },
});

export {
  Friends,
  FriendRequestsReceived,
  FriendRequestsSent,
  SelectedFriend,
  SelectedFriendId,
};
