import React from "react";
import { cn } from "../../../utils/cn";

const Table = React.forwardRef(({ className, ...props }, ref) => (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/50">
        <table
            ref={ref}
            className={cn("w-full caption-bottom text-sm text-slate-300 border-collapse", className)}
            {...props}
        />
    </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("bg-slate-900 border-b border-slate-800 sticky top-0 z-10", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn("bg-slate-900/80 border-t border-slate-800 font-medium text-slate-100", className)}
        {...props}
    />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(({ className, striped = false, hoverable = true, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn(
            "border-b border-slate-800/60 transition-colors",
            hoverable && "hover:bg-slate-800/40",
            striped && "even:bg-slate-950/20 odd:bg-transparent",
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
            "h-12 px-4 text-left align-middle font-semibold text-slate-100 select-none",
            className
        )}
        {...props}
    />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn("p-4 align-middle text-slate-300 leading-normal", className)}
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
