import React, { useState } from "react";
import { cn } from "../../../utils/cn";

const Tooltip = ({
    content,
    position = "top", // "top" | "bottom" | "left" | "right"
    children,
    delay = 100, // delay before showing in ms (visual aid/animation)
    className = "",
}) => {
    const [isVisible, setIsVisible] = useState(false);
    let timeout;

    const showTooltip = () => {
        timeout = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const hideTooltip = () => {
        clearInterval(timeout);
        setIsVisible(false);
    };

    const positions = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2.5",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2.5",
        left: "right-full top-1/2 -translate-y-1/2 mr-2.5",
        right: "left-full top-1/2 -translate-y-1/2 ml-2.5",
    };

    const arrows = {
        top: "top-full left-1/2 -translate-x-1/2 border-t-slate-800 border-x-transparent border-b-transparent",
        bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-slate-800 border-x-transparent border-t-transparent",
        left: "left-full top-1/2 -translate-y-1/2 border-l-slate-800 border-y-transparent border-r-transparent",
        right: "right-full top-1/2 -translate-y-1/2 border-r-slate-800 border-y-transparent border-l-transparent",
    };

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}

            {isVisible && content && (
                <div
                    role="tooltip"
                    className={cn(
                        "absolute z-50 px-2.5 py-1.5 text-xs font-medium text-slate-100 bg-slate-800 border border-slate-700/80 rounded-md whitespace-nowrap shadow-xl pointer-events-none transition-all duration-200",
                        positions[position],
                        className
                    )}
                >
                    {content}
                    {/* Tooltip Arrow */}
                    <div
                        className={cn(
                            "absolute border-[5px] h-0 w-0",
                            arrows[position]
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default Tooltip;
export { Tooltip };
