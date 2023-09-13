import { login, logout, register, getAccessToken } from "@/lib/actions";
import {
  FriendRequestsReceived,
  FriendRequestsSent,
  Friends,
  OwnedChannels,
  Session,
  Channels,
  User,
} from "@/lib/store";
import { LoginCredentials, SignInOptions, UserProfileInfo } from "@/types";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

function useAuth() {
  const setSession = useSetRecoilState(Session);
  const setUser = useSetRecoilState(User);
  const setChannels = useSetRecoilState(Channels);
  const setOwnedChannels = useSetRecoilState(OwnedChannels);
  const setFriends = useSetRecoilState(Friends);
  const setFriendRequestsReceived = useSetRecoilState(FriendRequestsReceived);
  const setFriendRequestsSents = useSetRecoilState(FriendRequestsSent);
  const router = useRouter();

  const signIn = async (data: LoginCredentials) => {
    const response = await login(data);
    setUserProfile(response.data);
    setSession({
      status: "authenticated",
      expiresIn: 1000 * 60 * 14, //todo: get expiry time from the request instead
    });
    // router.push("/app");
  };

  const setUserProfile = (data: UserProfileInfo) => {
    console.log(data);
    const {
      friends,
      friendRequestReceived,
      friendRequestSent,
      channels,
      member,
      ...User
    } = data;

    setUser(User);
    setChannels(member.channels);
    setOwnedChannels(channels);
    setFriends(friends);
    setFriendRequestsReceived(friendRequestReceived);
    setFriendRequestsSents(friendRequestSent);
  };

  const signUp = async () => {};

  const signOut = async () => {};

  const refreshAccess = async () => {
    try {
      await getAccessToken();
      setSession({
        status: "authenticated",
        expiresIn: 1000 * 60 * 14,
      });
      return "finished";
    } catch (err) {
      console.error(err);
      setSession({
        status: "unauthenticated",
        expiresIn: undefined,
      });
    }
  };
  return { signIn, signOut, signUp, refreshAccess, setUserProfile };
}

export default useAuth;
