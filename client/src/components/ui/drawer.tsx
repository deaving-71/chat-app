"use client";

import { cn } from "@/lib/utils";
import { createContext, useContext, useState, forwardRef } from "react";
import { motion } from "framer-motion";

// ! sheesh
// ? sheesh
// * sheesh
// TODO: sheesh
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

  return (
    <DrawerContext.Provider value={{ open, toggleDrawer }}>
      <motion.div
        className={cn("h-full min-h-screen bg-black text-gray-200")}
        style={styles}
        initial={{ x: 0 }}
        animate={{ x: open ? -width : 0 }}
        transition={{
          type: "easeInOut",
          duration: 0.2,
        }}
      >
        {children}
      </motion.div>
      ;
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
  return <>{children}</>;
};

Trigger.displayName = "Trigger";

const Drawer = { Root, Trigger, Content };
export { Drawer };
