import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
    Sparkles, 
    ShieldAlert, 
    Terminal, 
    ArrowRight, 
    RefreshCw, 
    CheckCircle2, 
    ChevronRight, 
    Zap, 
    Layers, 
    ShieldCheck,
    ArrowUpRight,
    Activity,
    Database,
    BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PRESET_EXAMPLES = [
    {
        raw: "AMZN MKTP US*H61A990 SEATTLE WA",
        normalized: "Amazon Marketplace",
        category: "Shopping",
        anomaly: false,
        confidence: "99.8%",
        latency: "2.1ms"
    },
    {
        raw: "UBER* TRIP ACC1299 HELP.UBER.COM",
        normalized: "Uber",
        category: "Transportation",
        anomaly: false,
        confidence: "100.0%",
        latency: "1.8ms"
    },
    {
        raw: "ZOMATO*REST-991 BENGALURU",
        normalized: "Zomato Restaurant",
        category: "Food & Dining",
        anomaly: false,
        confidence: "98.4%",
        latency: "3.2ms"
    },
    {
        raw: "SUSPICIOUS_TRANSFER_INT_9999_AMT",
        normalized: "International Transfer",
        category: "Transfer",
        anomaly: true,
        confidence: "82.5%",
        latency: "5.4ms"
    }
];

export default function HomePage() {
    const [selectedExample, setSelectedExample] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processStep, setProcessStep] = useState(0);
    const [outputData, setOutputData] = useState(null);

    // Initialize with first example
    useEffect(() => {
        setOutputData(PRESET_EXAMPLES[0]);
    }, []);

    const handleRunNormalizer = (index) => {
        if (isProcessing) return;
        setSelectedExample(index);
        setIsProcessing(true);
        setProcessStep(0);
        setOutputData(null);

        // Simulated steps
        const stepInterval = setInterval(() => {
            setProcessStep(prev => {
                if (prev >= 3) {
                    clearInterval(stepInterval);
                    setIsProcessing(false);
                    setOutputData(PRESET_EXAMPLES[index]);
                    return 3;
                }
                return prev + 1;
            });
        }, 600);
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-transparent font-sans">
            
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-sky-400/20 blur-[120px] pointer-events-none" />
            <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-cyan-400/20 blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-400/10 blur-[150px] pointer-events-none" />

            {/* Header/Nav */}
            <nav className="sticky top-0 z-50 w-full px-6 py-4 backdrop-blur-md bg-white/40 border-b border-sky-100/50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-[0_4px_20px_rgba(14,165,233,0.3)]">
                            <Layers className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-800">
                            Sandbox <span className="text-sky-500 font-medium">Intelligence</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <a 
                            href="https://backend-sandbox-z2fk.onrender.com/api-docs/#/" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-sky-600 transition-colors"
                        >
                            <Terminal className="w-4 h-4" />
                            API Docs
                        </a>
                        <Link 
                            to="/dashboard"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-cyan-500 rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Launch App
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Hero & Content */}
            <main className="max-w-7xl mx-auto px-6 pt-16 pb-24">
                
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-28">
                    
                    {/* Hero Left */}
                    <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-200/50 text-sky-700 text-xs font-bold tracking-wide">
                            <Sparkles className="w-3.5 h-3.5" />
                            Next-Gen FinTech Intelligence Engine
                        </div>

                        <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
                            Financial Data, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">
                                Cleaned & Classified
                            </span> <br />
                            in Real-Time.
                        </h1>

                        <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Ingest raw payment card transactions, normalize messy merchant strings into human-readable names, automatically classify expenses, and identify anomalies instantly.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link 
                                to="/dashboard" 
                                className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-sky-600 to-cyan-500 rounded-2xl shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
                            >
                                Get Started
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            
                            <a 
                                href="#playground" 
                                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-700 bg-white/70 border border-sky-100 hover:bg-white hover:border-sky-300 rounded-2xl backdrop-blur-md transition-all"
                            >
                                Try Playground
                            </a>
                        </div>

                        {/* Quick highlights */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-sky-100/60 max-w-lg mx-auto lg:mx-0">
                            <div>
                                <h4 className="text-2xl font-black text-slate-800">99.9%</h4>
                                <p className="text-xs font-semibold text-slate-500">Accuracy Rate</p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-slate-800">&lt; 5ms</h4>
                                <p className="text-xs font-semibold text-slate-500">Latency</p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-slate-800">100%</h4>
                                <p className="text-xs font-semibold text-slate-500">Customizable Rules</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Right: Interactive Sandbox Preview */}
                    <div id="playground" className="lg:col-span-5 w-full">
                        <div className="relative p-6 sm:p-8 rounded-3xl bg-white/80 border border-sky-100 shadow-[0_20px_50px_rgba(14,165,233,0.08)] backdrop-blur-xl">
                            
                            {/* Window header */}
                            <div className="flex items-center justify-between pb-6 border-b border-sky-100/60 mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                    <span className="text-xs font-bold text-slate-400 ml-2 font-mono">NORMALIZATION_ENGINE</span>
                                </div>
                                <span className="px-2 py-0.5 rounded bg-sky-50 text-[10px] font-bold text-sky-600 font-mono">v1.2.0</span>
                            </div>

                            {/* Raw Transaction Selector */}
                            <div className="space-y-4">
                                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                                    1. Select Input Card Transaction
                                </label>
                                <div className="grid grid-cols-1 gap-2.5">
                                    {PRESET_EXAMPLES.map((item, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => handleRunNormalizer(idx)}
                                            className={`text-left px-4 py-3 rounded-xl border text-sm font-mono transition-all flex items-center justify-between ${
                                                selectedExample === idx 
                                                    ? "bg-sky-50 border-sky-300 text-sky-800 shadow-sm"
                                                    : "bg-slate-50/50 hover:bg-slate-50 border-slate-100 text-slate-600"
                                            }`}
                                        >
                                            <span className="truncate pr-4 font-semibold">{item.raw}</span>
                                            <Zap className={`w-3.5 h-3.5 flex-shrink-0 ${
                                                selectedExample === idx ? "text-sky-500 animate-pulse" : "text-slate-300"
                                            }`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Ingestion & Processing Pipeline Animation */}
                            <div className="mt-8 pt-6 border-t border-sky-100/60">
                                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">
                                    2. Processing Pipeline
                                </label>

                                <div className="bg-slate-900 rounded-2xl p-4 font-mono text-xs text-slate-300 min-h-[145px] flex flex-col justify-between shadow-inner">
                                    {isProcessing ? (
                                        <div className="space-y-2.5">
                                            {processStep >= 0 && (
                                                <div className="flex items-center gap-2 text-cyan-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                                                    <span>[INCOMING] Reading raw stream payload...</span>
                                                </div>
                                            )}
                                            {processStep >= 1 && (
                                                <div className="flex items-center gap-2 text-sky-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                                                    <span>[RULES] Matching regex pattern trees...</span>
                                                </div>
                                            )}
                                            {processStep >= 2 && (
                                                <div className="flex items-center gap-2 text-emerald-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                                    <span>[CLASSIFIER] Sorting taxonomy rules...</span>
                                                </div>
                                            )}
                                            {processStep >= 3 && (
                                                <div className="flex items-center gap-2 text-yellow-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
                                                    <span>[SECURITY] Risk profiling & scoring...</span>
                                                </div>
                                            )}
                                        </div>
                                    ) : outputData ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Normalizer output</span>
                                                <span className="text-emerald-400 flex items-center gap-1">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Successfully Engine-Resolved
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50">
                                                    <div className="text-[10px] text-slate-500 font-extrabold uppercase mb-1">Merchant</div>
                                                    <div className="text-sm font-bold text-white truncate">{outputData.normalized}</div>
                                                </div>
                                                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50">
                                                    <div className="text-[10px] text-slate-500 font-extrabold uppercase mb-1">Category</div>
                                                    <div className="text-sm font-bold text-white truncate">{outputData.category}</div>
                                                </div>
                                                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50">
                                                    <div className="text-[10px] text-slate-500 font-extrabold uppercase mb-1">Confidence</div>
                                                    <div className="text-sm font-bold text-white truncate">{outputData.confidence}</div>
                                                </div>
                                                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50">
                                                    <div className="text-[10px] text-slate-500 font-extrabold uppercase mb-1">Status</div>
                                                    <div className={`text-sm font-bold truncate flex items-center gap-1 ${
                                                        outputData.anomaly ? "text-rose-400" : "text-emerald-400"
                                                    }`}>
                                                        {outputData.anomaly ? (
                                                            <>
                                                                <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
                                                                Anomaly Flagged
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                                                                Verified Clean
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                                            Select a transaction preset to start
                                        </div>
                                    )}
                                    
                                    <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                                        <span>Latency: {isProcessing ? "calculating..." : outputData?.latency || "N/A"}</span>
                                        <span>Thread ID: TR_PROC_092</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid of Platform Capabilities */}
                <div className="space-y-12 mb-28">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                            Platform Infrastructure Highlights
                        </h2>
                        <p className="text-slate-500 max-w-xl mx-auto font-medium">
                            Ingest, sanitize, categorize, and analyze. Explore the modules engineered to resolve cluttered payment narratives into clean accounting-ready insights.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        
                        {/* Card 1: Normalization */}
                        <div className="p-6 rounded-2xl bg-white/70 border border-sky-100 hover:border-sky-300 hover:-translate-y-1 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Merchant Sanitizer</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Apply advanced regex tree mappings and rule libraries to parse statement strings. Remove terminal numbers, transaction codes, and garbage tags instantly.
                                </p>
                            </div>
                            <Link to="/rules" className="mt-6 inline-flex items-center text-xs font-extrabold text-sky-600 hover:text-sky-800 gap-1">
                                Configure Matching Rules
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Card 2: Categorization */}
                        <div className="p-6 rounded-2xl bg-white/70 border border-sky-100 hover:border-sky-300 hover:-translate-y-1 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                    <Database className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Taxonomy Auto-sorting</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Sort merchants into standard categories (Shopping, Utilities, Travel, Food & Dining) dynamically. Ready-made mapping configurations fit standard accounting tool formats.
                                </p>
                            </div>
                            <Link to="/ledger" className="mt-6 inline-flex items-center text-xs font-extrabold text-indigo-600 hover:text-indigo-800 gap-1">
                                View Categorized Ledger
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Card 3: Anomaly Radar */}
                        <div className="p-6 rounded-2xl bg-white/70 border border-sky-100 hover:border-sky-300 hover:-translate-y-1 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                                    <ShieldAlert className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Anomaly & Risk Radar</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Protect your system with real-time anomaly detection. Flag duplicate ingestion, spikes in transaction amounts, unusual locations, and suspicious payloads.
                                </p>
                            </div>
                            <Link to="/anomaly" className="mt-6 inline-flex items-center text-xs font-extrabold text-orange-600 hover:text-orange-800 gap-1">
                                Inspect Anomalies
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Card 4: Interactive Sandbox */}
                        <div className="p-6 rounded-2xl bg-white/70 border border-sky-100 hover:border-sky-300 hover:-translate-y-1 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600">
                                    <Terminal className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Developer Testing Ground</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Use the developer sandbox to paste raw JSON transactions, configure normalization pipelines, and trace exactly how transactions resolve at every middleware node.
                                </p>
                            </div>
                            <Link to="/sandbox" className="mt-6 inline-flex items-center text-xs font-extrabold text-cyan-600 hover:text-cyan-800 gap-1">
                                Open Dev Sandbox
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Card 5: High-speed Dashboard */}
                        <div className="p-6 rounded-2xl bg-white/70 border border-sky-100 hover:border-sky-300 hover:-translate-y-1 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Real-time Analytics Overview</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Watch key transaction statistics: volume counts, active normalization counts, anomaly percentages, and categorization trends plotted dynamically in high-impact charts.
                                </p>
                            </div>
                            <Link to="/dashboard" className="mt-6 inline-flex items-center text-xs font-extrabold text-emerald-600 hover:text-emerald-800 gap-1">
                                Launch Overview
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Card 6: Rule Engine */}
                        <div className="p-6 rounded-2xl bg-white/70 border border-sky-100 hover:border-sky-300 hover:-translate-y-1 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Customizable Rule Manager</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    No complex code updates required. Add, modify, or test custom normalization patterns and regex rules directly in the browser with our live schema builder.
                                </p>
                            </div>
                            <Link to="/rules" className="mt-6 inline-flex items-center text-xs font-extrabold text-violet-600 hover:text-violet-800 gap-1">
                                Manage Custom Rules
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                    </div>
                </div>

                {/* Final Call to Action Section */}
                <div className="relative rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-500 p-8 sm:p-12 text-center text-white shadow-xl shadow-sky-600/15 overflow-hidden">
                    {/* Glow spots inside CTA */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_120%,rgba(14,165,233,0.45),transparent_60%)]" />
                    
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            Ready to sanitize your transactional streams?
                        </h2>
                        <p className="text-sky-100 text-sm sm:text-base leading-relaxed font-medium">
                            Join developers and accounting platforms in standardizing bank statement descriptions. Clean inputs mean cleaner analytics. Get started with Sandbox Intelligence today.
                        </p>
                        
                        <div className="pt-4">
                            <Link 
                                to="/dashboard" 
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-sky-800 bg-white hover:bg-sky-50 active:scale-95 rounded-2xl shadow-xl transition-all"
                            >
                                Get Started Now
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

            </main>

            {/* Footer */}
            <footer className="w-full bg-slate-950 py-12 px-6 border-t border-slate-900 text-slate-400 text-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400">
                            <Layers className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-white">Sandbox Intelligence</span>
                    </div>

                    <p className="text-xs">
                        &copy; {new Date().getFullYear()} Sandbox. All rights reserved. Precision FinTech Normalization.
                    </p>
                </div>
            </footer>
        </div>
    );
}
