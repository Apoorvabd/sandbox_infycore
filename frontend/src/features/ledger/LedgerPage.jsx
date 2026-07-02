import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, SlidersHorizontal, X } from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader/PageHeader";
import Card from "../../components/common/Card/Card";
import Badge from "../../components/common/Badge/Badge";
import Select from "../../components/common/Select/Select";

import { ledgerApi } from "./api/ledgerApi";
import {
    setLedgerLoading,
    setLedgerError,
    setTransactions,
    setLedgerSummary,
    updateFilters,
    resetFilters,
} from "../../store/slices/ledgerSlice";
import { extractApiData, parseListResponse } from "../../utils/apiData";

// ─── helpers ────────────────────────────────────────────────────────────────
const fmt = (amount) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount ?? 0);

const fmtDate = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const DIRECTION_OPTIONS = [
    { value: "", label: "All Directions" },
    { value: "debit", label: "Debit" },
    { value: "credit", label: "Credit" },
];

const SORT_OPTIONS = [
    { value: "cleared_date", label: "Date" },
    { value: "amount", label: "Amount" },
    { value: "normalized_merchant", label: "Merchant" },
];

const PAGE_SIZE_OPTIONS = [
    { value: "10", label: "10 / page" },
    { value: "20", label: "20 / page" },
    { value: "50", label: "50 / page" },
];

// ─── LedgerPage ──────────────────────────────────────────────────────────────
export default function LedgerPage() {
    const dispatch = useDispatch();
    const { transactions, totalCount, summary, isLoading, filters } = useSelector(
        (state) => state.ledger
    );

    const [searchDraft, setSearchDraft] = useState(filters.search);

    const totalPages = Math.max(1, Math.ceil(totalCount / filters.limit));

    // ── fetch ────────────────────────────────────────────────────────────────
    const fetchLedger = useCallback(async () => {
        dispatch(setLedgerLoading(true));
        try {
            const [txRes, summaryRes] = await Promise.all([
                ledgerApi.getTransactions(filters),
                ledgerApi.getSummary(),
            ]);

            const txData = parseListResponse(txRes);
            const sumData = extractApiData(summaryRes) ?? {};

            dispatch(
                setTransactions({
                    data: txData.items,
                    totalCount: txData.total,
                })
            );
            dispatch(setLedgerSummary(sumData));
        } catch (err) {
            dispatch(setLedgerError("Failed to load ledger data."));
            toast.error(err.message || "Failed to load ledger");
        }
    }, [dispatch, filters]);

    useEffect(() => {
        fetchLedger();
    }, [fetchLedger]);

    // ── search debounce ──────────────────────────────────────────────────────
    useEffect(() => {
        const t = setTimeout(() => {
            if (searchDraft !== filters.search) {
                dispatch(updateFilters({ search: searchDraft }));
            }
        }, 400);
        return () => clearTimeout(t);
    }, [searchDraft, dispatch, filters.search]);

    const handleReset = () => {
        setSearchDraft("");
        dispatch(resetFilters());
    };

    const hasActiveFilters =
        filters.search || filters.category || filters.merchant || filters.direction;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Ledger"
                description="Find Your Full Transaction details Here ."
                actions={
                    hasActiveFilters && (
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-1.5 text-xs text-yellow-400 hover:text-red-400 border border-slate-700 hover:border-red-500/40 px-3 py-1.5 rounded-lg transition-all"
                        >
                            <X className="w-3.5 h-3.5" />
                            Reset Filters
                        </button>
                    )
                }
            />
            {/* ── Summary Strip ── */}
            {summary && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                        { label: "Total Transactions", value: summary.total_transactions?.toLocaleString() ?? "—" },
                       
                        { label: "Total Credits", value: (summary.total_credits) },
                        { label: "Total Debits", value: (summary.total_debits) },
                         { label: "Total Transaction Amount", value: fmt((summary.total_amount)) },
                        { label: "Total Credit Amount", value: fmt((summary.total_credit_amount)) },
                        { label: "Total Debit Amount", value: fmt(summary.total_debit_amount) },
                        
                    ].map(({ label, value }) => (
                        <Card key={label} className="p-4">
                            <p className="text-lg font-semibold text-slate-900 uppercase tracking-wider">{label}</p>
                            <p className="text-lg font-bold text-yellow-600 mt-1">{value}</p>
                        </Card>
                    ))}
                </div>
            )}

            {/* ── Filters ── */}
            <Card className="p-4">
                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[180px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search merchant or category…"
                            value={searchDraft}
                            onChange={(e) => setSearchDraft(e.target.value)}
                            className="w-full h-10 pl-9 pr-3.5 bg-yelow-100 text-slate-500 text-sm rounded-lg border border-slate-700/80 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none placeholder:text-slate-500 transition-all"
                        />
                    </div>

                    <Select
                        options={DIRECTION_OPTIONS}
                        value={filters.direction}
                        onChange={(e) => dispatch(updateFilters({ direction: e.target.value }))}
                        wrapperClassName="w-40"
                    />

                    <Select
                        label=""
                        options={SORT_OPTIONS}
                        value={filters.sort}
                        onChange={(e) => dispatch(updateFilters({ sort: e.target.value }))}
                        wrapperClassName="w-40"
                    />

                    <Select
                        label=""
                        options={[
                            { value: "DESC", label: "Newest First" },
                            { value: "ASC", label: "Oldest First" },
                        ]}
                        value={filters.order}
                        onChange={(e) => dispatch(updateFilters({ order: e.target.value }))}
                        wrapperClassName="w-40"
                    />

                    <Select
                        label=""
                        options={PAGE_SIZE_OPTIONS}
                        value={String(filters.limit)}
                        onChange={(e) => dispatch(updateFilters({ limit: Number(e.target.value) }))}
                        wrapperClassName="w-36"
                    />
                </div>
            </Card>

            {/* ── Table ── */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto bg-slate-900">
                    <table className="w-full text-sm text-left">
                        <thead className="text-lg text-slate-200 uppercase bg-slate-900/70 border-b border-slate-800">
                            <tr>
                                <th className="px-5 py-4 font-semibold">Date   </th>
                                <th className="px-5 py-4 font-semibold">Merchant</th>
                                <th className="px-5 py-4 font-semibold">Category</th>
                                <th className="px-5 py-4 font-semibold">Direction</th>
                                <th className="px-5 py-4 font-semibold text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                Array.from({ length: filters.limit }).map((_, i) => (
                                    <tr key={i} className="border-b border-slate-800/50">
                                        {Array.from({ length: 5 }).map((__, j) => (
                                            <td key={j} className="px-5 py-4">
                                                <div className="h-4 bg-slate-800 rounded animate-pulse w-3/4" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center text-slate-500">
                                        <SlidersHorizontal className="w-8 h-8 mx-auto mb-3 opacity-40" />
                                        No transactions match your filters.
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((tx, idx) => (
                                    <tr
                                        key={tx.id ?? idx}
                                        className="border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors group"
                                    >
                                        <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap">
                                            {fmtDate(tx.cleared_date)}
                                        </td>
                                        <td className="px-5 py-3.5 font-medium text-slate-200 whitespace-nowrap max-w-[220px] truncate">
                                            {tx.normalized_merchant || tx.raw_merchant || "—"}
                                        </td>
                                        <td className="px-5 py-3.5 whitespace-nowrap">
                                            <span className="flex items-center gap-2">
                                                <span
                                                    className={`w-2 h-2 rounded-full shrink-0 ${
                                                        tx.category === "Uncategorized"
                                                            ? "bg-amber-400"
                                                            : "bg-orange-400"
                                                    }`}
                                                />
                                                <span className="text-slate-300">{tx.category || "Uncategorized"}</span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 whitespace-nowrap">
                                            <Badge
                                                variant={
                                                    tx.direction?.toLowerCase() === "credit" ? "success" : "secondary"
                                                }
                                                size="sm"
                                            >
                                                {tx.direction?.toUpperCase() ?? "—"}
                                            </Badge>
                                        </td>
                                        <td className="px-5 py-3.5 text-right font-semibold whitespace-nowrap">
                                            <span
                                                className={
                                                    tx.direction?.toLowerCase() === "credit"
                                                        ? "text-emerald-400"
                                                        : "text-slate-200"
                                                }
                                            >
                                                {tx.direction?.toLowerCase() === "credit" ? "+" : ""}
                                                {fmt(tx.amount)}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ── Pagination ── */}
                {!isLoading && totalPages > 1 && (
                    <div className="flex items-center justify-between px-5 py-4 border-t border-slate-800 text-sm text-slate-400">
                        <span>
                            Page {filters.page} of {totalPages} · {totalCount.toLocaleString()} results
                        </span>
                        <div className="flex gap-2">
                            <button
                                disabled={filters.page <= 1}
                                onClick={() => dispatch(updateFilters({ page: filters.page - 1 }))}
                                className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                Previous
                            </button>
                            <button
                                disabled={filters.page >= totalPages}
                                onClick={() => dispatch(updateFilters({ page: filters.page + 1 }))}
                                className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
