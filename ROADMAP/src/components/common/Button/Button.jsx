import React from "react";
import { buttonVariants } from "./buttonVariants";
import { cn } from "../../../utils/cn";

const Button = React.forwardRef(
    (
        {
            children,
            variant = "primary",
            size = "md",
            loading = false,
            disabled = false,
            fullWidth = false,
            leftIcon,
            rightIcon,
            className = "",
            type = "button",
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                type={type}
                className={cn(buttonVariants({ variant, size, fullWidth }), className)}
                disabled={loading || disabled}
                aria-busy={loading ? "true" : undefined}
                {...props}
            >
                {loading ? (
                    <>
                        <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                            fill="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        <span>Loading...</span>
                    </>
                ) : (
                    <>
                        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
                        {children}
                        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
