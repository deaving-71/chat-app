"use client";

import DefaultSidebar from "./default-sidebar";
import CollapsedSidebar from "./collapsed-sidebar";
import MobileSidebar from "./mobile-sidebar";
import { useSidebarContext } from "@/context";
import { useMediaQuery } from "usehooks-ts";

export default function Sidebar() {
  const { isSidebarOpen } = useSidebarContext();
  const lg = useMediaQuery("(min-width: 1024px)");

  const CurrentSidebar = {
    default: DefaultSidebar,
    collapsed: CollapsedSidebar,
  }[isSidebarOpen ? "default" : "collapsed"];

  return lg ? <CurrentSidebar /> : <MobileSidebar />;
}
