"use client";

import { UserRectangle } from "@/lib/utils/icons";
import { Button } from "../ui";
import { RootHeader } from "../shared";
import { useSetRecoilState } from "recoil";
import { RightInfoBarAtom } from "@/lib/store";

function Header() {
  const setOpen = useSetRecoilState(RightInfoBarAtom);
  const toggleRightinfobar = () => setOpen((prev) => !prev);

  return (
    <RootHeader className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Friends</h1>
      <Button variant="circular" size="sm" onClick={toggleRightinfobar}>
        <UserRectangle size={20} />
      </Button>
    </RootHeader>
  );
}

export { Header };
