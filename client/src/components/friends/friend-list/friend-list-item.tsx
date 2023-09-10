import { Dropdown, DropdownItem } from "@/components/ui";
import Image from "next/image";

type Props = {
  name: string;
};

export default function FriendListItem({ name }: Props) {
  return (
    <li>
      <div className="flex items-center justify-between hover:bg-muted lg:px-8 lg:py-2 px-4 py-1 group">
        <div className="flex items-center">
          <Image
            src={"/assets/default_avatar.png"}
            alt="Profile Avatar"
            width={36}
            height={36}
            className="rounded-full object-contain mr-2 w-9 h-9"
          />
          <span className="font-medium">{name}</span>
        </div>
        <Dropdown>
          <DropdownItem>
            <button className="text-left px-2 py-1 rounded-sm hover:bg-muted w-full">
              Send a message
            </button>
          </DropdownItem>
          <DropdownItem>
            <button className="text-left px-2 py-1 rounded-sm hover:bg-muted w-full">
              Remove friend
            </button>
          </DropdownItem>
        </Dropdown>
      </div>
    </li>
  );
}
