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
    <header className="h-header border-boder border-b lg:px-8 px-4">
      <div className="flex items-center h-full">
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
