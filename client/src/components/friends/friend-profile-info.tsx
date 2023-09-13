"use client";

import { BurgerMenu, InfoCircle } from "@/lib/utils/icons";
import dynamic from "next/dynamic";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { useRecoilValue } from "recoil";
import { SelectedFriend } from "@/lib/store";

const RightInfoBar = dynamic(
  () => import("@/components/shared/right-info-bar")
);

export default function FriendProfileInfo() {
  const friend = useRecoilValue(SelectedFriend);

  if (!friend)
    return (
      <RightInfoBar className="p-8 flex justify-center items-center text-center font-medium">
        Select a friend to view their profile.
      </RightInfoBar>
    );

  const { id, avatar, name, username, isActive, createdAt, email } = friend;
  return (
    <RightInfoBar className="p-8 flex justify-center">
      <div className="text-center">
        <Image
          src={avatar}
          alt="Profile Avatar"
          width={144}
          height={144}
          className="rounded-full object-contain w-36 h-36 p-1 border border-border mx-auto"
        />
        <div className="text-lg font-semibold mt-2">{name}</div>
        <div className="font-semibold text-success text-sm leading-3 px-[0.375rem] py-[1px] inline-block">
          <span>&#x2022;</span> Online
        </div>
      </div>

      <div className="flex mt-2">
        <InfoCircle size={18} className="mr-4 text-foreground-secondary" />
        <div>
          <div className="mb-2">
            <div className="text-foreground-secondary text-xs">Username</div>
            <div className="text-xs font-medium">@{username}</div>
          </div>
          <div className="mb-2">
            <div className="text-foreground-secondary text-xs">Email</div>
            <div className="text-xs font-medium">{email}</div>
          </div>
          {/* <div className="mb-2">
              <div className="text-foreground-secondary text-xs">Mobile</div>
              <div className="text-xs font-medium">+213 234567890</div>
            </div> */}
          <div className="mb-2">
            <div className="text-foreground-secondary text-xs">
              Member since
            </div>
            <div className="text-xs font-medium">{formatDate(createdAt)}</div>
          </div>
        </div>
      </div>

      <div className="flex mt-2">
        <BurgerMenu size={18} className="mr-4 text-foreground-secondary" />
        <div>
          <div className="flex flex-col gap-1">
            <button className="text-left text-xs font-medium hover:text-strong-foreground hover:underline">
              Share contact
            </button>
            <button className="text-left text-xs font-medium hover:text-strong-foreground hover:underline">
              Clear chat
            </button>
            <button className="text-left text-xs font-medium hover:text-strong-foreground hover:underline">
              Remove friend
            </button>
            <button className="text-left text-xs font-medium text-danger hover:danger-secondary hover:underline">
              Block user
            </button>
          </div>
        </div>
      </div>
    </RightInfoBar>
  );
}
