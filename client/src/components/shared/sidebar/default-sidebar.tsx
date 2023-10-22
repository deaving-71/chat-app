"use client";

import { Arrow, Hashtag, Plus } from "@/lib/utils/icons";
import { sidebar } from "@/lib/utils/constants";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../ui";
import { useSidebarContext } from "@/context";
import { useRecoilValue } from "recoil";
import { Channels, userAtom } from "@/lib/store";

export default function DefaultSidebar() {
  const { toggleSidebar } = useSidebarContext();
  const user = useRecoilValue(userAtom);
  const channels = useRecoilValue(Channels);

  return (
    <aside className="sticky left-0 top-0 row-span-2 h-screen w-[240px] overflow-y-auto border-r border-border">
      <div className="h-[60px] border-b border-border p-4 text-right">
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

      {/* //TODO: make list of channels scrollable  */}
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
            {channels.map(({ name, id }, idx) => (
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
    </aside>
  );
}
