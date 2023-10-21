import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva("transition-all font-medium", {
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground rounded-md",
      outline: "bg-transparent text-foreground",
      circular:
        "rounded-sm hover:bg-muted rounded-full align-middle text-center",
      squared:
        "bg-muted text-muted-foreground rounded-md align-middle text-center",
    },
    size: {
      default: "px-3 py-[0.125rem]",
      sm: "p-2",
      lg: "h-10 py-2 px-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      ></button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
