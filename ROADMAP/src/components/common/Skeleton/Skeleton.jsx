import React from "react";
import { cn } from "../../../utils/cn";

const Skeleton = ({
    variant = "line",
    width,
    height,
    animation = "pulse",
    className = "",
    ...props
}) => {
    const baseClass = "bg-slate-800 rounded";

    const animations = {
        pulse: "animate-pulse",
        wave: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-slate-700/30 before:to-transparent",
        none: "",
    };

    const variants = {
        line: "h-4 w-full",
        circle: "rounded-full shrink-0",
        rectangle: "h-24 w-full",
    };

    const style = {};
    if (width) style.width = width;
    if (height) style.height = height;

    return (
        <div
            className={cn(
                baseClass,
                variants[variant],
                animations[animation],
                className
            )}
            style={style}
            {...props}
        />
    );
};

export default Skeleton;
