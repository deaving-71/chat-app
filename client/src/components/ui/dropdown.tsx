"use client";

import { ThreeDots } from "@/lib/utils/icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type Props = { children: React.ReactNode };

export function Dropdown({ children }: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="invisible group-hover:visible data-[state=open]:visible"
          aria-label="Customise options"
        >
          <ThreeDots />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white border-border border shadow-lg p-2 rounded-md text-sm font-medium ">
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export function DropdownItem({ children }: Props) {
  return (
    <DropdownMenu.Item className="hover:outline-none">
      {children}
    </DropdownMenu.Item>
  );
}
