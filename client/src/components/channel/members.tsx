import { SearchIcon } from "@/lib/utils/icons";
import { Input } from "../ui";
import { ChannelMembers } from ".";
import { RightInfoBar } from "../shared";

export default function Members() {
  return (
    <RightInfoBar className="sticky left-0 top-0 row-span-2 w-[240px] overflow-y-auto border-l border-border">
      <div className="flex h-[60px] items-center justify-center gap-[0.125rem]">
        <label htmlFor="search" className="text-foreground-secondary">
          <SearchIcon size={24} />
        </label>
        <Input
          id="search"
          variant="transparent"
          //@ts-ignore <<< TypeScript bug
          size="sm"
          placeholder="Search"
          className="h-10 w-48 px-0 placeholder:text-sm"
        />
      </div>
      <ChannelMembers />
    </RightInfoBar>
  );
}
