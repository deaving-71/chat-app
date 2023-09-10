"use client";

import { useSidebarContext } from "@/context";

export default function BlackCover() {
  const { isSidebarOpen, isRightinfobarOpen } = useSidebarContext();

  return isSidebarOpen || isRightinfobarOpen ? (
    <div className="lg:hidden block absolute top-0 left-0 bg-black/40 z-40 w-full h-[100vh]"></div>
  ) : null;
}
