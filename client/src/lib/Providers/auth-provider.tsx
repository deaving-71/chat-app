import { useRecoilValue } from "recoil";
import { Session, userAtom } from "../store";
import { useAuth } from "@/hooks";
import { getProfile } from "../actions";
import { useQuery } from "@tanstack/react-query";

type AuthProviderProps = {
  children: React.ReactNode;

  /** interval time in milli-seconds */
  interval?: number;
};

function AuthProvider({
  children,
  interval = 1000 * 60 * 14,
}: AuthProviderProps) {
  const session = useRecoilValue(Session);
  const user = useRecoilValue(userAtom); // todo: remove this later
  const { refreshAccess, setUserProfile } = useAuth();
  const { status } = useQuery({
    queryKey: ["refreshAccess"],
    queryFn: refreshAccess,
    refetchInterval: interval,
  });

  useQuery({
    queryKey: ["getProfile", status, session?.status],
    queryFn: async () => {
      const data = await getProfile();
      setUserProfile(data);
      return data;
    },
    cacheTime: 1000 * 60 * 60, // 1hr
    enabled: session?.status === "authenticated" && status === "success",
  });

  return <>{children}</>;
}

export default AuthProvider;
