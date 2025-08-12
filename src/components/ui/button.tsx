import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-extrabold tracking-wide uppercase rounded-none " +
    "border-4 border-black shadow-[5px_5px_0px_black] transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none " +
    "disabled:opacity-60 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-yellow-300 text-black",
        pink: "bg-pink-300 text-black",
        green: "bg-green-300 text-black",
        red: "bg-red-300 text-black",
        blue: "bg-sky-300 text-black",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
