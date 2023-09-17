"use client";

import { useSidebarContext } from "@/context";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"aside">;

export default function DefaultRightInfoBar({ className, ...props }: Props) {
  const { isRightinfobarOpen } = useSidebarContext();
  return (
    <aside
      {...props}
      className={cn(
        className,
        "sticky right-0 top-0 row-span-2 max-h-screen w-[240px] overflow-y-auto overflow-x-hidden border-l border-border",
        isRightinfobarOpen ? "" : "hidden",
      )}
    ></aside>
  );
}
