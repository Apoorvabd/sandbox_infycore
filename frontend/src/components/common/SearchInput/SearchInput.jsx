import React, { useRef, useImperativeHandle } from "react";
import { Search, X } from "lucide-react";
import { cn } from "../../../utils/cn";

const SearchInput = React.forwardRef(
    (
        {
            value,
            onChange,
            onClear,
            placeholder = "Search...",
            className = "",
            wrapperClassName = "",
            disabled = false,
            ...props
        },
        ref
    ) => {
        const inputRef = useRef(null);

        useImperativeHandle(ref, () => inputRef.current);

        const handleClear = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onClear) {
                onClear();
            } else if (onChange) {
                // If standard form control, dispatch a synthetic change event
                const event = {
                    target: { value: "" },
                    currentTarget: { value: "" },
                };
                onChange(event);
            }
            if (inputRef.current) {
                inputRef.current.value = "";
                inputRef.current.focus();
            }
        };

        const showClearButton = value && value.length > 0;

        return (
            <div className={cn("relative flex items-center w-full", wrapperClassName)}>
                <div className="absolute left-3 text-slate-500 pointer-events-none select-none flex items-center justify-center">
                    <Search className="h-4 w-4" />
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={cn(
                        "w-full h-10 bg-white text-slate-900 text-sm rounded-lg border border-sky-200 transition-all duration-200 focus:outline-none placeholder:text-slate-400",
                        "pl-10",
                        showClearButton ? "pr-10" : "pr-3.5",
                        disabled && "opacity-50 cursor-not-allowed bg-sky-50 border-sky-200",
                        "focus:border-sky-400 focus:ring-2 focus:ring-sky-200",
                        className
                    )}
                    {...props}
                />

                {showClearButton && !disabled && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 p-1 rounded-md text-slate-500 hover:text-slate-900 hover:bg-sky-50 transition-colors focus:outline-none focus:ring-1 focus:ring-sky-300 cursor-pointer"
                        aria-label="Clear search input"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>
        );
    }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
