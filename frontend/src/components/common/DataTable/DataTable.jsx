import React from "react";
import Table, {
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "../Table";
import Skeleton from "../Skeleton";
import EmptyState from "../EmptyState";
import Pagination from "../Pagination";
import { cn } from "../../../utils/cn";

const DataTable = ({
    columns = [],
    data = [],
    isLoading = false,
    striped = false,
    emptyTitle = "No results found",
    emptyDescription = "There is no data to display right now.",
    // Pagination props
    pagination, // { currentPage, totalPages, onPageChange }
    className = "",
}) => {
    return (
        <div className={cn("flex flex-col gap-4 w-full", className)}>
            <Table>
                <TableHeader>
                    <TableRow hoverable={false}>
                        {columns.map((column, idx) => (
                            <TableHead
                                key={column.id || column.accessorKey || idx}
                                className={cn(
                                    column.className,
                                    "text-slate-200 bg-slate-900 border-b border-slate-800"
                                )}
                            >
                                {column.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                        // Loader Skeletons rows
                        Array.from({ length: 5 }).map((_, rowIndex) => (
                            <TableRow key={`skeleton-row-${rowIndex}`} hoverable={false} striped={striped}>
                                {columns.map((col, colIndex) => (
                                    <TableCell key={`skeleton-cell-${colIndex}`}>
                                        <Skeleton variant="line" width="70%" height="1.1rem" className="my-0.5" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : data.length === 0 ? (
                        // Empty State row covering full columns span
                        <TableRow hoverable={false}>
                            <TableCell colSpan={columns.length} className="p-0">
                                <EmptyState
                                    title={emptyTitle}
                                    description={emptyDescription}
                                    className="border-none rounded-none bg-transparent py-12"
                                />
                            </TableCell>
                        </TableRow>
                    ) : (
                        // Actual Table rows rendering
                        data.map((row, rowIndex) => (
                            <TableRow key={row.id || rowIndex} striped={striped}>
                                {columns.map((column, colIndex) => {
                                    const value = column.accessorKey
                                        ? row[column.accessorKey]
                                        : undefined;

                                    return (
                                        <TableCell
                                            key={column.id || column.accessorKey || colIndex}
                                            className={column.cellClassName}
                                        >
                                            {column.render
                                                ? column.render({ row, value, index: rowIndex })
                                                : value ?? "—"}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            {!isLoading && pagination && pagination.totalPages > 1 && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={pagination.onPageChange}
                    disabled={isLoading}
                />
            )}
        </div>
    );
};

export default DataTable;
export { DataTable };
