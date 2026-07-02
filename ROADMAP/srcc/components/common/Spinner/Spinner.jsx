import React from "react";
import { cn } from "../../../utils/cn";

const Spinner = ({
    size = "md",
    variant = "primary",
    className = "",
    ...props
}) => {
    const sizes = {
        sm: "h-4 w-4 border-2",
        md: "h-8 w-8 border-2.5",
        lg: "h-12 w-12 border-3",
        xl: "h-16 w-16 border-4",
    };

    const colorClasses = {
        primary: "border-blue-500/20 border-t-blue-500",
        accent: "border-sky-500/20 border-t-sky-400",
        success: "border-emerald-500/20 border-t-emerald-500",
        warning: "border-amber-500/20 border-t-amber-500",
        danger: "border-red-500/20 border-t-red-500",
        white: "border-slate-100/20 border-t-slate-100",
    };

    return (
        <div
            role="status"
            aria-label="loading"
            className={cn(
                "animate-spin rounded-full",
                sizes[size],
                colorClasses[variant],
                className
            )}
            {...props}
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Spinner;
