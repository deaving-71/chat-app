"use client";

import { BurgerMenu } from "@/lib/utils/icons";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { useMediaQuery } from "usehooks-ts";
import { useSidebarContext } from "@/context";

type Props = React.ComponentProps<"div">;

export default function RootHeader({ children, className, ...props }: Props) {
  const { toggleSidebar } = useSidebarContext();
  const lg = useMediaQuery("(min-width: 1024px)");

  return (
    <header className="border-boder h-header border-b px-4 lg:px-8">
      <div className="flex h-full items-center">
        {lg ? null : (
          <Button
            variant="circular"
            size="sm"
            className="mr-2"
            onClick={toggleSidebar}
          >
            <BurgerMenu />
          </Button>
        )}
        <div {...props} className={cn(className, "w-full")}>
          {children}
        </div>
      </div>
    </header>
  );
}
