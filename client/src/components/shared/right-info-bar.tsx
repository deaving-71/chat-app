"use client";

import { CollapsibleDrawer as Drawer } from "../ui";
import { useRecoilState } from "recoil";
import { RightInfoBarAtom } from "@/lib/store";

type Props = React.PropsWithChildren;

function RightInfoBar({ children }: Props) {
  const [open, setOpen] = useRecoilState(RightInfoBarAtom);
  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <Drawer.Root
      open={open}
      toggleDrawer={toggleDrawer}
      className="row-span-2 border-l border-border bg-background shadow-md md:shadow-none"
      width={240}
      dir="right"
    >
      <div>
        <button onClick={toggleDrawer}>toggle</button>
      </div>
      {children}
    </Drawer.Root>
  );
}

export { RightInfoBar };
