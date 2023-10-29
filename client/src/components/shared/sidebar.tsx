"use client";

import Image from "next/image";
import { Button } from "../ui";
import { Arrow, Hashtag, Plus } from "@/lib/utils/icons";
import Link from "next/link";
import { cn, sidebar } from "@/lib/utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { Channels, SidebarAtom, userAtom } from "@/lib/store";
import { Drawer } from "../ui";
import { useMediaQuery } from "@/hooks";

function Sidebar() {
  const user = useRecoilValue(userAtom);
  const channels = useRecoilValue(Channels);

  const [open, setOpen] = useRecoilState(SidebarAtom);
  const toggleDrawer = () => setOpen((prev) => !prev);

  const lg = useMediaQuery(1024);
  const showText = lg ? true : open;

  return (
    <Drawer.Root
      open={open}
      toggleDrawer={toggleDrawer}
      className="row-span-2 h-screen overflow-y-auto whitespace-nowrap border-r border-border bg-background"
    >
      <aside>
        <div className="h-[60px] border-b border-border p-4 text-right">
          <Drawer.Trigger asChild>
            <Button
              variant="squared"
              className="bg-background p-1 hover:bg-muted"
            >
              <Arrow className={cn(!open && "lg:rotate-180")} size={24} />
            </Button>
          </Drawer.Trigger>
        </div>
        <div className="p-4">
          <div className="flex">
            <Image
              src={"/assets/default_avatar.png"}
              alt="Profile Avatar"
              width={48}
              height={48}
              className={cn(
                "h-12 w-12 rounded-full object-contain",
                showText && "mr-2",
              )}
            />
            {showText && (
              <div>
                <div className="font-semibold">{user?.name}</div>
                <div className="inline-block rounded-2xl border border-success px-[0.375rem] py-[1px] text-[0.75rem] font-semibold leading-3 text-success">
                  Online
                </div>
              </div>
            )}
          </div>
        </div>
        {/* //TODO: make list of channels scrollable  */}
        <nav>
          <ul>
            {sidebar.map(({ title, Icon, href }, idx) => (
              <li key={title + idx}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center px-4 py-2 font-semibold transition-all hover:bg-muted",
                    showText ? "" : "justify-center",
                  )}
                >
                  <Icon
                    size={showText ? 20 : 24}
                    className={showText && "mr-2"}
                  />
                  {showText && title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto my-2 h-[1px] w-48 bg-muted" />
          <div>
            <div
              className={cn(
                "flex w-full items-center px-4 py-2 font-semibold",
                showText ? "justify-between " : "justify-center",
              )}
            >
              <span className="flex items-center">
                <Hashtag
                  size={showText ? 20 : 24}
                  className={showText && "mr-2"}
                />
                {showText && "Channels"}
              </span>
              {showText && (
                <button className="rounded-full p-[0.125rem] transition-all hover:bg-muted">
                  <Plus size={20} />
                </button>
              )}
            </div>
            {showText && (
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
            )}
          </div>
        </nav>
      </aside>
    </Drawer.Root>
  );
}
export { Sidebar };
