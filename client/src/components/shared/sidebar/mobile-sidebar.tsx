"use client";

import Link from "next/link";
import Image from "next/image";
import { Arrow, Hashtag, Plus } from "@/lib/utils/icons";
import { sidebar } from "@/lib/utils/constants";
import { useRecoilValue } from "recoil";
import { Channels, userAtom } from "@/lib/store";
import { Button } from "../../ui";
import { useSidebarContext } from "@/context";
import { motion } from "framer-motion";

export default function MobileSidebar() {
  const { toggleSidebar, isSidebarOpen } = useSidebarContext();
  const channels = useRecoilValue(Channels);
  const user = useRecoilValue(userAtom);

  return (
    <motion.aside
      className="fixed left-0 top-0 z-50 row-span-2 h-screen w-[240px] overflow-y-auto border-r border-border bg-background"
      initial={{ x: -240 }}
      animate={{ x: isSidebarOpen ? 0 : -240 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-[60px] border-b border-border p-4 text-right">
        <Button variant="squared" className="p-1" onClick={toggleSidebar}>
          <Arrow size={24} />
        </Button>
      </div>

      <div className="p-4">
        <div className="flex">
          <Image
            src={user?.avatar || "/assets/default_avatar.png"}
            alt="Profile Avatar"
            width={48}
            height={48}
            className="mr-2 h-12 w-12 rounded-full object-contain"
          />
          <div>
            <div className="font-semibold">{user?.name}</div>
            <div className="inline-block rounded-2xl border border-success px-[0.375rem] py-[1px] text-[0.75rem] font-semibold leading-3 text-success">
              Online
            </div>
          </div>
        </div>
      </div>

      {/* //TODO: handle overflow of channels list  */}
      <nav>
        <ul>
          {sidebar.map(({ title, Icon, href }, idx) => (
            <li key={title + idx}>
              <Link
                href={href}
                className="flex items-center px-4 py-2 font-semibold transition-all hover:bg-muted"
              >
                <Icon size={16} className="mr-2" />
                {title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mx-auto my-2 h-[1px] w-48 bg-muted" />
        <div>
          <div className="flex w-full items-center justify-between px-4 py-2 font-semibold">
            <span className="flex items-center">
              <Hashtag size={16} className="mr-2" />
              Channels
            </span>
            <button className="rounded-full p-[0.125rem] transition-all hover:bg-muted">
              <Plus size={20} />
            </button>
          </div>
          <ul>
            <li key="global-channel">
              <Link
                href="#"
                className="flex items-center py-2 pl-10 pr-4 text-sm font-semibold transition-all hover:bg-muted"
              >
                Global Channel
              </Link>
            </li>
            {channels.map(({ name, id }) => (
              <li key={id}>
                <Link
                  href={`/app/channel/${id}`}
                  className="flex items-center py-2 pl-10 pr-4 text-sm font-semibold transition-all hover:bg-muted"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </motion.aside>
  );
}
