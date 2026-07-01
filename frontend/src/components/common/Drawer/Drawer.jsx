import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../../utils/cn";

const Drawer = ({
    isOpen,
    onClose,
    position = "right", // "right" | "left" | "top" | "bottom"
    size = "md", // "sm" | "md" | "lg" | "xl" | "full"
    title,
    description,
    children,
    closeOnOverlayClick = true,
    className = "",
}) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Size definitions based on positioning
    const placementStyles = {
        right: "right-0 inset-y-0 h-full border-l border-slate-800 animate-slide-in-right",
        left: "left-0 inset-y-0 h-full border-r border-slate-800 animate-slide-in-left",
        top: "top-0 inset-x-0 w-full border-b border-slate-800 animate-slide-in-top",
        bottom: "bottom-0 inset-x-0 w-full border-t border-slate-800 animate-slide-in-bottom",
    };

    const sizeStyles = {
        horizontal: {
            sm: "w-full max-w-xs",
            md: "w-full max-w-md",
            lg: "w-full max-w-lg",
            xl: "w-full max-w-2xl",
            full: "w-full max-w-full",
        },
        vertical: {
            sm: "h-1/4",
            md: "h-1/3",
            lg: "h-1/2",
            xl: "h-2/3",
            full: "h-full",
        },
    };

    const isHorizontal = position === "left" || position === "right";
    const selectedSize = isHorizontal
        ? sizeStyles.horizontal[size]
        : sizeStyles.vertical[size];

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget && closeOnOverlayClick) {
            onClose();
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex focus:outline-none"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-950/70 backdrop-blur-[3px] transition-opacity duration-300"
                onClick={handleOverlayClick}
            />

            {/* Sliding Panel */}
            <div
                className={cn(
                    "fixed bg-slate-900 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-10",
                    placementStyles[position],
                    selectedSize,
                    className
                )}
            >
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-slate-800/80 shrink-0">
                    <div className="flex flex-col gap-0.5">
                        {title && (
                            <h2 className="text-lg font-semibold text-slate-100 leading-6">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-xs text-slate-400">
                                {description}
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/30 cursor-pointer"
                        aria-label="Close drawer"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 text-sm text-slate-300">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Drawer;
