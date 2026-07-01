import React from "react";
import { FolderOpen } from "lucide-react";
import { cn } from "../../../utils/cn";

const EmptyState = ({
    title = "No data found",
    description = "There are no records matching your query, or you haven't created any yet.",
    icon: Icon = FolderOpen,
    action,
    className = "",
    ...props
}) => {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-800 rounded-xl bg-slate-900/50 min-h-[300px]",
                className
            )}
            {...props}
        >
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-orange-500/10 text-orange-400 mb-4 border border-orange-500/20 ring-4 ring-orange-500/10">
                <Icon className="h-6 w-6" />
            </div>

            <h3 className="text-base font-semibold text-slate-100 mb-1.5 leading-6">
                {title}
            </h3>

            {description && (
                <p className="text-sm text-slate-400 max-w-md mb-6 leading-5">
                    {description}
                </p>
            )}

            {action && (
                <div className="flex justify-center transition-all duration-200 active:scale-95">
                    {action}
                </div>
            )}
        </div>
    );
};

export default EmptyState;
