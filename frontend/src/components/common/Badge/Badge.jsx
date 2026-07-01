import React from "react";
import { cn } from "../../../utils/cn";

const Badge = React.forwardRef(
    (
        {
            children,
            variant = "primary",
            size = "md",
            dot = false,
            className = "",
            ...props
        },
        ref
    ) => {
        const baseStyles = "inline-flex items-center gap-1.5 rounded-full font-medium transition-colors select-none";

        const variants = {
            primary: "bg-orange-500/10 text-orange-500 border border-orange-500/20",
            secondary: "bg-slate-800 text-slate-300 border border-slate-700",
            outline: "border border-slate-700 text-slate-400 bg-transparent",
            success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
            warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
            danger: "bg-red-500/10 text-red-400 border border-red-500/20",
            accent: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
        };

        const sizes = {
            sm: "px-2 py-0.5 text-[10px]",
            md: "px-2.5 py-0.5 text-xs",
        };

        const dotColors = {
            primary: "bg-orange-400",
            secondary: "bg-slate-400",
            outline: "bg-slate-400",
            success: "bg-emerald-400",
            warning: "bg-amber-400",
            danger: "bg-red-400",
            accent: "bg-yellow-400",
        };

        return (
            <span
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {dot && (
                    <span className={cn("h-1.5 w-1.5 rounded-full animate-ping-once", dotColors[variant])} />
                )}
                {children}
            </span>
        );
    }
);

Badge.displayName = "Badge";

export default Badge;
