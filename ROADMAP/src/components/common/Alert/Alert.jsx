import React from "react";
import { CheckCircle, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "../../../utils/cn";

const Alert = React.forwardRef(
    (
        {
            variant = "info", // "info" | "success" | "warning" | "danger"
            title,
            children,
            onDismiss,
            icon,
            className = "",
            ...props
        },
        ref
    ) => {
        const baseStyle = "flex items-start gap-3.5 p-4 rounded-xl border text-sm transition-all duration-200";

        const variants = {
            info: "bg-blue-500/10 border-blue-500/20 text-blue-300",
            success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
            warning: "bg-amber-500/10 border-amber-500/20 text-amber-300",
            danger: "bg-red-500/10 border-red-500/20 text-red-300",
        };

        const defaultIcons = {
            info: Info,
            success: CheckCircle,
            warning: AlertTriangle,
            danger: AlertCircle,
        };

        const IconComponent = icon || defaultIcons[variant];

        return (
            <div
                ref={ref}
                role="alert"
                className={cn(baseStyle, variants[variant], className)}
                {...props}
            >
                {IconComponent && (
                    <div className="shrink-0 mt-0.5 select-none">
                        <IconComponent className="h-5 w-5" />
                    </div>
                )}

                <div className="flex-1 flex flex-col gap-1">
                    {title && (
                        <h4 className="font-semibold text-slate-105 leading-tight">
                            {title}
                        </h4>
                    )}
                    {children && (
                        <div className="text-xs text-slate-350 leading-relaxed font-normal">
                            {children}
                        </div>
                    )}
                </div>

                {onDismiss && (
                    <button
                        type="button"
                        onClick={onDismiss}
                        className={cn(
                            "shrink-0 -mt-1 -mr-1 p-1 rounded-lg transition-colors focus:outline-none focus:ring-2 cursor-pointer",
                            variant === "info" && "text-blue-450 hover:bg-blue-500/20 focus:ring-blue-500/30",
                            variant === "success" && "text-emerald-450 hover:bg-emerald-500/20 focus:ring-emerald-500/30",
                            variant === "warning" && "text-amber-450 hover:bg-amber-500/20 focus:ring-amber-500/30",
                            variant === "danger" && "text-red-450 hover:bg-red-500/20 focus:ring-red-500/30"
                        )}
                        aria-label="Dismiss alert"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        );
    }
);

Alert.displayName = "Alert";

export default Alert;
