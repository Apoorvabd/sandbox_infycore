import React from "react";
import { cn } from "../../../utils/cn";

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight text-slate-100", className)}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-slate-400", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0 border-t border-slate-800/60 mt-6", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

const Card = React.forwardRef(({ className, hoverable = false, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl border border-slate-800 bg-slate-900 shadow-sm transition-all duration-300",
            hoverable && "hover:border-slate-700 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:bg-slate-900/90",
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

export default Card;
