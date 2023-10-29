"use client";

import { BurgerMenu } from "@/lib/utils/icons";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { useSetRecoilState } from "recoil";
import { SidebarAtom } from "@/lib/store";

type Props = React.ComponentProps<"div">;

function RootHeader({ children, className, ...props }: Props) {
  const setOpen = useSetRecoilState(SidebarAtom);

  return (
    <header className="border-boder h-header border-b px-4 lg:px-8">
      <div className="flex h-full items-center">
        <Button
          variant="circular"
          size="sm"
          className="mr-2 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <BurgerMenu />
        </Button>
        <div {...props} className={cn(className, "w-full")}>
          {children}
        </div>
      </div>
    </header>
  );
}

export { RootHeader };
