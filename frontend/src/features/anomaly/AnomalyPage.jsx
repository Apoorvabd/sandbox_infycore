import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScanSearch, AlertTriangle, Copy, ShieldAlert, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader/PageHeader";
import Card from "../../components/common/Card/Card";
import Badge from "../../components/common/Badge/Badge";
import Spinner from "../../components/common/Spinner/Spinner";

import { anomalyApi } from "./api/anomalyApi";
import {
    setAnomalyLoading,
    setAnomalyError,
    setAuditFeed,
    setAnomalyStats,
} from "../../store/slices/anomalySlice";
import { extractApiData, toArray } from "../../utils/apiData";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmtDate = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};
const fmt = (v) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v ?? 0);

const REASON_META = {
    "Unknown Merchant":       { variant: "warning",  icon: AlertTriangle },
    "Duplicate Transaction":  { variant: "danger",   icon: Copy },
    default:                  { variant: "secondary", icon: ShieldAlert },
};

function getReasonMeta(reason) {
    return REASON_META[reason] ?? REASON_META.default;
}

// ─── AnomalyPage ──────────────────────────────────────────────────────────────
export default function AnomalyPage() {
    const dispatch = useDispatch();
    const { auditFeed, stats, isLoading } = useSelector((state) => state.anomaly);
    const [running, setRunning] = useState(false);
    const [expandedId, setExpandedId] = useState(null);

    // ── fetch ─────────────────────────────────────────────────────────────────
    const fetchData = useCallback(async () => {
        dispatch(setAnomalyLoading(true));
        try {
            const [feedRes, statsRes] = await Promise.all([
                anomalyApi.getAuditFeed(),
                anomalyApi.getStats(),
            ]);
            dispatch(setAuditFeed(toArray(extractApiData(feedRes))));
            dispatch(setAnomalyStats(extractApiData(statsRes) ?? {}));
        } catch (err) {
            dispatch(setAnomalyError("Failed to load anomaly data."));
            toast.error(err.message || "Failed to load anomaly data");
        }
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // ── run detection ─────────────────────────────────────────────────────────
    const handleRunDetection = async () => {
        setRunning(true);
        try {
            const res = await anomalyApi.runDetection();
            const detected = extractApiData(res)?.detected ?? "?";
            toast.success(`Anomaly detection complete — ${detected} anomalies detected`);
            await fetchData(); // refresh feed + stats
        } catch (err) {
            toast.error(err.message || "Detection run failed");
        } finally {
            setRunning(false);
        }
    };

    const breakdown = Array.isArray(stats?.breakdown) ? stats.breakdown : [];
    const total = Number(stats?.total ?? auditFeed.length) || 0;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Anomaly Detection"
                description="Audit feed of suspicious transactions detected by the intelligence engine."
                actions={
                    <button
                        onClick={handleRunDetection}
                        disabled={running}
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition-all disabled:opacity-50 shadow-lg shadow-red-500/20"
                    >
                        {running ? <Spinner size="sm" /> : <ScanSearch className="w-4 h-4" />}
                        Run Detection
                    </button>
                }
            />

            {/* ── Stats Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-4">
                    <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Total Anomalies</p>
                    <p className="text-3xl font-bold text-red-400 mt-1">{total}</p>
                </Card>
                {breakdown.slice(0, 2).map((b) => {
                    const meta = getReasonMeta(b.reason);
                    const Icon = meta.icon;
                    return (
                        <Card key={b.reason} className="p-4 flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                                <Icon className="w-5 h-5 text-slate-900" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">{b.reason}</p>
                                <p className="text-2xl font-bold text-slate-900 mt-0.5">{b.count}</p>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* ── Audit Feed ── */}
            <Card className="overflow-hidden">
                <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-red-400" />
                        <h2 className="font-semibold text-slate-900">Audit Feed</h2>
                        {auditFeed.length > 0 && (
                            <Badge variant="danger" dot>{auditFeed.length}</Badge>
                        )}
                    </div>
                    <button
                        onClick={fetchData}
                        disabled={isLoading}
                        className="flex items-center gap-1.5 text-xs text-slate-900 hover:text-slate-900 border border-slate-700 hover:border-slate-600 px-2.5 py-1.5 rounded-lg transition-all"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                        Refresh
                    </button>
                </div>

                <div className="divide-y divide-slate-800/60">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="px-5 py-4 flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-lg bg-slate-800 animate-pulse shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3.5 bg-slate-800 rounded animate-pulse w-1/3" />
                                    <div className="h-3 bg-slate-800 rounded animate-pulse w-1/2" />
                                </div>
                            </div>
                        ))
                    ) : auditFeed.length === 0 ? (
                        <div className="py-16 text-center text-slate-900">
                            <ScanSearch className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p>No anomalies detected. Run the detection engine to scan transactions.</p>
                        </div>
                    ) : (
                        auditFeed.map((item, idx) => {
                            const meta = getReasonMeta(item.anomaly_reason);
                            const Icon = meta.icon;
                            const isExpanded = expandedId === (item.id ?? idx);
                            return (
                                <div key={item.id ?? idx} className="group">
                                    <button
                                        className="w-full px-5 py-4 flex items-start gap-4 hover:bg-slate-800/30 transition-colors text-left"
                                        onClick={() => setExpandedId(isExpanded ? null : (item.id ?? idx))}
                                    >
                                        <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 shrink-0 mt-0.5">
                                            <Icon className="w-4 h-4 text-slate-900" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <span className="font-semibold text-slate-900 text-sm">
                                                    {item.normalized_merchant || item.raw_merchant || "Unknown Merchant"}
                                                </span>
                                                <Badge variant={meta.variant} size="sm">
                                                    {item.anomaly_reason}
                                                </Badge>
                                                <span
                                                    className={`ml-auto text-sm font-semibold ${
                                                        item.direction?.toLowerCase() === "credit"
                                                            ? "text-emerald-400"
                                                            : "text-slate-900"
                                                    }`}
                                                >
                                                    {fmt(item.amount)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-900 mt-1">
                                                {fmtDate(item.cleared_date)} · {item.category || "Uncategorized"}
                                            </p>
                                        </div>
                                        <div className="shrink-0 text-slate-900">
                                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </div>
                                    </button>

                                    {/* Expanded row detail */}
                                    {isExpanded && (
                                        <div className="px-5 pb-4 ml-12 bg-slate-950/30">
                                            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-xs text-slate-900 space-y-1.5">
                                                <DetailRow label="Raw Merchant" value={item.raw_merchant || "—"} />
                                                <DetailRow label="Normalized" value={item.normalized_merchant || "—"} />
                                                <DetailRow label="Category" value={item.category || "—"} />
                                                <DetailRow label="Direction" value={item.direction?.toUpperCase() || "—"} />
                                                <DetailRow label="Amount" value={fmt(item.amount)} />
                                                <DetailRow label="Date" value={fmtDate(item.cleared_date)} />
                                                <DetailRow label="Reason" value={item.anomaly_reason || "—"} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </Card>
        </div>
    );
}

function DetailRow({ label, value }) {
    return (
        <div className="flex justify-between gap-4">
            <span className="text-slate-900">{label}</span>
            <span className="text-slate-200 font-medium text-right">{value}</span>
        </div>
    );
}
