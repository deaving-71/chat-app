import { Dropdown, DropdownItem } from "@/components/ui";
import { SelectedFriendId } from "@/lib/store";
import { User } from "@/types";
import Image from "next/image";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function FriendListItem({ id, avatar, name }: User) {
  const selectFriendProfile = useSetRecoilState(SelectedFriendId);

  useEffect(() => {
    return () => {
      selectFriendProfile("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li>
      <button
        className="flex items-center justify-between hover:bg-muted lg:px-8 lg:py-2 px-4 py-1 group"
        onClick={() => selectFriendProfile(id)}
      >
        <div className="flex items-center">
          <Image
            src={avatar}
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
      </button>
    </li>
  );
}
