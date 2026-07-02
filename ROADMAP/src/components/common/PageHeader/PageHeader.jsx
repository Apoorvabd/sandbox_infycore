import React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "../../../utils/cn";

const PageHeader = React.forwardRef(
    (
        {
            title,
            description,
            actions,
            onBackClick,
            className = "",
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-800 mb-8",
                    className
                )}
                {...props}
            >
                <div className="flex items-start gap-4">
                    {onBackClick && (
                        <button
                            type="button"
                            onClick={onBackClick}
                            className="p-2 -ml-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent hover:border-slate-700/50 transition-all focus:outline-none focus:ring-2 focus:ring-slate-750 cursor-pointer shrink-0"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                    )}

                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2.5">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-sm font-normal text-slate-400 max-w-2xl leading-5">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {actions && (
                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                        {actions}
                    </div>
                )}
            </div>
        );
    }
);

PageHeader.displayName = "PageHeader";

export default PageHeader;
