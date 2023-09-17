import Image from "next/image";
import React from "react";
import { StatusDot } from "../shared";
import { ThreeDots } from "@/lib/utils/icons";

type Props = {
  name: string;
  status: boolean;
};

export default function Member({ name, status }: Props) {
  return (
    <li className="group flex w-full gap-1 p-1 px-4 transition-all hover:bg-muted">
      <div className="relative mr-2 h-8 w-8 rounded-full">
        <Image
          src={"/assets/default_avatar.png"}
          alt="Profile Avatar"
          width={32}
          height={32}
          className="inline-block h-8 w-8 rounded-full object-contain"
        />
        <StatusDot status={status} />
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="text-sm font-medium">{name}</div>
        <button className="invisible group-hover:visible">
          <ThreeDots />
        </button>
      </div>
    </li>
  );
}
