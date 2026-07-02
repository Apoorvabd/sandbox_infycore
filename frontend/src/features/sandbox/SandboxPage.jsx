import { useState } from "react";
import { Play, Download, RefreshCw, Terminal, CheckCircle, XCircle, Clock, Info } from "lucide-react";
import toast from "react-hot-toast";
import { ingestionApi } from "./api/ingestionApi";
import { rulesApi } from "../rules/api/rulesApi";
import { anomalyApi } from "../anomaly/api/anomalyApi";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import Card from "../../components/common/Card/Card";
import Badge from "../../components/common/Badge/Badge";
import Spinner from "../../components/common/Spinner/Spinner";
import Input from "../../components/common/Input/Input";
import { extractApiData } from "../../utils/apiData";

// ─── Helper ──────────────────────────────────────────────────────────────────
function ts() {
    return new Date().toLocaleTimeString("en-US", { hour12: false });
}

function LogEntry({ entry }) {
    const icons = {
        info:    <Info className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />,
        success: <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />,
        error:   <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />,
        running: <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5 animate-spin" />,
    };
    const colors = {
        info:    "text-blue-900",
        success: "text-emerald-300",
        error:   "text-red-300",
        running: "text-amber-300",
    };
    return (
        <div className="flex gap-2 font-mono text-xs">
            <span className="text-slate-500 shrink-0">[{entry.time}]</span>
            {icons[entry.type]}
            <span className={colors[entry.type]}>{entry.message}</span>
        </div>
    );
}

// ─── SandboxPage ──────────────────────────────────────────────────────────────
export default function SandboxPage() {
    const [logs, setLogs] = useState([]);
    const [syncRunning, setSyncRunning] = useState(false);
    const [reprocessRunning, setReprocessRunning] = useState(false);
    const [detectRunning, setDetectRunning] = useState(false);

    // Test rule state
    const [testMerchant, setTestMerchant] = useState("");
    const [testResult, setTestResult] = useState(null);
    const [testRunning, setTestRunning] = useState(false);

    const addLog = (message, type = "info") =>
        setLogs((prev) => [...prev, { time: ts(), message, type }]);

    const clearLogs = () => setLogs([]);

    // ── Step 1 · Sync ─────────────────────────────────────────────────────────
    const handleSync = async () => {
        setSyncRunning(true);
        addLog("Starting transaction sync from mock bank API…", "running");
        try {
            const res = await ingestionApi.sync();
            const data = extractApiData(res) ?? {};
            addLog(
                `Sync complete — ${data.synced ?? data.total ?? "?"} transactions ingested.`,
                "success"
            );
            toast.success("Sync complete");
        } catch (err) {
            addLog(`Sync failed: ${err.message || "Unknown error"}`, "error");
            toast.error(err.message || "Sync failed");
        } finally {
            setSyncRunning(false);
        }
    };

    // ── Step 2 · Reprocess ────────────────────────────────────────────────────
    const handleReprocess = async () => {
        setReprocessRunning(true);
        addLog("Running ETL normalization with current rules…", "running");
        try {
            const res = await rulesApi.reprocess();
            const data = extractApiData(res) ?? {};
            addLog(
                `Reprocess complete — ${data.updated ?? "all"} transactions normalized.`,
                "success"
            );
            toast.success("Reprocess complete");
        } catch (err) {
            addLog(`Reprocess failed: ${err.message || "Unknown error"}`, "error");
            toast.error(err.message || "Reprocess failed");
        } finally {
            setReprocessRunning(false);
        }
    };

    // ── Step 3 · Detect Anomalies ─────────────────────────────────────────────
    const handleDetect = async () => {
        setDetectRunning(true);
        addLog("Scanning transactions for anomalies…", "running");
        try {
            const res = await anomalyApi.runDetection();
            const data = extractApiData(res) ?? {};
            addLog(
                `Anomaly detection complete — ${data.detected ?? "?"} anomalies found.`,
                "success"
            );
            toast.success("Detection complete");
        } catch (err) {
            addLog(`Detection failed: ${err.message || "Unknown error"}`, "error");
            toast.error(err.message || "Detection failed");
        } finally {
            setDetectRunning(false);
        }
    };

    // ── Full Pipeline ──────────────────────────────────────────────────────────
    const handleFullPipeline = async () => {
        addLog("━━━ Running full pipeline: Sync → Normalize → Detect ━━━", "info");
        await handleSync();
        await handleReprocess();
        await handleDetect();
        addLog("━━━ Full pipeline complete ━━━", "success");
        toast.success("Full pipeline complete!");
    };

    // ── Test Rule ──────────────────────────────────────────────────────────────
    const handleTestRule = async () => {
        if (!testMerchant.trim()) return;
        setTestRunning(true);
        setTestResult(null);
        addLog(`Testing merchant normalization for: "${testMerchant}"`, "info");
        try {
            const res = await rulesApi.test(testMerchant.trim());
            const data = extractApiData(res) ?? {};
            setTestResult(data);
            addLog(
                `Result → Merchant: "${data.normalized_merchant ?? data.clean_merchant_name ?? "?"}", Category: "${data.category ?? data.target_category ?? "?"}"`,
                "success"
            );
        } catch (err) {
            addLog(`Test failed: ${err.message || "Unknown error"}`, "error");
            toast.error(err.message || "Test failed");
        } finally {
            setTestRunning(false);
        }
    };

    const isAnyRunning = syncRunning || reprocessRunning || detectRunning;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Sandbox Pipeline"
                description="Manually trigger ingestion, normalization, and anomaly detection steps — or run the full pipeline end to end."
            />

            {/* ── Pipeline Steps ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <PipelineCard
                    step={1}
                    title="Sync Transactions"
                    description="Pull raw transactions from the mock bank API into the database."
                    icon={<Download className="w-5 h-5" />}
                    color="blue"
                    running={syncRunning}
                    disabled={isAnyRunning}
                    onRun={handleSync}
                />
                <PipelineCard
                    step={2}
                    title="Normalize (ETL)"
                    description="Re-run merchant normalization rules against all transactions."
                    icon={<RefreshCw className="w-5 h-5" />}
                    color="amber"
                    running={reprocessRunning}
                    disabled={isAnyRunning}
                    onRun={handleReprocess}
                />
                <PipelineCard
                    step={3}
                    title="Detect Anomalies"
                    description="Scan normalized transactions and flag duplicates or unknown merchants."
                    icon={<Terminal className="w-5 h-5" />}
                    color="red"
                    running={detectRunning}
                    disabled={isAnyRunning}
                    onRun={handleDetect}
                />
            </div>

            {/* ── Run Full Pipeline ── */}
            <Card className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h3 className="font-semibold text-orange-800">Full Pipeline</h3>
                    <p className="text-sm text-slate-900 mt-0.5">
                        Run all three steps sequentially: Sync → Normalize → Detect
                    </p>
                </div>
                <button
                    onClick={handleFullPipeline}
                    disabled={isAnyRunning}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-400 hover:to-yellow-300 text-white text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 shrink-0"
                >
                    {isAnyRunning ? <Spinner size="sm" /> : <Play className="w-4 h-4" />}
                    Run Full Pipeline
                </button>
            </Card>

            {/* ── Test Rule ── */}
            <Card className="p-5">
                <h3 className="font-semibold text-yellow-900 mb-4 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-orange-900" />
                    Test Merchant Normalization
                </h3>
                <div className="flex gap-3 flex-col sm:flex-row">
                    <Input
                        placeholder='e.g. "AMZN Mktp US*HJ291"'
                        value={testMerchant}
                        onChange={(e) => setTestMerchant(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleTestRule()}
                        wrapperClassName="flex-1"
                    />
                    <button
                        onClick={handleTestRule}
                        disabled={testRunning || !testMerchant.trim()}
                        className="flex items-center gap-2 px-4 py-2 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 hover:bg-orange-600 text-slate-900 text-sm font-medium transition-all disabled:opacity-100 shrink-0"
                    >
                        {testRunning ? <Spinner size="sm" /> : <Play className="w-4 h-4" />}
                        Test
                    </button>
                </div>

                {testResult && (
                    <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <ResultCell label="Normalized Merchant" value={testResult.normalized_merchant ?? testResult.clean_merchant_name ?? "—"} />
                        <ResultCell label="Category" value={testResult.category ?? testResult.target_category ?? "—"} />
                        <ResultCell label="Matched Rule" value={testResult.matched_rule ?? testResult.keyword ?? "No match"} />
                    </div>
                )}
            </Card>

            {/* ── Live Log ── */}
            <Card className="overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <h3 className="font-semibold text-slate-200 text-sm">Pipeline Log</h3>
                        {logs.length > 0 && (
                            <Badge variant="success" size="sm">{logs.length} entries</Badge>
                        )}
                    </div>
                    {logs.length > 0 && (
                        <button
                            onClick={clearLogs}
                            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            Clear
                        </button>
                    )}
                </div>

                <div className="bg-slate-950 min-h-[200px] max-h-[360px] overflow-y-auto p-4 space-y-2 font-mono text-xs">
                    {logs.length === 0 ? (
                        <p className="text-slate-600">No log entries yet. Run a pipeline step to see output here.</p>
                    ) : (
                        logs.map((entry, i) => <LogEntry key={i} entry={entry} />)
                    )}
                </div>
            </Card>
        </div>
    );
}

// ── Pipeline Card ──────────────────────────────────────────────────────────────
const COLOR_MAP = {
    blue:  { border: "border-orange-500/20",  icon: "text-orange-400",  btn: "bg-orange-500 hover:bg-orange-600 shadow-orange-500/20" },
    amber: { border: "border-yellow-500/20", icon: "text-yellow-400", btn: "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/20" },
    red:   { border: "border-red-500/20",   icon: "text-red-400",   btn: "bg-red-600 hover:bg-red-500 shadow-red-500/20" },
};

function PipelineCard({ step, title, description, icon, color, running, disabled, onRun }) {
    const c = COLOR_MAP[color] ?? COLOR_MAP.blue;
    return (
        <Card className={`p-5 flex flex-col gap-4 border ${c.border}`}>
            <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg bg-slate-900 border border-slate-700 ${c.icon}`}>{icon}</div>
                <span className="text-xs font-bold text-slate-900 bg-slate-200 border border-slate-700 px-2 py-0.5 rounded-full">
                    Step {step}
                </span>
            </div>
            <div>
                <h4 className="font-semibold text-yellow-900 text-lg">{title}</h4>
                <p className="text-xs text-slate-900 mt-1 leading-relaxed">{description}</p>
            </div>
            <button
                onClick={onRun}
                disabled={disabled}
                className={`flex items-center justify-center gap-2 h-9 px-4 rounded-lg text-white text-xs font-medium transition-all shadow-lg disabled:opacity-50 ${c.btn}`}
            >
                {running ? <Spinner size="sm" /> : <Play className="w-3.5 h-3.5" />}
                {running ? "Running…" : "Run"}
            </button>
        </Card>
    );
}

function ResultCell({ label, value }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-900 uppercase tracking-wider">{label}</span>
            <span className="text-slate-900 font-semibold">{value}</span>
        </div>
    );
}
