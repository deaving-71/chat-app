"use client";

import { Button, CollapsibleDrawer as Drawer } from "../ui";
import { useRecoilState } from "recoil";
import { RightInfoBarAtom } from "@/lib/store";
import { Arrow } from "@/lib/utils/icons";
import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren;

function RightInfoBar({ children }: Props) {
  const [open, setOpen] = useRecoilState(RightInfoBarAtom);
  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <Drawer.Root
      open={open}
      toggleDrawer={toggleDrawer}
      className="row-span-2 border-l border-border bg-background shadow-md lg:shadow-none"
      width={240}
      dir="right"
    >
      <div className="h-[60px] border-b border-border p-4 text-left lg:hidden">
        <Drawer.Trigger asChild>
          <Button
            variant="squared"
            className="bg-background p-1 hover:bg-muted"
          >
            <Arrow className="rotate-180" size={24} />
          </Button>
        </Drawer.Trigger>
      </div>
      {children}
    </Drawer.Root>
  );
}

export { RightInfoBar };
