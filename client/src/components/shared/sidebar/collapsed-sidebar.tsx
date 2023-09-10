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
    <aside className="w-[80px] row-span-2 border-r border-border sticky top-0 left-0 h-screen overflow-y-auto">
      <div className="h-[60px] p-4 border-b border-border text-center">
        <Button
          variant="squared"
          className="p-1 rotate-180"
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
          className="rounded-full object-contain w-12 h-12"
        />
      </div>

      {/* //TODO: handle overflow of channels list  */}
      <nav>
        <ul>
          {sidebar.map(({ title, Icon, href }, idx) => (
            <li key={title + idx}>
              <Link
                href={href}
                className="flex items-center justify-center py-4 hover:bg-muted transition-all"
              >
                <Icon size={24} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="h-[1px] w-[calc(100%-1rem)] bg-muted mx-auto my-2" />
        <div>
          <div className="flex items-center justify-center py-4 hover:bg-muted transition-all cursor-pointer">
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
