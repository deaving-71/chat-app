import { SearchIcon } from "@/lib/utils/icons";
import { Input } from "../ui";
import { ChannelMembers } from ".";
import { RightInfoBar } from "../shared";

const list = {
  owner: {
    name: "DeaViNG",
    status: "on",
  },
  online: ["Gaeul", "Taehoon", "Jiksae"],
  offline: ["Gyeoul", "Choi Bomi", "Yeo Rumi"],
};

export type List = typeof list;

export default function Members() {
  return (
    <RightInfoBar className="w-[240px] row-span-2 border-l border-border sticky top-0 left-0 overflow-y-auto">
      <div className="h-[60px] flex items-center justify-center gap-[0.125rem]">
        <label htmlFor="search" className="text-foreground-secondary">
          <SearchIcon size={24} />
        </label>
        <Input
          id="search"
          variant="outline"
          //@ts-ignore <<< TypeScript bug
          size="sm"
          placeholder="Search"
          className="px-0 h-10 w-48 placeholder:text-sm"
        />
      </div>
      <ChannelMembers list={list} />
    </RightInfoBar>
  );
}
