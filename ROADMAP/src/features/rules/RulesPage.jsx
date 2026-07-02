import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, RefreshCw, Trash2, Pencil, Zap, FlaskConical } from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader/PageHeader";
import Card from "../../components/common/Card/Card";
import Modal from "../../components/common/Modal/Modal";
import Badge from "../../components/common/Badge/Badge";
import Input from "../../components/common/Input/Input";
import Spinner from "../../components/common/Spinner/Spinner";

import { rulesApi } from "./api/rulesApi";
import {
    setRulesLoading,
    setRulesError,
    setRules,
    addRule,
    updateRuleInState,
    removeRule,
} from "../../store/slices/rulesSlice";

// ─── RulesPage ────────────────────────────────────────────────────────────────
export default function RulesPage() {
    const dispatch = useDispatch();
    const { rules, isLoading } = useSelector((state) => state.rules);

    // modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [editingRule, setEditingRule] = useState(null); // null = create mode

    // reprocess state
    const [reprocessing, setReprocessing] = useState(false);

    // test sandbox state
    const [testOpen, setTestOpen] = useState(false);
    const [testMerchant, setTestMerchant] = useState("");
    const [testResult, setTestResult] = useState(null);
    const [testLoading, setTestLoading] = useState(false);

    // ── fetch ─────────────────────────────────────────────────────────────────
    const fetchRules = useCallback(async () => {
        dispatch(setRulesLoading(true));
        try {
            const res = await rulesApi.getAll();
            dispatch(setRules(res.data ?? res));
        } catch (err) {
            dispatch(setRulesError("Failed to load rules."));
            toast.error(err.message || "Failed to load rules");
        }
    }, [dispatch]);

    useEffect(() => {
        fetchRules();
    }, [fetchRules]);

    // ── create / edit submit ──────────────────────────────────────────────────
    const handleSave = async (formData) => {
        try {
            if (editingRule) {
                const res = await rulesApi.update(editingRule.id, formData);
                dispatch(updateRuleInState(res.data ?? res));
                toast.success("Rule updated successfully");
            } else {
                const res = await rulesApi.create(formData);
                dispatch(addRule(res.data ?? res));
                toast.success("Rule created successfully");
            }
            setModalOpen(false);
            setEditingRule(null);
        } catch (err) {
            toast.error(err.message || "Failed to save rule");
        }
    };

    // ── delete ────────────────────────────────────────────────────────────────
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this rule? This cannot be undone.")) return;
        try {
            await rulesApi.remove(id);
            dispatch(removeRule(id));
            toast.success("Rule deleted");
        } catch (err) {
            toast.error(err.message || "Failed to delete rule");
        }
    };

    // ── reprocess ─────────────────────────────────────────────────────────────
    const handleReprocess = async () => {
        setReprocessing(true);
        try {
            const res = await rulesApi.reprocess();
            const count = (res.data ?? res)?.updated ?? "all";
            toast.success(`Reprocessed ${count} transactions using latest rules`);
        } catch (err) {
            toast.error(err.message || "Reprocessing failed");
        } finally {
            setReprocessing(false);
        }
    };

    // ── test rule ─────────────────────────────────────────────────────────────
    const handleTest = async () => {
        if (!testMerchant.trim()) return;
        setTestLoading(true);
        setTestResult(null);
        try {
            const res = await rulesApi.test(testMerchant.trim());
            setTestResult(res.data ?? res);
        } catch (err) {
            toast.error(err.message || "Test failed");
        } finally {
            setTestLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Rules Engine"
                description="Define merchant keyword normalization rules to categorize transactions automatically."
                actions={
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={() => { setTestOpen(true); setTestResult(null); }}
                            className="flex items-center gap-2 text-sm px-3.5 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all"
                        >
                            <FlaskConical className="w-4 h-4" />
                            Test Rule
                        </button>
                        <button
                            onClick={handleReprocess}
                            disabled={reprocessing}
                            className="flex items-center gap-2 text-sm px-3.5 py-2 rounded-lg border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-all disabled:opacity-50"
                        >
                            {reprocessing ? <Spinner size="sm" /> : <RefreshCw className="w-4 h-4" />}
                            Reprocess
                        </button>
                        <button
                            onClick={() => { setEditingRule(null); setModalOpen(true); }}
                            className="flex items-center gap-2 text-sm px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-500/20"
                        >
                            <Plus className="w-4 h-4" />
                            New Rule
                        </button>
                    </div>
                }
            />

            {/* ── Stats bar ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Rules</p>
                    <p className="text-2xl font-bold text-slate-100 mt-1">{rules.length}</p>
                </Card>
                <Card className="p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Keyword Patterns</p>
                    <p className="text-2xl font-bold text-slate-100 mt-1">
                        {[...new Set(rules.map((r) => r.keyword?.toLowerCase()))].length}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Categories Covered</p>
                    <p className="text-2xl font-bold text-slate-100 mt-1">
                        {[...new Set(rules.map((r) => r.target_category).filter(Boolean))].length}
                    </p>
                </Card>
            </div>

            {/* ── Rules Table ── */}
            <Card className="overflow-hidden">
                <div className="p-5 border-b border-slate-800 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <h2 className="font-semibold text-slate-200">Active Rules</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-900/70 border-b border-slate-800">
                            <tr>
                                <th className="px-5 py-4 font-semibold">Keyword</th>
                                <th className="px-5 py-4 font-semibold">Clean Merchant</th>
                                <th className="px-5 py-4 font-semibold">Category</th>
                                <th className="px-5 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="border-b border-slate-800/50">
                                        {Array.from({ length: 4 }).map((__, j) => (
                                            <td key={j} className="px-5 py-4">
                                                <div className="h-4 bg-slate-800 rounded animate-pulse w-3/4" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : rules.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-16 text-center text-slate-500">
                                        No rules defined yet. Create your first rule.
                                    </td>
                                </tr>
                            ) : (
                                rules.map((rule) => (
                                    <tr
                                        key={rule.id}
                                        className="border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors"
                                    >
                                        <td className="px-5 py-3.5 font-mono text-blue-300 text-xs">
                                            {rule.keyword}
                                        </td>
                                        <td className="px-5 py-3.5 font-medium text-slate-200">
                                            {rule.clean_merchant_name || rule.normalized_merchant || "—"}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <Badge variant="accent" size="sm">
                                                {rule.target_category || "—"}
                                            </Badge>
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingRule(rule);
                                                        setModalOpen(true);
                                                    }}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                                                    title="Edit rule"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(rule.id)}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                                    title="Delete rule"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* ── Create / Edit Modal ── */}
            <RuleModal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setEditingRule(null); }}
                onSave={handleSave}
                rule={editingRule}
            />

            {/* ── Test Modal ── */}
            <Modal
                isOpen={testOpen}
                onClose={() => setTestOpen(false)}
                title="Test Merchant Normalization"
                description="Enter a raw merchant string to see how rules would normalize it."
                size="sm"
            >
                <div className="flex flex-col gap-4">
                    <Input
                        label="Raw Merchant Name"
                        placeholder="e.g. AMZN Mktp US*HJ291"
                        value={testMerchant}
                        onChange={(e) => setTestMerchant(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleTest()}
                    />
                    <button
                        onClick={handleTest}
                        disabled={testLoading || !testMerchant.trim()}
                        className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all disabled:opacity-50"
                    >
                        {testLoading ? <Spinner size="sm" /> : <FlaskConical className="w-4 h-4" />}
                        Run Test
                    </button>
                    {testResult && (
                        <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm space-y-2">
                            <Row label="Normalized Merchant" value={testResult.normalized_merchant ?? testResult.clean_merchant_name ?? "—"} />
                            <Row label="Category" value={testResult.category ?? testResult.target_category ?? "—"} />
                            <Row label="Matched Rule" value={testResult.matched_rule ?? testResult.keyword ?? "No match"} />
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
}

// ── Helper Row ─────────────────────────────────────────────────────────────────
function Row({ label, value }) {
    return (
        <div className="flex justify-between gap-4">
            <span className="text-slate-400">{label}</span>
            <span className="text-slate-100 font-medium text-right">{value}</span>
        </div>
    );
}

// ── Create / Edit Modal ────────────────────────────────────────────────────────
function RuleModal({ isOpen, onClose, onSave, rule }) {
    const [form, setForm] = useState({ keyword: "", clean_merchant_name: "", target_category: "" });
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (rule) {
            setForm({
                keyword: rule.keyword ?? "",
                clean_merchant_name: rule.clean_merchant_name ?? rule.normalized_merchant ?? "",
                target_category: rule.target_category ?? "",
            });
        } else {
            setForm({ keyword: "", clean_merchant_name: "", target_category: "" });
        }
        setErrors({});
    }, [rule, isOpen]);

    const validate = () => {
        const e = {};
        if (!form.keyword.trim()) e.keyword = "Keyword is required";
        if (!form.clean_merchant_name.trim()) e.clean_merchant_name = "Clean merchant name is required";
        if (!form.target_category.trim()) e.target_category = "Category is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSaving(true);
        try {
            await onSave(form);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={rule ? "Edit Rule" : "Create New Rule"}
            description={rule ? `Editing rule for keyword "${rule.keyword}"` : "Define a new merchant normalization rule."}
            size="sm"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    label="Keyword"
                    placeholder="e.g. amazon"
                    required
                    value={form.keyword}
                    onChange={(e) => setForm((f) => ({ ...f, keyword: e.target.value }))}
                    error={errors.keyword}
                    helperText="Case-insensitive substring match on raw merchant"
                />
                <Input
                    label="Clean Merchant Name"
                    placeholder="e.g. Amazon"
                    required
                    value={form.clean_merchant_name}
                    onChange={(e) => setForm((f) => ({ ...f, clean_merchant_name: e.target.value }))}
                    error={errors.clean_merchant_name}
                />
                <Input
                    label="Target Category"
                    placeholder="e.g. Shopping"
                    required
                    value={form.target_category}
                    onChange={(e) => setForm((f) => ({ ...f, target_category: e.target.value }))}
                    error={errors.target_category}
                />
                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 h-10 px-4 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 text-sm transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {saving ? <Spinner size="sm" /> : null}
                        {rule ? "Save Changes" : "Create Rule"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
