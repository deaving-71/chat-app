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
        "w-[240px] row-span-2 border-l border-border sticky top-0 right-0 overflow-y-auto max-h-screen overflow-x-hidden",
        isRightinfobarOpen ? "" : "hidden"
      )}
    ></aside>
  );
}
