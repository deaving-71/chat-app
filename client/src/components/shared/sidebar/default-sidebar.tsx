"use client";

import { Arrow, Hashtag, Plus } from "@/lib/utils/icons";
import { sidebar } from "@/lib/utils/constants";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../ui";
import { useSidebarContext } from "@/context";
import { useRecoilValue } from "recoil";
import { User } from "@/lib/store";

export default function DefaultSidebar() {
  const { toggleSidebar } = useSidebarContext();
  const user = useRecoilValue(User);

  return (
    <aside className="w-[240px] row-span-2 border-r border-border sticky top-0 left-0 h-screen overflow-y-auto">
      <div className="h-[60px] p-4 border-b border-border text-right">
        <Button variant="squared" className="p-1" onClick={toggleSidebar}>
          <Arrow size={24} />
        </Button>
      </div>

      <div className="p-4">
        <div className="flex">
          <Image
            src={"/assets/default_avatar.png"}
            alt="Profile Avatar"
            width={48}
            height={48}
            className="rounded-full object-contain mr-2 w-12 h-12"
          />
          <div>
            <div className="font-semibold">{user?.name}</div>
            <div className="font-semibold text-success text-[0.75rem] leading-3 px-[0.375rem] py-[1px] rounded-2xl border border-success inline-block">
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
                className="flex items-center font-semibold px-4 py-2 hover:bg-muted transition-all"
              >
                <Icon size={16} className="mr-2" />
                {title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="h-[1px] w-48 bg-muted mx-auto my-2" />
        <div>
          <div className="flex items-center justify-between font-semibold px-4 py-2 w-full">
            <span className="flex items-center">
              <Hashtag size={16} className="mr-2" />
              Channels
            </span>
            <button className="p-[0.125rem] hover:bg-muted transition-all rounded-full">
              <Plus size={20} />
            </button>
          </div>
          <ul>
            <li key="global-channel">
              <Link
                href="#"
                className="flex items-center font-semibold pl-10 text-sm pr-4 py-2 hover:bg-muted transition-all"
              >
                Global Channel
              </Link>
            </li>
            {[{ name: "Channel-1" }].map(({ name }, idx) => (
              <li key={name + idx}>
                <Link
                  href="#"
                  className="flex items-center font-semibold pl-10 text-sm pr-4 py-2 hover:bg-muted transition-all"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
