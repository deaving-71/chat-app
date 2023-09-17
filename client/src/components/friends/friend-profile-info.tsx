"use client";

import { BurgerMenu, InfoCircle } from "@/lib/utils/icons";
import dynamic from "next/dynamic";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { useRecoilValue } from "recoil";
import { SelectedFriend } from "@/lib/store";

const RightInfoBar = dynamic(
  () => import("@/components/shared/right-info-bar"),
);

export default function FriendProfileInfo() {
  const friend = useRecoilValue(SelectedFriend);

  if (!friend)
    return (
      <RightInfoBar className="flex items-center justify-center p-8 text-center font-medium">
        Select a friend to view their profile.
      </RightInfoBar>
    );

  const { id, avatar, name, username, isActive, createdAt, email } = friend;
  return (
    <RightInfoBar className="flex justify-center p-8">
      <div className="text-center">
        <Image
          src={avatar}
          alt="Profile Avatar"
          width={144}
          height={144}
          className="mx-auto h-36 w-36 rounded-full border border-border object-contain p-1"
        />
        <div className="mt-2 text-lg font-semibold">{name}</div>
        <div className="inline-block px-[0.375rem] py-[1px] text-sm font-semibold leading-3 text-success">
          <span>&#x2022;</span> Online
        </div>
      </div>

      <div className="mt-2 flex">
        <InfoCircle size={18} className="mr-4 text-foreground-secondary" />
        <div>
          <div className="mb-2">
            <div className="text-xs text-foreground-secondary">Username</div>
            <div className="text-xs font-medium">@{username}</div>
          </div>
          <div className="mb-2">
            <div className="text-xs text-foreground-secondary">Email</div>
            <div className="text-xs font-medium">{email}</div>
          </div>
          {/* <div className="mb-2">
              <div className="text-foreground-secondary text-xs">Mobile</div>
              <div className="text-xs font-medium">+213 234567890</div>
            </div> */}
          <div className="mb-2">
            <div className="text-xs text-foreground-secondary">
              Member since
            </div>
            <div className="text-xs font-medium">{formatDate(createdAt)}</div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex">
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
            <button className="hover:danger-secondary text-left text-xs font-medium text-danger hover:underline">
              Block user
            </button>
          </div>
        </div>
      </div>
    </RightInfoBar>
  );
}
