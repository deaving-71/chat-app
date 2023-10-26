"use client";

import { cn } from "@/lib/utils";
import {
  createContext,
  useContext,
  forwardRef,
  useState,
  useEffect,
} from "react";
import { Variants, motion } from "framer-motion";

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
  dir?: "left" | "right";
  className: string;
};

const Root = ({
  children,
  open,
  toggleDrawer,
  width = 280,
  dir = "left",
  className = "",
}: RootProps) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const md = windowWidth > 0 && windowWidth < 768;

  const styles: React.CSSProperties = {
    width: `${width}px`,
  };

  const animation = {
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
          "fixed top-0 h-full min-h-screen overflow-hidden whitespace-nowrap bg-black text-gray-200 md:sticky",
          className,
          `${dir}-0`,
        )}
        style={styles}
        initial="initial"
        animate="animate"
        variants={animation}
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

Trigger.displayName = "Trigger";

const CollapsibleDrawer = { Root, Trigger };
export { CollapsibleDrawer };
