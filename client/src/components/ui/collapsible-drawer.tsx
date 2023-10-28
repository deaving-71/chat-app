"use client";

import { cn } from "@/lib/utils";
import {
  createContext,
  useContext,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { Variants, motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";

type DrawerContext = {
  open: boolean;
  toggleDrawer?: () => void;
};

const DrawerContext = createContext<DrawerContext | null>(null);

const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context)
    throw `useDrawerContext cannot be called outside ot the DrawerContext Provider.`;

  return context;
};

type RootProps = DrawerContext & {
  children: React.ReactNode;
  width?: number;
  open: boolean;
  dir?: "left" | "right";
  className?: string;
};

const Root = ({
  children,
  open,
  toggleDrawer,
  width = 280,
  dir = "left",
  className,
}: RootProps) => {
  //TODO: use media match query >>> window.matchMedia("(max-width: 700px)")
  const [windowWidth, setWindowWidth] = useState(0);
  const md = windowWidth > 0 && windowWidth < 768;

  const styles: React.CSSProperties = {
    width: `${width}px`,
  };

  // -${dir}-${width} md:${dir}-0
  const mdAnimation = {
    initial: {
      x: "100vw",
    },
    animate: { x: open ? "100vw" : 0 },
  };

  const lgAnimation = {
    initial: {
      width: width,
    },
    animate: { width: open ? width : 0 },
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <DrawerContext.Provider value={{ open, toggleDrawer }}>
      <motion.div
        className={cn(
          "fixed top-0 h-full min-h-screen overflow-hidden md:sticky",
          className,
          `${dir}-0`,
        )}
        style={styles}
        initial="initial"
        animate="animate"
        variants={md ? mdAnimation : lgAnimation}
        transition={{
          type: "tween",
          duration: 0.2,
        }}
      >
        {children}
      </motion.div>
    </DrawerContext.Provider>
  );
};

type ButtonProps = React.HTMLProps<HTMLButtonElement> & { asChild?: boolean };

const Trigger = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, type = "button", className, asChild, ...props }, ref) => {
    const { toggleDrawer } = useDrawerContext();

    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        {...props}
        ref={ref}
        className={className}
        onClick={() => {
          if (toggleDrawer) toggleDrawer();
        }}
      >
        {children}
      </Comp>
    );
  },
);

Trigger.displayName = "Trigger";

const CollapsibleDrawer = { Root, Trigger };
export { CollapsibleDrawer };
