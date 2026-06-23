import React, { useState, useEffect, useMemo } from 'react';
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  Link2, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Terminal, 
  BookOpen, 
  Search, 
  Plus, 
  Filter, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  Code,
  LineChart,
  Grid,
  TrendingUp,
  CreditCard,
  User,
  Info,
  ChevronRight,
  ExternalLink,
  Play
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';

// Realistic seed transactions to populate the dashboard initial state
const INITIAL_TRANSACTIONS = [
  { id: 'tx_001', date: '2026-06-18', merchant: 'STARBUCKS COFFEE 2931', rawMerchant: 'STARBUCKS COFFEE 2931 COSE', amount: 8.75, category: 'Food & Dining', normalizedMerchant: 'Starbucks', status: 'categorized', source: 'Apex Bank' },
  { id: 'tx_002', date: '2026-06-18', merchant: 'UBER RIDE PENDING', rawMerchant: 'UBER RIDE TRIP 48FGH9', amount: 24.50, category: 'Transportation', normalizedMerchant: 'Uber', status: 'categorized', source: 'Apex Bank' },
  { id: 'tx_003', date: '2026-06-17', merchant: 'AMZN Mktp US*HJ291', rawMerchant: 'AMZN Mktp US*HJ291 AMZN.COM/BILL', amount: 114.99, category: 'Shopping', normalizedMerchant: 'Amazon', status: 'categorized', source: 'Apex Bank' },
  { id: 'tx_004', date: '2026-06-16', merchant: 'NETFLIX.COM DIGITAL RECURRING', rawMerchant: 'NETFLIX.COM S10294829 MERCHANT BILL', amount: 15.49, category: 'Entertainment', normalizedMerchant: 'Netflix', status: 'categorized', source: 'Apex Bank' },
  { id: 'tx_005', date: '2026-06-15', merchant: 'CONEDISON ELEC UTILITY', rawMerchant: 'CONEDISON NY POWER BILLING 49204', amount: 142.30, category: 'Bills & Utilities', normalizedMerchant: 'ConEdison', status: 'categorized', source: 'Apex Bank' },
  { id: 'tx_006', date: '2026-06-15', merchant: 'SHELL OIL CO 3921', rawMerchant: 'SHELL OIL STATION HIGHWAY 9 NY', amount: 45.00, category: 'Transportation', normalizedMerchant: 'Shell', status: 'categorized', source: 'Horizon Union' },
  { id: 'tx_007', date: '2026-06-14', merchant: 'SWEETGREEN SOHO NYC', rawMerchant: 'SWEETGREEN SOHO NYC 2029', amount: 18.25, category: 'Food & Dining', normalizedMerchant: 'Sweetgreen', status: 'categorized', source: 'Horizon Union' },
  { id: 'tx_008', date: '2026-06-12', merchant: 'GITHUB SPONSORSHIP', rawMerchant: 'GITHUB *SPONSOR GITHUB.COM/BILL', amount: 10.00, category: 'Entertainment', normalizedMerchant: 'GitHub', status: 'categorized', source: 'Horizon Union' },
  { id: 'tx_009', date: '2026-06-10', merchant: 'EMPLOYER PAYROLL DIR DEP', rawMerchant: 'TECHCORP PAYROLL DIR DEP ST3829', amount: 3200.00, category: 'Income', normalizedMerchant: 'TechCorp Payroll', status: 'categorized', source: 'Apex Bank' },
  { id: 'tx_010', date: '2026-06-08', merchant: 'SAFEWAY GROCERY STORE 392', rawMerchant: 'SAFEWAY GROCERY #392 SAN JOSE CA', amount: 165.40, category: 'Food & Dining', normalizedMerchant: 'Safeway', status: 'categorized', source: 'Horizon Union' },
  { id: 'tx_011', date: '2026-06-05', merchant: 'CHEVRON GASOLINE 4929', rawMerchant: 'CHEVRON GAS STATION EXPRESSWAY', amount: 52.00, category: 'Transportation', normalizedMerchant: 'Chevron', status: 'categorized', source: 'Horizon Union' },
  { id: 'tx_012', date: '2026-06-02', merchant: 'INTERNET PROVIDER COMCAST', rawMerchant: 'COMCAST CABLE INTERNET BILLING 3829', amount: 89.99, category: 'Bills & Utilities', normalizedMerchant: 'Comcast', status: 'categorized', source: 'Apex Bank' },
];

const CATEGORY_COLORS = {
  'Food & Dining': '#14b8a6', // Teal
  'Transportation': '#3b82f6', // Blue
  'Shopping': '#ec4899', // Pink
  'Entertainment': '#a855f7', // Purple
  'Bills & Utilities': '#f59e0b', // Amber
  'Income': '#10b981', // Emerald
  'Uncategorized': '#6b7280' // Gray
};

const BANK_INSTITUTIONS = [
  { id: 'ins_apex', name: 'Apex Bank & Trust', logo: '🏦', bg: 'from-emerald-500 to-teal-700' },
  { id: 'ins_horizon', name: 'Horizon Credit Union', logo: '💳', bg: 'from-blue-500 to-indigo-700' },
  { id: 'ins_stellar', name: 'Stellar Wealth Management', logo: '🌟', bg: 'from-purple-500 to-pink-700' }
];

const MOCK_RAW_STREAMS = [
  { rawMerchant: 'TST* BLUE BOTTLE COFFEE NY', amount: 6.50, mockBank: 'Apex Bank' },
  { rawMerchant: 'UBER RIDE L192SF9', amount: 18.75, mockBank: 'Apex Bank' },
  { rawMerchant: 'WHOLEFDS SOHO 10092', amount: 92.40, mockBank: 'Horizon Union' },
  { rawMerchant: 'SP* SPOTIFY PREMIUM BILLING', amount: 14.99, mockBank: 'Horizon Union' },
  { rawMerchant: 'WAL-MART SUPERCTR #3829', amount: 143.20, mockBank: 'Stellar Wealth' },
  { rawMerchant: 'AMZN Prime*M20F928', amount: 16.29, mockBank: 'Apex Bank' },
  { rawMerchant: 'STEAM GAMES DIGITAL LUX', amount: 59.99, mockBank: 'Apex Bank' },
  { rawMerchant: 'CONEDISON GAS UTILITY AUTO', amount: 76.80, mockBank: 'Horizon Union' },
  { rawMerchant: 'VENMO CASHOUT DES:PAYMENT', amount: 250.00, mockBank: 'Stellar Wealth' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | sandbox | pipeline | developer
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [accounts, setAccounts] = useState([
    { id: 'acc_01', name: 'Apex Primary Checking', type: 'Checking', balance: 5420.15, connected: true, institution: 'Apex Bank & Trust' },
    { id: 'acc_02', name: 'Horizon High-Yield Savings', type: 'Savings', balance: 18450.00, connected: true, institution: 'Horizon Credit Union' },
    { id: 'acc_03', name: 'Stellar Brokerage Account', type: 'Investment', balance: 0.00, connected: false, institution: 'Stellar Wealth Management' }
  ]);
  
  // Custom categorization rules visual state
  const [customRules, setCustomRules] = useState([
    { keyword: 'starbucks', category: 'Food & Dining', normalized: 'Starbucks' },
    { keyword: 'uber', category: 'Transportation', normalized: 'Uber' },
    { keyword: 'amzn', category: 'Shopping', normalized: 'Amazon' },
    { keyword: 'netflix', category: 'Entertainment', normalized: 'Netflix' },
    { keyword: 'conedison', category: 'Bills & Utilities', normalized: 'ConEdison' },
    { keyword: 'shell', category: 'Transportation', normalized: 'Shell' },
    { keyword: 'blue bottle', category: 'Food & Dining', normalized: 'Blue Bottle Coffee' },
    { keyword: 'spotify', category: 'Entertainment', normalized: 'Spotify' },
    { keyword: 'wholefds', category: 'Food & Dining', normalized: 'Whole Foods' },
    { keyword: 'wal-mart', category: 'Shopping', normalized: 'Walmart' },
    { keyword: 'steam', category: 'Entertainment', normalized: 'Steam Games' }
  ]);

  const [newRuleKeyword, setNewRuleKeyword] = useState('');
  const [newRuleCategory, setNewRuleCategory] = useState('Food & Dining');
  const [newRuleNormalized, setNewRuleNormalized] = useState('');

  // Sandbox Plaid Link Simulation Flow Modal state
  const [isPlaidModalOpen, setIsPlaidModalOpen] = useState(false);
  const [plaidStep, setPlaidStep] = useState('select_bank'); // select_bank | credentials | consenting | success
  const [selectedPlaidBank, setSelectedPlaidBank] = useState(null);
  const [plaidUsername, setPlaidUsername] = useState('user_sandbox');
  const [plaidPassword, setPlaidPassword] = useState('••••••••');
  
  // Pipeline logs state
  const [pipelineLogs, setPipelineLogs] = useState([
    { timestamp: '13:00:02', level: 'info', message: 'Pipeline worker initialized successfully.' },
    { timestamp: '13:00:05', level: 'info', message: 'Listening to Open Banking Webhooks (Plaid TRANSACTION_SYNC).' }
  ]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const addLog = (message, level = 'info') => {
    const time = new Date().toLocaleTimeString();
    setPipelineLogs(prev => [{ timestamp: time, level, message }, ...prev].slice(0, 100));
  };

  const processPipeline = (rawItems) => {
    setIsSyncing(true);
    addLog('Starting transaction ingestion pipeline...', 'info');
    
    setTimeout(() => {
      const processed = rawItems.map(item => {
        addLog(`Ingesting RAW payload: "${item.rawMerchant}"`, 'info');
        
        // Step 1: Normalization and rule-based categorization
        let matchedCategory = 'Uncategorized';
        let matchedNormalized = item.rawMerchant;
        
        for (const rule of customRules) {
          if (item.rawMerchant.toLowerCase().includes(rule.keyword.toLowerCase())) {
            matchedCategory = rule.category;
            matchedNormalized = rule.normalized;
            addLog(`Rule match: Keyword "${rule.keyword}" matches "${item.rawMerchant}". Categorized as [${rule.category}].`, 'success');
            break;
          }
        }
        
        if (matchedCategory === 'Uncategorized') {
          addLog(`Rule Warning: No keyword matched "${item.rawMerchant}". Stored as [Uncategorized].`, 'warning');
        }

        // Step 2: Anomaly Detection
        if (item.amount > 100) {
          addLog(`Anomaly Trigger: Transaction exceeds audit limit threshold ($100.00). Flagged for reviewer audit.`, 'warning');
        }
        
        return {
          id: `tx_${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date().toISOString().split('T')[0],
          merchant: item.rawMerchant,
          rawMerchant: item.rawMerchant,
          amount: item.amount,
          category: matchedCategory,
          normalizedMerchant: matchedNormalized,
          status: matchedCategory === 'Uncategorized' ? 'manual_review' : 'categorized',
          source: item.mockBank
        };
      });

      // Update balances of connected accounts dynamically
      setAccounts(prevAccs => {
        return prevAccs.map(acc => {
          const bankTxSum = processed
            .filter(tx => tx.source === acc.institution)
            .reduce((sum, tx) => sum + (tx.category === 'Income' ? tx.amount : -tx.amount), 0);
          return {
            ...acc,
            balance: Math.max(0, parseFloat((acc.balance + bankTxSum).toFixed(2)))
          };
        });
      });

      setTransactions(prev => [...processed, ...prev]);
      setIsSyncing(false);
      addLog(`Pipeline finalized. Successfully ingested and standardized ${processed.length} financial ledger entries.`, 'success');
    }, 1200);
  };

  const triggerMockSync = () => {
    // Collect active connected institutions
    const activeBankNames = accounts.filter(a => a.connected).map(a => a.institution);
    if (activeBankNames.length === 0) {
      addLog('Sync aborted: No connected Open Banking items found in credentials store. Please Link a Bank first.', 'error');
      alert("No accounts are currently connected! Please visit the Sandbox page and link an account first.");
      return;
    }

    // Select random mock raw streams that belong to connected banks
    const eligibleStreams = MOCK_RAW_STREAMS.filter(stream => {
      // Find matching institution name loosely
      if (stream.mockBank === 'Apex Bank' && activeBankNames.includes('Apex Bank & Trust')) return true;
      if (stream.mockBank === 'Horizon Union' && activeBankNames.includes('Horizon Credit Union')) return true;
      if (stream.mockBank === 'Stellar Wealth' && activeBankNames.includes('Stellar Wealth Management')) return true;
      return false;
    });

    if (eligibleStreams.length === 0) {
      addLog('Sync completed: 0 new payloads found in bank provider hold queue.', 'info');
      return;
    }

    // Randomize a slice of 2-3 items
    const shuffled = [...eligibleStreams].sort(() => 0.5 - Math.random());
    const slice = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

    processPipeline(slice);
  };

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newRuleKeyword || !newRuleNormalized) return;

    const duplicate = customRules.find(r => r.keyword.toLowerCase() === newRuleKeyword.toLowerCase());
    if (duplicate) {
      alert("Rule keyword already exists!");
      return;
    }

    const newRule = {
      keyword: newRuleKeyword.trim(),
      category: newRuleCategory,
      normalized: newRuleNormalized.trim()
    };

    setCustomRules([...customRules, newRule]);
    addLog(`System updated: RegEx Engine registered new parsing map rule: "${newRule.keyword}" -> "${newRule.normalized}" [${newRule.category}]`, 'info');
    
    // Reset inputs
    setNewRuleKeyword('');
    setNewRuleNormalized('');
  };

  const handleDeleteRule = (keyword) => {
    setCustomRules(customRules.filter(r => r.keyword !== keyword));
    addLog(`System configuration changed: Removed regex filter map keyword "${keyword}".`, 'warning');
  };

  const handlePlaidLinkInit = () => {
    setIsPlaidModalOpen(true);
    setPlaidStep('select_bank');
  };

  const handleSelectPlaidBank = (bank) => {
    setSelectedPlaidBank(bank);
    setPlaidStep('credentials');
  };

  const handlePlaidSubmit = () => {
    setPlaidStep('consenting');
    setTimeout(() => {
      setPlaidStep('success');
    }, 1500);
  };

  const finalizePlaidLink = () => {
    setIsPlaidModalOpen(false);
    if (!selectedPlaidBank) return;

    // Set connected to true in state
    setAccounts(prev => prev.map(acc => {
      if (acc.institution === selectedPlaidBank.name) {
        return { ...acc, connected: true, balance: acc.balance === 0 ? 5000.00 : acc.balance };
      }
      return acc;
    }));

    addLog(`Sandbox Webhook Fired: Connected Token Exchange finished for ${selectedPlaidBank.name}. access_token_sandbox_live_0x9A...`, 'success');
    
    // Run automated initial sync
    const initialImports = MOCK_RAW_STREAMS.filter(stream => {
      if (selectedPlaidBank.id === 'ins_apex' && stream.mockBank === 'Apex Bank') return true;
      if (selectedPlaidBank.id === 'ins_horizon' && stream.mockBank === 'Horizon Union') return true;
      if (selectedPlaidBank.id === 'ins_stellar' && stream.mockBank === 'Stellar Wealth') return true;
      return false;
    });

    if (initialImports.length > 0) {
      processPipeline(initialImports);
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tx.normalizedMerchant.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || tx.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, searchTerm, categoryFilter]);

  const dashboardStats = useMemo(() => {
    let totalBalance = accounts.reduce((sum, acc) => sum + (acc.connected ? acc.balance : 0), 0);
    
    let monthSpend = transactions
      .filter(tx => tx.category !== 'Income' && tx.status === 'categorized')
      .reduce((sum, tx) => sum + tx.amount, 0);

    let monthIncome = transactions
      .filter(tx => tx.category === 'Income')
      .reduce((sum, tx) => sum + tx.amount, 0);

    let anomalyCount = transactions.filter(tx => tx.amount > 100).length;

    return { totalBalance, monthSpend, monthIncome, anomalyCount };
  }, [accounts, transactions]);

  const categoryBreakdownData = useMemo(() => {
    const map = {};
    transactions
      .filter(tx => tx.category !== 'Income')
      .forEach(tx => {
        map[tx.category] = (map[tx.category] || 0) + tx.amount;
      });

    return Object.keys(map).map(cat => ({
      name: cat,
      value: parseFloat(map[cat].toFixed(2)),
      color: CATEGORY_COLORS[cat] || '#6b7280'
    }));
  }, [transactions]);

  const monthlyTrendData = useMemo(() => {
    // Generate some mock history + current transactions
    return [
      { name: 'Jan 26', Expense: 1200, Income: 2800 },
      { name: 'Feb 26', Expense: 1540, Income: 2800 },
      { name: 'Mar 26', Expense: 1890, Income: 3100 },
      { name: 'Apr 26', Expense: 1450, Income: 3100 },
      { name: 'May 26', Expense: 2100, Income: 3200 },
      { name: 'Jun 26 (Current)', Expense: parseFloat(dashboardStats.monthSpend.toFixed(2)), Income: parseFloat(dashboardStats.monthIncome.toFixed(2)) },
    ];
  }, [dashboardStats]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500/30">
      {}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-xl shadow-lg shadow-teal-500/10">
            <Cpu className="h-6 w-6 text-slate-950" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent flex items-center gap-2">
              APEX LABS <span className="text-xs bg-slate-800 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded-full font-mono">FINTECH INTERNSHIP</span>
            </h1>
            <p className="text-xs text-slate-400">Task Platform: Transaction Processing & Mock Open Banking Dashboard</p>
          </div>
        </div>
        
        <nav className="flex items-center space-x-1">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'dashboard' 
                ? 'bg-slate-800 text-teal-400 border-b-2 border-teal-500' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Grid className="h-4 w-4" />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('sandbox')} 
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'sandbox' 
                ? 'bg-slate-800 text-teal-400 border-b-2 border-teal-500' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Link2 className="h-4 w-4" />
            <span>Plaid Sandbox</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('pipeline')} 
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
              activeTab === 'pipeline' 
                ? 'bg-slate-800 text-teal-400 border-b-2 border-teal-500' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Terminal className="h-4 w-4" />
            <span>Ingestion Engine</span>
            {isSyncing && (
              <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setActiveTab('developer')} 
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'developer' 
                ? 'bg-slate-800 text-teal-400 border-b-2 border-teal-500' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Intern Code Lab</span>
          </button>
        </nav>
      </header>

      {}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* Sync Trigger Banner Bar (Global Trigger) */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
              <RefreshCw className={`h-5 w-5 text-teal-400 ${isSyncing ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">Test the Full-Stack Simulation Flow</h4>
              <p className="text-xs text-slate-400 max-w-xl">
                Simulate a web-hook event triggering transaction fetches from connected APIs, processing them through the parser code, and updating the database values live.
              </p>
            </div>
          </div>
          <div className="flex space-x-3 w-full md:w-auto">
            <button 
              onClick={handlePlaidLinkInit}
              className="flex-1 md:flex-initial flex items-center justify-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-white transition duration-200"
            >
              <Plus className="h-4 w-4 text-teal-400" />
              <span>Connect Bank (Plaid)</span>
            </button>
            <button 
              onClick={triggerMockSync}
              disabled={isSyncing}
              className="flex-1 md:flex-initial flex items-center justify-center space-x-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:bg-teal-500/40 rounded-xl text-xs font-bold text-slate-950 shadow-lg shadow-teal-500/10 transition duration-200"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Ingesting...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-slate-950" />
                  <span>Simulate Fetch Sync</span>
                </>
              )}
            </button>
          </div>
        </div>

        {}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* KPI Cards section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-700 transition duration-300">
                <div className="absolute top-0 right-0 h-16 w-16 bg-teal-500/5 rounded-bl-full pointer-events-none" />
                <span className="text-xs font-medium text-slate-400 block uppercase tracking-wider mb-2">Total Combined Funds</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-extrabold text-slate-100">${dashboardStats.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className="text-xs text-teal-400 font-mono">USD</span>
                </div>
                <div className="mt-3 flex items-center text-xs text-teal-400/90 gap-1 bg-teal-950/20 border border-teal-500/10 w-fit px-2 py-0.5 rounded-md">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Audited Ledgers</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-700 transition duration-300">
                <div className="absolute top-0 right-0 h-16 w-16 bg-rose-500/5 rounded-bl-full pointer-events-none" />
                <span className="text-xs font-medium text-slate-400 block uppercase tracking-wider mb-2">Monthly Expenditures</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-extrabold text-slate-100">${dashboardStats.monthSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className="text-xs text-rose-400 font-mono">USD</span>
                </div>
                <div className="mt-3 flex items-center text-xs text-slate-400 gap-1">
                  <ArrowDownRight className="h-3.5 w-3.5 text-rose-400" />
                  <span className="text-slate-300 font-medium">12 transactions</span> Ingested
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-700 transition duration-300">
                <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
                <span className="text-xs font-medium text-slate-400 block uppercase tracking-wider mb-2">Monthly Gross Income</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-extrabold text-slate-100">${dashboardStats.monthIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className="text-xs text-emerald-400 font-mono">USD</span>
                </div>
                <div className="mt-3 flex items-center text-xs text-emerald-400 gap-1">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>Regular direct deposit detected</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-700 transition duration-300">
                <div className="absolute top-0 right-0 h-16 w-16 bg-amber-500/5 rounded-bl-full pointer-events-none" />
                <span className="text-xs font-medium text-slate-400 block uppercase tracking-wider mb-2">Flagged Audit Alerts</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-extrabold text-amber-400">{dashboardStats.anomalyCount}</span>
                  <span className="text-xs text-amber-500 ml-1">Flagged</span>
                </div>
                <div className="mt-3 flex items-center text-xs text-slate-400 gap-1">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                  <span>Amount limit rules triggered</span>
                </div>
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cash Flow Over Time (Area Chart) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-200">Cash Flow Tracking</h3>
                    <p className="text-xs text-slate-400">Comparing processed gross income against cumulative categorical expenses</p>
                  </div>
                  <div className="flex space-x-3 text-xs">
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-teal-400" /> Income</span>
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-indigo-500" /> Expenses</span>
                  </div>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                        labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="Income" stroke="#14b8a6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorIncome)" />
                      <Area type="monotone" dataKey="Expense" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorExpense)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Categorical Spending Analysis (Donut Chart) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-200">Spending Breakdown</h3>
                  <p className="text-xs text-slate-400">Total volume distributed by normalized categories</p>
                </div>
                
                <div className="h-44 w-full my-4 relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryBreakdownData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Amount']}
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute text-center">
                    <p className="text-xs text-slate-400">Categorized Total</p>
                    <p className="text-xl font-bold">${dashboardStats.monthSpend.toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                  {categoryBreakdownData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-slate-300 font-medium">{item.name}</span>
                      </div>
                      <span className="text-slate-400 font-mono font-semibold">${item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Linked Accounts Component */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-slate-200">Linked Credentials</h3>
                  <p className="text-xs text-slate-400">Plaid Link registered items & checking balances</p>
                </div>
                <div className="space-y-3">
                  {accounts.map((acc) => (
                    <div key={acc.id} className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 bg-slate-800 border ${acc.connected ? 'border-teal-500/20' : 'border-slate-800'} rounded-lg text-lg`}>
                          {acc.institution.includes('Apex') ? '🏦' : acc.institution.includes('Horizon') ? '💳' : '🌟'}
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-semibold uppercase">{acc.type}</p>
                          <h4 className="text-sm font-bold text-slate-200">{acc.name}</h4>
                          <span className="text-[10px] text-slate-500 block">{acc.institution}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        {acc.connected ? (
                          <>
                            <p className="text-sm font-bold text-slate-100">${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                            <span className="text-[10px] bg-teal-950/40 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded-full font-mono">Linked</span>
                          </>
                        ) : (
                          <button 
                            onClick={handlePlaidLinkInit} 
                            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg font-semibold transition"
                          >
                            Connect
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rule Configurator: Interns write categorization engines */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:col-span-2 space-y-4">
                <div>
                  <h3 className="font-bold text-slate-200">Interactive Regex Classification Engine</h3>
                  <p className="text-xs text-slate-400">
                    Map incoming disorganized transaction strings into tidy clean merchants and core budget buckets. 
                  </p>
                </div>

                <form onSubmit={handleAddRule} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-950/40 border border-slate-800 p-4 rounded-xl">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1 font-mono">Rule Substring Key</label>
                    <input 
                      type="text" 
                      placeholder="e.g., starbucks" 
                      value={newRuleKeyword} 
                      onChange={(e) => setNewRuleKeyword(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1 font-mono">Clean Name Mapping</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Starbucks" 
                      value={newRuleNormalized} 
                      onChange={(e) => setNewRuleNormalized(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1 font-mono">Financial Category</label>
                    <select 
                      value={newRuleCategory}
                      onChange={(e) => setNewRuleCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                    >
                      <option value="Food & Dining">Food & Dining</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Bills & Utilities">Bills & Utilities</option>
                      <option value="Income">Income</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button 
                      type="submit"
                      className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs py-2 rounded-lg flex items-center justify-center space-x-1 transition duration-200 shadow-md shadow-teal-500/10"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Parse Rule</span>
                    </button>
                  </div>
                </form>

                {/* Rules List Container */}
                <div className="h-32 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {customRules.map((rule, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800/80 p-2.5 rounded-lg flex justify-between items-center group">
                      <div className="truncate">
                        <span className="text-[10px] bg-slate-800 text-teal-400 border border-slate-700/60 px-1.5 py-0.5 rounded font-mono truncate max-w-[100px] inline-block">{rule.keyword}</span>
                        <h5 className="text-xs font-bold text-slate-200 truncate mt-1">{rule.normalized}</h5>
                        <p className="text-[9px] text-slate-500">{rule.category}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteRule(rule.keyword)}
                        className="text-xs text-rose-500 hover:text-rose-400 hover:bg-rose-950/20 p-1.5 rounded transition opacity-0 group-hover:opacity-100"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="font-bold text-slate-200">Database Ledger Logs</h3>
                  <p className="text-xs text-slate-400">Transactions stored under account schemas post-normalization</p>
                </div>
                
                {/* Searching & Filter utilities */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-initial">
                    <Search className="h-4 w-4 text-slate-500 absolute left-3 top-2.5" />
                    <input 
                      type="text" 
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-slate-700 w-full md:w-56"
                    />
                  </div>
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-slate-700 cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Bills & Utilities">Bills & Utilities</option>
                    <option value="Income">Income</option>
                  </select>
                </div>
              </div>

              {/* Transactions Grid/Table */}
              <div className="overflow-x-auto border border-slate-800/80 rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                      <th className="p-3 pl-4">Transaction ID</th>
                      <th className="p-3">Normalized Merchant / Raw Text</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Origin Store</th>
                      <th className="p-3 text-right pr-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs">
                    {filteredTransactions.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-slate-500 font-medium">
                          No matching records returned in current query. Connect accounts or adjust search keys.
                        </td>
                      </tr>
                    ) : (
                      filteredTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-900/40 transition">
                          <td className="p-3 pl-4 font-mono text-[11px] text-slate-500">{tx.id}</td>
                          <td className="p-3">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-200">{tx.normalizedMerchant}</span>
                              <span className="text-[10px] text-slate-500 font-mono truncate max-w-sm" title={tx.rawMerchant}>
                                Raw: {tx.rawMerchant}
                              </span>
                            </div>
                          </td>
                          <td className="p-3">
                            <span 
                              className="px-2 py-0.5 rounded text-[10px] font-bold"
                              style={{ 
                                backgroundColor: (CATEGORY_COLORS[tx.category] || '#6b7280') + '20', 
                                color: CATEGORY_COLORS[tx.category] || '#6b7280' 
                              }}
                            >
                              {tx.category}
                            </span>
                          </td>
                          <td className="p-3 text-slate-400 font-semibold">{tx.source}</td>
                          <td className={`p-3 text-right pr-4 font-bold font-mono text-sm ${tx.category === 'Income' ? 'text-emerald-400' : 'text-slate-100'}`}>
                            {tx.category === 'Income' ? '+' : '-'}${tx.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'sandbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Simulation Interface Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-100">Open Banking Sandbox Sim</h3>
                <p className="text-sm text-slate-400 mt-1">
                  How does Plaid integration function? It uses secure credential linkage. Simulate user experiences linking accounts to build custom authentication scripts.
                </p>
              </div>

              {/* Steps visualizer for Intern Explanations */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-950/40 border border-slate-800 rounded-xl text-center text-xs">
                <div>
                  <div className="h-8 w-8 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold mx-auto mb-2">1</div>
                  <h5 className="font-bold text-slate-300">Link Event Trigger</h5>
                  <p className="text-[10px] text-slate-500 mt-1">SDK modal initializes safe connection tunnel.</p>
                </div>
                <div>
                  <div className="h-8 w-8 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center font-bold mx-auto mb-2">2</div>
                  <h5 className="font-bold text-slate-300">Auth Exchange</h5>
                  <p className="text-[10px] text-slate-500 mt-1">User verifies login directly inside protected frame.</p>
                </div>
                <div>
                  <div className="h-8 w-8 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center font-bold mx-auto mb-2">3</div>
                  <h5 className="font-bold text-slate-300">Token Hook Handshake</h5>
                  <p className="text-[10px] text-slate-500 mt-1">Plaid generates ephemeral public_token string.</p>
                </div>
                <div>
                  <div className="h-8 w-8 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center font-bold mx-auto mb-2">4</div>
                  <h5 className="font-bold text-slate-300">API DB Store</h5>
                  <p className="text-[10px] text-slate-500 mt-1">Server exchanges public_token for active access_token.</p>
                </div>
              </div>

              {/* Institution list configuration sandbox */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-200">Test Open Banking Linking Scenarios:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {BANK_INSTITUTIONS.map((inst) => {
                    const mappedAcc = accounts.find(a => a.institution === inst.name);
                    const isConnected = mappedAcc ? mappedAcc.connected : false;
                    return (
                      <div key={inst.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-4">
                        <div className="flex items-start justify-between">
                          <span className="text-3xl">{inst.logo}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono ${isConnected ? 'bg-teal-950/40 text-teal-400 border border-teal-500/10' : 'bg-slate-800 text-slate-400'}`}>
                            {isConnected ? 'Sync Active' : 'Disconnected'}
                          </span>
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-200">{inst.name}</h5>
                          <p className="text-[10px] text-slate-400 mt-1">Supports Core checking, savings accounts & webhook payload updates.</p>
                        </div>
                        {isConnected ? (
                          <button 
                            onClick={() => {
                              setAccounts(prev => prev.map(a => a.institution === inst.name ? { ...a, connected: false } : a));
                              addLog(`User Command: Terminated account credential access linked to ${inst.name}.`, 'warning');
                            }}
                            className="w-full bg-rose-950/20 hover:bg-rose-950/40 border border-rose-500/20 text-rose-400 text-xs py-2 rounded-lg font-bold transition"
                          >
                            Unlink Institution
                          </button>
                        ) : (
                          <button 
                            onClick={() => {
                              setSelectedPlaidBank(inst);
                              setPlaidStep('credentials');
                              setIsPlaidModalOpen(true);
                            }}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2 rounded-lg font-bold transition"
                          >
                            Initiate Link Connection
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Simulated Plaid Webhooks section */}
              <div className="border border-slate-800 bg-slate-950/40 p-5 rounded-xl space-y-3">
                <h4 className="font-bold text-sm text-slate-200 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  Understanding Webhooks for Syncing Tasks
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Real bank connections are not continuously pulled live. Plaid shoots an asynchronous HTTP POST webhook (<code>TRANSACTION_SYNC</code>) to your server when new records clear. Your background ingestion task receives the webhook, verifies validation tags, queries historical endpoints, and processes the queue.
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button 
                    onClick={() => {
                      addLog("Plaid Webhook Simulator: Received POST request on '/api/webhooks/plaid'. Event code: HISTORICAL_UPDATE", "info");
                      triggerMockSync();
                    }}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-slate-100 font-bold text-xs py-2 px-3 rounded-lg transition"
                  >
                    Simulate: HISTORICAL_UPDATE Webhook
                  </button>
                  <button 
                    onClick={() => {
                      addLog("Plaid Webhook Simulator: Received POST request on '/api/webhooks/plaid'. Event code: NEW_PENDING_TX", "info");
                      triggerMockSync();
                    }}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs py-2 px-3 rounded-lg transition"
                  >
                    Simulate: PENDING_TX Webhook
                  </button>
                </div>
              </div>
            </div>

            {/* Sandbox Side Explanation Explaining Key Tasks */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h3 className="font-bold text-lg text-slate-200 flex items-center gap-2">
                <Info className="h-5 w-5 text-teal-400" />
                <span>Sandbox Sandbox Checklist</span>
              </h3>
              
              <div className="space-y-4 text-xs">
                <p className="text-slate-400 leading-relaxed">
                  Have your interns follow this exercise flow to fully capture how modern open banking works:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="p-1 rounded bg-teal-950 text-teal-400 border border-teal-500/20 font-bold font-mono text-[10px]">Step 1</span>
                    <div>
                      <h5 className="font-bold text-slate-300">Connect Horizon Credit Union</h5>
                      <p className="text-slate-500 text-[11px] mt-0.5">Use the link button, input username, verify consent, and watch database variables initialize.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="p-1 rounded bg-teal-950 text-teal-400 border border-teal-500/20 font-bold font-mono text-[10px]">Step 2</span>
                    <div>
                      <h5 className="font-bold text-slate-300">Set Regex Matching Rules</h5>
                      <p className="text-slate-500 text-[11px] mt-0.5">Define category rules on the Dashboard for key merchants (e.g., <code>wholefds</code> mapped to <code>Food & Dining</code>).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="p-1 rounded bg-teal-950 text-teal-400 border border-teal-500/20 font-bold font-mono text-[10px]">Step 3</span>
                    <div>
                      <h5 className="font-bold text-slate-300">Trigger Mock Ingestion</h5>
                      <p className="text-slate-500 text-[11px] mt-0.5">Press "Simulate Fetch Sync" or trigger webhooks. Track real-time parser output under the Ingestion Engine logs.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="p-1 rounded bg-teal-950 text-teal-400 border border-teal-500/20 font-bold font-mono text-[10px]">Step 4</span>
                    <div>
                      <h5 className="font-bold text-slate-300">Audit Dashboard Logs</h5>
                      <p className="text-slate-500 text-[11px] mt-0.5">Verify clean metrics on your live client charts. Check for flagged transaction limits.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-[10px] uppercase font-bold text-indigo-400 font-mono">Plaid API Key Concept</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Interns should write standard Plaid token creation endpoints using:
                  </p>
                  <code className="text-[10px] bg-slate-900 px-2 py-1 rounded block border border-slate-800 font-mono text-indigo-300">
                    /api/create_link_token
                  </code>
                  <code className="text-[10px] bg-slate-900 px-2 py-1 rounded block border border-slate-800 font-mono text-indigo-300">
                    /api/exchange_public_token
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-teal-400" />
                    <span>Real-time ETL (Extract-Transform-Load) Pipeline Visualizer</span>
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Trace raw, disorganized transaction payloads from API feeds as they undergo matching transformations and validation checks.
                  </p>
                </div>
                <button 
                  onClick={() => setPipelineLogs([])}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg font-mono transition border border-slate-700"
                >
                  Clear Console Out
                </button>
              </div>

              {/* Streaming Terminal Log Visualizer */}
              <div className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden font-mono text-xs">
                {/* Window top header */}
                <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
                  <div className="flex space-x-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold">Parser: node-js-ingestor-daemon-v1.0</span>
                  <span className="text-slate-600 text-[10px]">LIVE</span>
                </div>

                {/* Log messages window container */}
                <div className="p-4 h-[350px] overflow-y-auto space-y-2 flex flex-col-reverse">
                  {pipelineLogs.length === 0 ? (
                    <div className="text-center text-slate-600 py-12">
                      &gt; Console quiet. Trigger ingestion sync to stream transaction processing.
                    </div>
                  ) : (
                    pipelineLogs.map((log, index) => (
                      <div key={index} className="flex items-start space-x-2 border-l-2 pl-3 py-0.5 border-slate-800 hover:bg-slate-900/10 transition">
                        <span className="text-slate-600 select-none text-[10px] font-medium shrink-0 pt-0.5">{log.timestamp}</span>
                        <span className={`px-1.5 py-0.2 select-none text-[9px] font-bold rounded uppercase shrink-0 ${
                          log.level === 'success' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/10' :
                          log.level === 'warning' ? 'bg-amber-950/40 text-amber-400 border border-amber-500/10' :
                          log.level === 'error' ? 'bg-rose-950/40 text-rose-400 border border-rose-500/10' :
                          'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}>
                          {log.level}
                        </span>
                        <p className={`flex-1 text-xs select-text ${
                          log.level === 'success' ? 'text-emerald-200' :
                          log.level === 'warning' ? 'text-amber-200' :
                          log.level === 'error' ? 'text-rose-200 animate-pulse' :
                          'text-slate-300'
                        }`}>
                          {log.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Explanatory system pipeline schema architecture */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                <h4 className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                  <span className="p-1 bg-slate-800 text-teal-400 rounded">1</span> 
                  Extraction Step
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fetches arrays of newly modified records via the Plaid API using credentials stored inside your encrypted database clusters.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                <h4 className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                  <span className="p-1 bg-slate-800 text-teal-400 rounded">2</span> 
                  Transform & Clean Step
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Matches raw transaction text logs against registered regex maps to assign structured categories and create clear, normalized merchant titles.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                <h4 className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                  <span className="p-1 bg-slate-800 text-teal-400 rounded">3</span> 
                  Load & Audit Step
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Triggers anomaly auditing filters, detects excessive values, writes clean entities to target relational databases, and updates dashboard metrics.
                </p>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'developer' && (
          <div className="space-y-6">
            
            {/* Introductory Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Code className="h-5 w-5 text-teal-400" />
                <span>Intern DevLab Reference & Schemas</span>
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Provide these relational database schemas, software sequence flows, and baseline backend templates to help interns structure their tasks cleanly.
              </p>
            </div>

            {/* Database schema design tool and visual layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Relational Database schemas card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div>
                  <h4 className="font-bold text-slate-200">Recommended SQL Database Schema</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Interns should build relational database structures (using PostgreSQL or SQLite) following double-entry practices.
                  </p>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  {/* Table Accounts schema block */}
                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                    <div className="bg-slate-900 px-4 py-2 flex justify-between items-center border-b border-slate-800">
                      <span className="text-teal-400 font-bold">Table: Accounts</span>
                      <span className="text-[10px] text-slate-500">PostgreSQL</span>
                    </div>
                    <div className="p-3 space-y-1.5 text-slate-300">
                      <div className="flex justify-between border-b border-slate-900 pb-1">
                        <span className="font-semibold text-slate-200">id</span>
                        <span className="text-slate-500">UUID [PK, default: uuid_generate_v4()]</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-1">
                        <span className="font-semibold text-slate-200">plaid_item_id</span>
                        <span className="text-slate-500">VARCHAR(255) [Nullable]</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-1">
                        <span className="font-semibold text-slate-200">institution_name</span>
                        <span className="text-slate-500">VARCHAR(100)</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-1">
                        <span className="font-semibold text-slate-200">type</span>
                        <span className="text-slate-500">VARCHAR(50) [Checking | Savings | Credit]</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-200">balance</span>
                        <span className="text-slate-500">DECIMAL(12, 2) [default: 0.00]</span>
                      </div>
                    </div>
                  </div>

                  {/* Table Transactions schema block */}
                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                    <div className="bg-slate-900 px-4 py-2 flex justify-between items-center border-b border-slate-800">
                      <span className="text-teal-400 font-bold">Table: Transactions</span>
                      <span className="text-[10px] text-slate-500">PostgreSQL</span>
                    </div>
                    <div className="p-3 space-y-1.5 text-slate-300">
                      <div className="flex justify-between border-b border-slate-900 pb-1">
                        <span className="font-semibold text-slate-200">id</span>
                        <span className="text-slate-500">UUID [PK]</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-1">
                        <span className="font-semibold text-slate-200">account_id</span>
                        <span className="text-slate-500">UUID [FK -&gt; Accounts.id]</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-1">
                        <span className="font-semibold text-slate-200">raw_merchant_string</span>
                        <span className="text-slate-500">TEXT</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-1">
                        <span className="font-semibold text-slate-200">normalized_merchant_name</span>
                        <span className="text-slate-500">VARCHAR(100)</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-1">
                        <span className="font-semibold text-slate-200">category</span>
                        <span className="text-slate-500">VARCHAR(50)</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-1">
                        <span className="font-semibold text-slate-200">amount</span>
                        <span className="text-slate-500">DECIMAL(10, 2)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-200">date_cleared</span>
                        <span className="text-slate-500">DATE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Backend script template for transaction normalization mapping tasks */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div>
                  <h4 className="font-bold text-slate-200">Mock Normalization Script Code</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Below is an actual Node.js script template interns can build upon to process incoming transactions.
                  </p>
                </div>

                {/* Code highlight window wrapper */}
                <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/80 font-mono text-[11px] leading-relaxed">
                  <div className="bg-slate-900 px-4 py-2.5 flex justify-between items-center border-b border-slate-800">
                    <span className="text-slate-400">transaction_parser.js</span>
                    <span className="text-[10px] text-slate-500">NodeJS / ES6</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-slate-300 space-y-1">
{`// 1. Array containing categorization rule objects
const PARSING_RULES = [
  { regex: /starbucks/i, category: 'Food & Dining', name: 'Starbucks' },
  { regex: /uber/i, category: 'Transportation', name: 'Uber' },
  { regex: /amazon|amzn/i, category: 'Shopping', name: 'Amazon' }
];

// 2. Main processing script function
function standardizeTransaction(rawTx) {
  let matchedName = rawTx.rawMerchantString;
  let matchedCategory = 'Uncategorized';

  // Perform regular expression mapping
  for (const rule of PARSING_RULES) {
    if (rule.regex.test(rawTx.rawMerchantString)) {
      matchedCategory = rule.category;
      matchedName = rule.name;
      break;
    }
  }

  // 3. Return standardized record mapping
  return {
    id: rawTx.plaidTransactionId,
    raw_text: rawTx.rawMerchantString,
    clean_merchant: matchedName,
    category: matchedCategory,
    amount: parseFloat(rawTx.amount),
    cleared_date: rawTx.date
  };
}`}
                  </pre>
                </div>

                {/* Explanatory notice */}
                <div className="bg-indigo-950/20 border border-indigo-500/10 p-4 rounded-xl flex gap-3">
                  <Info className="h-5 w-5 text-indigo-400 shrink-0" />
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong>Challenge Task suggestion:</strong> Have your interns expand this baseline logic by writing fuzzy string searches using libraries like Jaro-Winkler or Levenshtein Distance. This makes the database mapping logic resilient to minor typographical discrepancies in raw bank streams!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {}
      {isPlaidModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal header branding */}
            <div className="bg-slate-950/80 border-b border-slate-800/80 p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🛡️</span>
                <span className="text-xs font-mono tracking-widest text-slate-400 font-bold uppercase">APEX PLAID LINK COMPANION</span>
              </div>
              <button 
                onClick={() => setIsPlaidModalOpen(false)} 
                className="text-slate-400 hover:text-slate-200 text-sm p-1 hover:bg-slate-800/60 rounded"
              >
                ✕
              </button>
            </div>

            {/* Modal body based on flow step */}
            {plaidStep === 'select_bank' && (
              <div className="p-6 space-y-4">
                <div className="text-center space-y-2">
                  <h4 className="text-lg font-bold text-slate-100">Connect Your Financial Institution</h4>
                  <p className="text-xs text-slate-400">Select one of our secure Open Banking sandbox configurations to generate initial simulated transactions.</p>
                </div>
                
                <div className="space-y-2 pt-2">
                  {BANK_INSTITUTIONS.map((bank) => (
                    <button 
                      key={bank.id}
                      onClick={() => handleSelectPlaidBank(bank)}
                      className="w-full text-left p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between group transition"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{bank.logo}</span>
                        <div>
                          <h5 className="text-xs font-bold text-slate-200 group-hover:text-teal-400 transition">{bank.name}</h5>
                          <p className="text-[10px] text-slate-500">Supports core assets tracking</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-slate-300 transition" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {plaidStep === 'credentials' && selectedPlaidBank && (
              <div className="p-6 space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-4xl">{selectedPlaidBank.logo}</span>
                  <h4 className="text-base font-bold text-slate-100">Login to {selectedPlaidBank.name}</h4>
                  <p className="text-xs text-slate-400">Enter your mock credentials to establish a secure, read-only token tunnel.</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1 font-mono">User Sandbox Identifier</label>
                    <input 
                      type="text" 
                      value={plaidUsername}
                      onChange={(e) => setPlaidUsername(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1 font-mono">Mock Auth Password</label>
                    <input 
                      type="password" 
                      value={plaidPassword}
                      onChange={(e) => setPlaidPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-slate-700"
                    />
                  </div>
                </div>

                <button 
                  onClick={handlePlaidSubmit}
                  className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs py-2.5 rounded-lg transition duration-200 mt-2"
                >
                  Verify Verification & Proceed
                </button>
              </div>
            )}

            {plaidStep === 'consenting' && selectedPlaidBank && (
              <div className="p-6 text-center space-y-4">
                <div className="relative h-12 w-12 mx-auto flex items-center justify-center">
                  <RefreshCw className="h-8 w-8 text-teal-400 animate-spin absolute" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-200 text-sm">Validating Public Authorization Exchange...</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Generating secure auth access keys... Plaid is swapping your raw credentials for a randomized token.
                  </p>
                </div>
              </div>
            )}

            {plaidStep === 'success' && selectedPlaidBank && (
              <div className="p-6 text-center space-y-4">
                <div className="h-12 w-12 bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-100">Verification Access Granted!</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Secure channel verified. <code>access_token_sandbox_live_0x9A...</code> has been saved to your DB Account credentials store.
                  </p>
                </div>
                <button 
                  onClick={finalizePlaidLink}
                  className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs py-2.5 rounded-lg transition duration-200"
                >
                  Return and Fetch Initial Ledger Data
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {}
      <footer className="mt-auto border-t border-slate-850 bg-slate-950 py-6 px-6 text-center text-xs text-slate-500">
        <p className="max-w-xl mx-auto leading-relaxed">
          Designed for financial services engineering internships. Built as a mock full-stack container running locally to help interns understand double-entry transaction ledgers.
        </p>
      </footer>
    </div>
  );
}