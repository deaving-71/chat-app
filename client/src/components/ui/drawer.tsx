"use client";

import { cn } from "@/lib/utils";
import {
  createContext,
  useContext,
  useState,
  forwardRef,
  useEffect,
} from "react";
import { motion, Variants } from "framer-motion";

type DrawerContext = {
  open: boolean;
  toggleDrawer: () => void;
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
};

const Root = ({ children, width = 280, open, toggleDrawer }: RootProps) => {
  const styles: React.CSSProperties = {
    width: `${width}px`,
  };
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const md = windowWidth > 0 && windowWidth < 768;

  const mdAnimation = {
    initial: {
      x: 0,
    },
    animate: { x: open ? -width : 0 },
  };

  const lgAnimation = {
    initial: {
      width: width,
    },
    animate: { width: open ? width : 80 },
  };

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== undefined) {
      window.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
    }
  }, [mounted]);

  return (
    <DrawerContext.Provider value={{ open, toggleDrawer }}>
      <motion.div
        className={cn(
          "sticky left-0 top-0 h-full min-h-screen bg-black text-gray-200",
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

type ButtonProps = React.HTMLProps<HTMLButtonElement>;

const Trigger = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, type = "button", className, ...props }, ref) => {
    const { toggleDrawer } = useDrawerContext();
    return (
      <button
        {...props}
        ref={ref}
        className={cn(
          "rounded-md bg-blue-500 p-2 text-sm hover:bg-blue-700",
          className,
        )}
        onClick={toggleDrawer}
      >
        {children}
        Trigger
      </button>
    );
  },
);

type ContentProps = {
  children: React.ReactNode;
};

const Content = ({ children }: ContentProps) => {
  return <div className="grid h-full place-content-center">{children}</div>;
};

Trigger.displayName = "Trigger";

const Drawer = { Root, Trigger, Content };
export { Drawer };
