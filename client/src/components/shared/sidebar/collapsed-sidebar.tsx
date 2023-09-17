"use client";

import { Arrow, Hashtag } from "@/lib/utils/icons";
import { sidebar } from "@/lib/utils/constants";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../ui";
import { useSidebarContext } from "@/context";
import { useRecoilValue } from "recoil";
import { User } from "@/lib/store";

export default function CollapsedSidebar() {
  const { toggleSidebar } = useSidebarContext();
  const user = useRecoilValue(User);

  return (
    <aside className="sticky left-0 top-0 row-span-2 h-screen w-[80px] overflow-y-auto border-r border-border">
      <div className="h-[60px] border-b border-border p-4 text-center">
        <Button
          variant="squared"
          className="rotate-180 p-1"
          onClick={toggleSidebar}
        >
          <Arrow size={24} />
        </Button>
      </div>

      <div className="p-4">
        <Image
          src={user?.avatar || "/assets/default_avatar.png"}
          alt="Profile Avatar"
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-contain"
        />
      </div>

      {/* //TODO: handle overflow of channels list  */}
      <nav>
        <ul>
          {sidebar.map(({ title, Icon, href }, idx) => (
            <li key={title + idx}>
              <Link
                href={href}
                className="flex items-center justify-center py-4 transition-all hover:bg-muted"
              >
                <Icon size={24} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mx-auto my-2 h-[1px] w-[calc(100%-1rem)] bg-muted" />
        <div>
          <div className="flex cursor-pointer items-center justify-center py-4 transition-all hover:bg-muted">
            <Hashtag size={24} />
            {/* <button className="p-[0.125rem] hover:bg-muted transition-all rounded-full">
              <Plus size={20} />
            </button> */}
          </div>
        </div>
      </nav>
    </aside>
  );
}
