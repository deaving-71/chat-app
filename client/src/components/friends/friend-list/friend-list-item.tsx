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
        className="group flex items-center justify-between px-4 py-1 hover:bg-muted lg:px-8 lg:py-2"
        onClick={() => selectFriendProfile(id)}
      >
        <div className="flex items-center">
          <Image
            src={avatar}
            alt="Profile Avatar"
            width={36}
            height={36}
            className="mr-2 h-9 w-9 rounded-full object-contain"
          />
          <span className="font-medium">{name}</span>
        </div>
        <Dropdown>
          <DropdownItem>
            <button className="w-full rounded-sm px-2 py-1 text-left hover:bg-muted">
              Send a message
            </button>
          </DropdownItem>
          <DropdownItem>
            <button className="w-full rounded-sm px-2 py-1 text-left hover:bg-muted">
              Remove friend
            </button>
          </DropdownItem>
        </Dropdown>
      </button>
    </li>
  );
}
