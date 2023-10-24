import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const inputVariants = cva("outline-none transition-all", {
  variants: {
    variant: {
      default: "placeholder:text-foreground-secondary bg-muted text-foreground",
      outline:
        "rounded-sm text-[0.9375rem] bg-background leading-[1] shadow-[0_0_0_1px_rgb(var(--primary))] focus:shadow-[0_0_0_2px_rgb(var(--primary))]",
      transparent:
        "placeholder:text-foreground-secondary bg-transparent text-foreground",
    },
    size: {
      default: "h-12 px-4",
      sm: "h-8 px-4 py-2",
      md: "px-[0.625rem] h-[2.1875rem]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

// @ts-ignore
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };
