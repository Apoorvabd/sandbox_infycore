import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import Button from "../Button";
import { cn } from "../../../utils/cn";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
    disabled = false,
    className = "",
}) => {
    // Generate page numbers to render (including ellipses)
    const paginationRange = useMemo(() => {
        const totalPageNumbers = siblingCount + 5; // siblingCount + 1 + 2 (boundaries) + 2 (ellipsis placeholders)

        // Case 1: If total pages is less than planned page numbers, display all
        if (totalPageNumbers >= totalPages) {
            return Array.from({ length: totalPages }, (_, idx) => idx + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        // Do not show dots when there is only one space between the boundary and siblings
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        // Case 2: No left dots, only right dots
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = Array.from({ length: leftItemCount }, (_, idx) => idx + 1);
            return [...leftRange, "DOTS", totalPages];
        }

        // Case 3: Only left dots, no right dots
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = Array.from(
                { length: rightItemCount },
                (_, idx) => totalPages - rightItemCount + idx + 1
            );
            return [firstPageIndex, "DOTS", ...rightRange];
        }

        // Case 4: Both left and right dots
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = Array.from(
                { length: rightSiblingIndex - leftSiblingIndex + 1 },
                (_, idx) => leftSiblingIndex + idx
            );
            return [firstPageIndex, "DOTS", ...middleRange, "DOTS", lastPageIndex];
        }
    }, [currentPage, totalPages, siblingCount]);

    if (totalPages <= 1) return null;

    return (
        <nav
            role="navigation"
            aria-label="Pagination"
            className={cn("flex flex-wrap items-center justify-between gap-4 p-4 border border-slate-800 bg-slate-900 rounded-lg", className)}
        >
            <div className="text-xs text-slate-400">
                Page <span className="font-semibold text-slate-205">{currentPage}</span> of{" "}
                <span className="font-semibold text-slate-205">{totalPages}</span>
            </div>

            <div className="flex items-center gap-1">
                {/* First Page */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1 || disabled}
                    aria-label="Go to first page"
                    className="h-8 w-8 p-0"
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* Previous Page */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1 || disabled}
                    aria-label="Go to previous page"
                    className="h-8 w-8 p-0"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Numbered buttons */}
                {paginationRange?.map((pageNumber, index) => {
                    if (pageNumber === "DOTS") {
                        return (
                            <span
                                key={`dots-${index}`}
                                className="h-8 w-8 inline-flex items-center justify-center text-slate-500 select-none text-xs"
                            >
                                &#8230;
                            </span>
                        );
                    }

                    const isCurrent = pageNumber === currentPage;

                    return (
                        <Button
                            key={pageNumber}
                            variant={isCurrent ? "primary" : "outline"}
                            size="sm"
                            onClick={() => onPageChange(pageNumber)}
                            disabled={disabled}
                            aria-current={isCurrent ? "page" : undefined}
                            className={cn(
                                "h-8 w-8 p-0 text-xs font-semibold",
                                !isCurrent && "border-slate-800 hover:border-slate-700/80 hover:bg-slate-800 text-slate-300"
                            )}
                        >
                            {pageNumber}
                        </Button>
                    );
                })}

                {/* Next Page */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || disabled}
                    aria-label="Go to next page"
                    className="h-8 w-8 p-0"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Last Page */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages || disabled}
                    aria-label="Go to last page"
                    className="h-8 w-8 p-0"
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </nav>
    );
};

export default Pagination;
