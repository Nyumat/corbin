import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "w-full flex flex-row gap-3 items-center hover:bg-gray-3 transition-colors border border-gray-2 px-3 py-2 rounded-lg disabled:opacity-5 disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const AddCardPlusButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex items-center justify-center w-full h-full rounded-md bg-gray-3 hover:bg-gray-2 scale-125 transition-colors",
      className
    )}
    {...props}
  >
    <Plus />
  </button>
));
AddCardPlusButton.displayName = "AddCardPlusButton";

export { AddCardPlusButton as AddCardButton, Button };
