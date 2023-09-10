import { login, logout, register, getAccessToken } from "@/lib/actions";
import { Session, User } from "@/lib/store";
import { logExceptions } from "@/lib/utils";
import { LoginCredentials, SignInOptions, UserProfileInfo } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

function useAuth() {
  const setSession = useSetRecoilState(Session);
  const setUser = useSetRecoilState(User);
  const router = useRouter();

  useEffect(() => {
    setSession({ status: "loading" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const {
      friends,
      friendRequestReceived,
      friendRequestSent,
      channels,
      member,
      ...User
    } = data;

    setUser(User);
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
