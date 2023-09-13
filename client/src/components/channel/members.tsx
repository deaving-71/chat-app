import { SearchIcon } from "@/lib/utils/icons";
import { Input } from "../ui";
import { ChannelMembers } from ".";
import { RightInfoBar } from "../shared";
import { Sender, User } from "@/types";

type Props = {
  channelOwner: User;
  members: Sender[];
};
export default function Members({ channelOwner, members }: Props) {
  return (
    <RightInfoBar className="w-[240px] row-span-2 border-l border-border sticky top-0 left-0 overflow-y-auto">
      <div className="h-[60px] flex items-center justify-center gap-[0.125rem]">
        <label htmlFor="search" className="text-foreground-secondary">
          <SearchIcon size={24} />
        </label>
        <Input
          id="search"
          variant="transparent"
          //@ts-ignore <<< TypeScript bug
          size="sm"
          placeholder="Search"
          className="px-0 h-10 w-48 placeholder:text-sm"
        />
      </div>
      <ChannelMembers channelOwner={channelOwner} members={members} />
    </RightInfoBar>
  );
}
