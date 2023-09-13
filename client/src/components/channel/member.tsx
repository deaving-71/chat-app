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
    <li className="flex gap-1 w-full p-1 hover:bg-muted transition-all group px-4">
      <div className="relative rounded-full w-8 h-8 mr-2">
        <Image
          src={"/assets/default_avatar.png"}
          alt="Profile Avatar"
          width={32}
          height={32}
          className="rounded-full object-contain w-8 h-8 inline-block"
        />
        <StatusDot status={status} />
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="font-medium text-sm">{name}</div>
        <button className="invisible group-hover:visible">
          <ThreeDots />
        </button>
      </div>
    </li>
  );
}
