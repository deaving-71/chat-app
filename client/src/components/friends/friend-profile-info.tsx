"use client";

import { BurgerMenu, InfoCircle } from "@/lib/utils/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { RightInfoBar } from "../shared";

type Props = { className?: string };

export default function FriendProfileInfo({ className }: Props) {
  return (
    <RightInfoBar className="p-8 flex justify-center">
      <div>
        <div className="text-center">
          <Image
            src={"/assets/default_avatar.png"}
            alt="Profile Avatar"
            width={144}
            height={144}
            className="rounded-full object-contain w-36 h-36 p-1 border border-border mx-auto"
          />
          <div className="text-lg font-semibold mt-2">DeaViNG</div>
          <div className="font-semibold text-success text-sm leading-3 px-[0.375rem] py-[1px] inline-block">
            <span>&#x2022;</span> Online
          </div>
        </div>

        <div className="flex mt-2">
          <InfoCircle size={18} className="mr-4 text-foreground-secondary" />
          <div>
            <div className="mb-2">
              <div className="text-foreground-secondary text-xs">Username</div>
              <div className="text-xs font-medium">@deaving</div>
            </div>
            <div className="mb-2">
              <div className="text-foreground-secondary text-xs">Email</div>
              <div className="text-xs font-medium">example@email.com</div>
            </div>
            <div className="mb-2">
              <div className="text-foreground-secondary text-xs">Mobile</div>
              <div className="text-xs font-medium">+213 234567890</div>
            </div>
            <div className="mb-2">
              <div className="text-foreground-secondary text-xs">
                Member since
              </div>
              <div className="text-xs font-medium">18 May 2023</div>
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
      </div>
    </RightInfoBar>
  );
}
