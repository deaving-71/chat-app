import { useRecoilValue } from "recoil";
import { Session } from "../store";
import { useAuth } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

type AuthProviderProps = {
  children: React.ReactNode;

  /** interval time in milli-seconds, default is 14mins */
  interval?: number;
};

function AuthProvider({
  children,
  interval = 1000 * 60 * 14,
}: AuthProviderProps) {
  const { refreshAccess, setUserProfile } = useAuth();
  const session = useRecoilValue(Session);

  useQuery({
    queryKey: ["refreshAccess"],
    queryFn: async () => {
      const data = await refreshAccess();
      // @ts-ignore //? type set correctly but still getting type error
      setUserProfile(data);
      return data;
    },
    refetchInterval: interval,
    enabled: session?.status === "loading",
  });

  return <>{children}</>;
}

export default AuthProvider;
