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
    <main className="flex h-full min-h-screen items-center justify-center bg-gradient-to-tl from-secondary to-primary text-foreground">
      <div className="overflow-hidden rounded-lg bg-background shadow-[_10px_10px_30px_var(--background)]">
        <div className="flex border-b border-[rgb(var(--primary)/0.2)] font-medium">
          <Link
            href="/auth/login"
            className={cn(
              "w-full basis-1/2 border-primary p-2 text-center transition-all",
              routeName === "login" ? "border-b-2" : "hover:bg-muted",
            )}
          >
            Sign in
          </Link>
          <Link
            href="/auth/sign-up"
            className={cn(
              "w-full basis-1/2 border-primary p-2 text-center transition-all",
              routeName === "sign-up" ? "border-b-2" : "hover:bg-muted",
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
