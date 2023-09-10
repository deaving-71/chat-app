"use client";

import { Session } from "@/lib/store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const path = usePathname();
  const routeName = path.split("/").at(-1);
  const session = useRecoilValue(Session);
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/app");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.status]);

  return (
    <main className="flex items-center justify-center from-secondary to-primary bg-gradient-to-tl text-foreground min-h-screen h-full">
      <div className="bg-background rounded-lg shadow-[_10px_10px_30px_var(--background)] overflow-hidden">
        <div className="flex font-medium border-b border-[rgb(var(--primary)/0.2)]">
          <Link
            href="/auth/login"
            className={cn(
              "basis-1/2 text-center w-full p-2 border-primary transition-all",
              routeName === "login" ? "border-b-2" : "hover:bg-muted"
            )}
          >
            Sign in
          </Link>
          <Link
            href="/auth/sign-up"
            className={cn(
              "basis-1/2 text-center w-full p-2 transition-all border-primary",
              routeName === "sign-up" ? "border-b-2" : "hover:bg-muted"
            )}
          >
            Sign up
          </Link>
        </div>
        {children}
      </div>
    </main>
  );
}
