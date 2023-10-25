"use client";

import { Drawer } from "@/components/ui";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <>
    <button className= "rounded-md bg-blue-500 p-2 text-sm hover:bg-blue-700" onClick={toggleDrawer}>trigger 2</button>
      <Drawer.Root open={open} toggleDrawer={toggleDrawer}>
        <Drawer.Trigger></Drawer.Trigger>
        <Drawer.Content>
          <p>Hey there</p>
        </Drawer.Content>
      </Drawer.Root>
      <main className="mx-auto w-[500px] pt-56">
        <h1>Main page</h1>
      </main>
    </>
  );
}
