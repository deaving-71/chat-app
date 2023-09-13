"use client";

import dynamic from "next/dynamic";
import DefaultSidebar from "./sidebar/default-sidebar";
import CollapsedSidebar from "./sidebar/collapsed-sidebar";
import MobileSidebar from "./sidebar/mobile-sidebar";
import { useSidebarContext } from "@/context";
import { useMediaQuery } from "usehooks-ts";

function Sidebar() {
  const { isSidebarOpen } = useSidebarContext();
  const lg = useMediaQuery("(min-width: 1024px)");

  const CurrentSidebar = {
    default: DefaultSidebar,
    collapsed: CollapsedSidebar,
  }[isSidebarOpen ? "default" : "collapsed"];

  return lg ? <CurrentSidebar /> : <MobileSidebar />;
}

export default dynamic(() => Promise.resolve(Sidebar), { ssr: false });
