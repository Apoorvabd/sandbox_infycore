import React, { useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../utils/cn";

const Select = React.forwardRef(
    (
        {
            label,
            options = [],
            error,
            helperText,
            placeholder = "Select an option",
            className = "",
            wrapperClassName = "",
            disabled = false,
            id: customId,
            required = false,
            children,
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const selectId = customId || generatedId;
        const hasError = !!error;

        return (
            <div className={cn("flex flex-col gap-1.5 w-full", wrapperClassName)}>
                {label && (
                    <label
                        htmlFor={selectId}
                        className="text-xs font-semibold text-slate-700 select-none cursor-pointer flex items-center gap-1"
                    >
                        {label}
                        {required && <span className="text-red-500" aria-hidden="true">*</span>}
                    </label>
                )}

                <div className="relative flex items-center w-full">
                    <select
                        id={selectId}
                        ref={ref}
                        disabled={disabled}
                        aria-invalid={hasError}
                        aria-describedby={
                            hasError
                                ? `${selectId}-error`
                                : helperText
                                ? `${selectId}-helper`
                                : undefined
                        }
                        className={cn(
                            "w-full h-10 bg-white text-slate-900 text-sm rounded-lg border appearance-none transition-all duration-200 focus:outline-none pr-10 pl-3.5 cursor-pointer",
                            disabled
                                ? "opacity-50 cursor-not-allowed bg-sky-50 border-sky-200"
                                : hasError
                                ? "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                : "border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200",
                            className
                        )}
                        required={required}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled className="bg-white text-slate-500">
                                {placeholder}
                            </option>
                        )}
                        {children
                            ? children
                            : options.map((opt) => (
                                  <option
                                      key={opt.value}
                                      value={opt.value}
                                      className="bg-white text-slate-900"
                                  >
                                      {opt.label}
                                  </option>
                              ))}
                    </select>

                    <div className="absolute right-3 text-slate-500 pointer-events-none select-none flex items-center justify-center">
                        <ChevronDown className="h-4 w-4" />
                    </div>
                </div>

                {hasError && (
                    <p id={`${selectId}-error`} className="text-xs text-red-400 mt-0.5 font-medium flex items-center gap-1">
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {error}
                    </p>
                )}

                {!hasError && helperText && (
                    <p id={`${selectId}-helper`} className="text-xs text-slate-500 mt-0.5">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = "Select";

export default Select;
