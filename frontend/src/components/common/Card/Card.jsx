import React from "react";
import { cn } from "../../../utils/cn";

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight text-slate-900", className)}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-slate-900", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0 border-t border-sky-600 mt-6", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

const Card = React.forwardRef(({ className, hoverable = false, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl border border-sky-200 bg-white/85 shadow-sm shadow-sky-100 transition-all duration-300 backdrop-blur-sm",
            hoverable && "hover:border-sky-300 hover:shadow-[0_10px_30px_rgba(125,211,252,0.18)] hover:bg-white",
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

export default Card;
