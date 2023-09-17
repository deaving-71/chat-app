"use client";

import { Button } from "@/components/ui";
import { useSidebarContext } from "@/context";
import { Xmark } from "@/lib/utils/icons";
import { MotionProps, motion } from "framer-motion";

type Props = React.ComponentPropsWithRef<"aside"> & MotionProps;

const variants = {
  open: {
    opacity: [0, 1, 1, 1],
    x: [0, 0, 0, 0],
    scale: ["85%", "94%", "98%", "100%"],
  },
  closed: {
    opacity: [1, 1, 0, 0],
    x: ["0vw", "0vw", "0vw", "-100vw"],
    scale: ["100%", "94%", "98%", "85%"],
  },
};

export default function MobileRightInfoBar({
  className,
  children,
  ...props
}: Props) {
  const { isRightinfobarOpen, toggleRightinfobar } = useSidebarContext();

  return (
    <motion.aside
      animate={isRightinfobarOpen ? "open" : "closed"}
      variants={variants}
      transition={{ duration: 0.2 }}
      {...props}
      className="absolute right-0 top-0 z-[50] h-screen w-[240px] overflow-y-auto border-l border-border bg-background"
    >
      <div className="p-4">
        <Button variant="squared" size="sm" onClick={toggleRightinfobar}>
          <Xmark size={18} className="text-foreground" />
        </Button>
      </div>
      <div className={className}>{children}</div>
    </motion.aside>
  );
}
