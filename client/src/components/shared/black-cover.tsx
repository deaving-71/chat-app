"use client";

import { useSidebarContext } from "@/context";

export default function BlackCover() {
  const { isSidebarOpen, isRightinfobarOpen } = useSidebarContext();

  return isSidebarOpen || isRightinfobarOpen ? (
    <div className="absolute left-0 top-0 z-40 block h-[100vh] w-full bg-black/40 lg:hidden"></div>
  ) : null;
}
