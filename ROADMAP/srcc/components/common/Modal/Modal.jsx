import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../../utils/cn";

const Modal = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = "md",
    className = "",
    closeOnOverlayClick = true,
}) => {
    // Escape key handler
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

    const sizes = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-full m-4 h-[calc(100vh-2rem)]",
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget && closeOnOverlayClick) {
            onClose();
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 focus:outline-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
                onClick={handleOverlayClick}
            />

            {/* Modal Body */}
            <div
                className={cn(
                    "relative w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transition-all transform scale-100 duration-300 z-10",
                    sizes[size],
                    className
                )}
            >
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-slate-800/80">
                    <div className="flex flex-col gap-0.5">
                        {title && (
                            <h2 id="modal-title" className="text-lg font-semibold text-slate-100 leading-6">
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
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-205 hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-700 cursor-pointer"
                        aria-label="Close modal"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 text-sm text-slate-350">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
