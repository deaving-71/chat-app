import { Button, Dropdown, DropdownItem } from "@/components/ui";
import { SelectedFriendId } from "@/lib/store";
import { CheckMark, XmarkRX } from "@/lib/utils/icons";
import { User } from "@/types";
import Image from "next/image";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { ButtonAction } from "..";

type Props = User & {
  requestType?: "incoming" | "outgoing";
};
export default function FriendListItem({
  id,
  avatar,
  name,
  requestType,
}: Props) {
  const selectFriendProfile = useSetRecoilState(SelectedFriendId);

  useEffect(() => {
    return () => {
      selectFriendProfile("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li>
      <div
        className="group flex w-full items-center justify-between px-4 py-1 hover:bg-muted lg:px-8 lg:py-2"
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
        {requestType === "outgoing" && (
          <ButtonAction tooltip="Cancel">
            <Button
              type="button"
              className="grid h-8 w-8 place-content-center bg-background hover:!bg-background"
              variant="circular"
            >
              <XmarkRX />
            </Button>
          </ButtonAction>
        )}
        {requestType === "incoming" && (
          <div className="flex items-center gap-2">
            <ButtonAction tooltip="Decline">
              <Button
                type="button"
                className="grid h-8 w-8 place-content-center bg-background hover:!bg-background"
                variant="circular"
              >
                <XmarkRX />
              </Button>
            </ButtonAction>
            <ButtonAction tooltip="Approve">
              <Button
                type="button"
                className="grid  h-8 w-8 place-content-center bg-background hover:!bg-background"
                variant="circular"
              >
                <CheckMark />
              </Button>
            </ButtonAction>
          </div>
        )}
        {!requestType && (
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
        )}
      </div>
    </li>
  );
}
