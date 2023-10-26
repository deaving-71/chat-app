"use client";

import { CollapsibleDrawer as Drawer } from "@/components/ui";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <>
      <button
        className="rounded-md bg-blue-500 p-2 text-sm hover:bg-blue-700"
        onClick={toggleDrawer}
      >
        trigger 2
      </button>
      <div className="grid grid-cols-[auto,1fr] gap-2">
        <main className="basis-full">
          <h1>Main page</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, sit
            praesentium nulla maiores ullam dicta quis nobis mollitia corporis
            sequi, obcaecati rerum eligendi iusto? Asperiores dolore nam
            accusantium dicta totam. Sit ipsam provident reprehenderit,
            voluptatem reiciendis maiores labore aliquid consequatur eligendi
            officiis excepturi autem ipsum corrupti iste fuga nostrum tenetur
            non, facere fugit laborum nihil, itaque atque ea in? Saepe. Quo
            perspiciatis, iure, optio suscipit quod saepe eligendi similique
            illum delectus magni obcaecati rerum enim nihil? Libero error
            cupiditate laboriosam? Praesentium illo impedit blanditiis tempora
            vero sequi similique, inventore deserunt. Dignissimos quisquam
            suscipit provident blanditiis repudiandae eveniet ad ab, consectetur
            veritatis, saepe ipsa molestiae aut, odio deleniti ut possimus
            assumenda quos delectus hic. Aut nisi itaque eos labore ipsa
            voluptas? Magni, esse ipsam illum dolor est animi iste nemo
            repellendus sunt doloremque pariatur. Quod dolores asperiores cumque
            itaque facere deserunt minima! Praesentium minus odit quia fugit
            quasi quae quibusdam quod.
          </p>
        </main>
        <Drawer.Root
          open={open}
          toggleDrawer={toggleDrawer}
          className="basis-[280px]"
          dir="right"
        >
          <Drawer.Trigger></Drawer.Trigger>
          <p>Drawer</p>
        </Drawer.Root>
      </div>
    </>
  );
}
