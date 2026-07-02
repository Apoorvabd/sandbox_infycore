import React from "react";
import { cn } from "../../../utils/cn";

const Table = React.forwardRef(({ className, ...props }, ref) => (
    <div className="w-full overflow-x-auto rounded-lg border border-sky-200 bg-white/90 shadow-sm shadow-sky-50">
        <table
            ref={ref}
            className={cn("w-full caption-bottom text-sm text-slate-700 border-collapse", className)}
            {...props}
        />
    </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("bg-sky-50 border-b border-sky-200 sticky top-0 z-10", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn("bg-sky-50 border-t border-sky-200 font-medium text-slate-900", className)}
        {...props}
    />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(({ className, striped = false, hoverable = true, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn(
            "border-b border-sky-200/80 transition-colors",
            hoverable && "hover:bg-sky-50",
            striped && "even:bg-sky-50/50 odd:bg-transparent",
            className
        )}
        {...props}
    />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            "h-12 px-4 text-left align-middle font-semibold text-slate-900 select-none",
            className
        )}
        {...props}
    />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn("p-4 align-middle text-slate-700 leading-normal", className)}
        {...props}
    />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={cn("mt-4 text-xs text-slate-500 italic", className)}
        {...props}
    />
));
TableCaption.displayName = "TableCaption";

export default Table;
export { TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption };
