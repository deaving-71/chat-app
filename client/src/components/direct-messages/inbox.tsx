import { SearchIcon } from "@/lib/utils/icons";
import { Input } from "../ui";
import { ChatThreadList } from ".";
import { RightInfoBar } from "../shared";

const list = [
  {
    name: "DeaViNG",
    lastMessageTimestamp: "9:03",
    status: "on",
    lastMessage:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eum voluptatibus quaerat deserunt. Animi, quisquam earum! Suscipit corrupti odio fuga similique laudantium cumque perspiciatis, reprehenderit doloribus laboriosam aliquam! Impedit, quas.",
  },
  {
    name: "Gaeul",
    lastMessageTimestamp: "10:37",
    status: "off",
    lastMessage:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eum voluptatibus quaerat deserunt. Animi, quisquam earum! Suscipit corrupti odio fuga similique laudantium cumque perspiciatis, reprehenderit doloribus laboriosam aliquam! Impedit, quas.",
  },
];

export default function Inbox() {
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
      <ChatThreadList list={list} />
    </RightInfoBar>
  );
}
