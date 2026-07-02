import React, { useState } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Badge,
    Input,
    SearchInput,
    Select,
    Modal,
    Spinner,
    Skeleton,
    PageHeader,
    Drawer,
    Alert,
    ConfirmDialog,
    Tooltip,
    StatCard,
    DataTable
} from "../components/common";
import {
    User,
    Settings,
    ArrowRight,
    Trash,
    TrendingUp,
    RefreshCw,
    Plus
} from "lucide-react";
import { cn } from "../utils/cn";

function Showcase() {
    // Interactive states
    const [searchText, setSearchText] = useState("");
    const [selectVal, setSelectVal] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isConfirmLoading, setIsConfirmLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isTableLoading, setIsTableLoading] = useState(false);

    // Mock data for DataTable
    const columns = [
        {
            header: "User",
            accessorKey: "name",
            render: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-300 font-semibold text-xs">
                        {row.name.charAt(0)}
                    </div>
                    <div>
                        <div className="font-semibold text-slate-200">{row.name}</div>
                        <div className="text-xs text-slate-500">{row.email}</div>
                    </div>
                </div>
            )
        },
        {
            header: "Role",
            accessorKey: "role",
            render: ({ value }) => (
                <Badge variant={value === "Admin" ? "primary" : "secondary"}>
                    {value}
                </Badge>
            )
        },
        {
            header: "Status",
            accessorKey: "status",
            render: ({ value }) => (
                <Badge variant={value === "Active" ? "success" : "danger"} dot>
                    {value}
                </Badge>
            )
        },
        {
            header: "Limit (USD)",
            accessorKey: "limit",
            render: ({ value }) => (
                <span className="font-mono text-slate-300 font-semibold">
                    ${value.toLocaleString()}
                </span>
            )
        }
    ];

    const allData = [
        { id: 1, name: "Apoorv Kumar", email: "apoorv@sandbox.io", role: "Admin", status: "Active", limit: 250000 },
        { id: 2, name: "Sarah Connor", email: "sarah@sandbox.io", role: "Developer", status: "Active", limit: 50000 },
        { id: 3, name: "John Doe", email: "john@sandbox.io", role: "Developer", status: "Inactive", limit: 12000 },
        { id: 4, name: "Alice Smith", email: "alice@sandbox.io", role: "Manager", status: "Active", limit: 125000 },
        { id: 5, name: "Bruce Wayne", email: "bruce@waynecorp.com", role: "Admin", status: "Active", limit: 9999999 },
    ];

    // Simulating Confirmation Dialog Async request
    const handleConfirmAction = async () => {
        setIsConfirmLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsConfirmLoading(false);
        setIsConfirmOpen(false);
        alert("Action successfully confirmed!");
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10 select-none pb-20">
            {/* Page Header Component */}
            <PageHeader
                title="Sandbox Library Playground"
                description="Production-grade, Dark Premium interactive UI library presentation. Play around with custom properties, hover feedback, active triggers, and overlays."
                actions={
                    <>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setIsTableLoading(true);
                                setTimeout(() => setIsTableLoading(false), 1205);
                            }}
                            leftIcon={<RefreshCw className={cn("h-4 w-4", isTableLoading && "animate-spin")} />}
                        >
                            Refresh Tables
                        </Button>
                        <Button
                            variant="primary"
                            leftIcon={<Plus className="h-4 w-4" />}
                            onClick={() => setIsModalOpen(true)}
                        >
                            Trigger Modal
                        </Button>
                    </>
                }
            />

            {/* 1. Stat Cards Showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8.5">
                <StatCard
                    title="Active Ingestion Runs"
                    value="4,902"
                    icon={RefreshCw}
                    trendVal="12.5%"
                    trendDirection="up"
                />
                <StatCard
                    title="Transaction Value"
                    value="$1.24M"
                    icon={TrendingUp}
                    trendVal="4.23%"
                    trendDirection="up"
                />
                <StatCard
                    title="Audit Anomaly Alerts"
                    value="3"
                    icon={Trash}
                    trendVal="25.0%"
                    trendDirection="down"
                />
                <StatCard
                    title="API Server Load"
                    value="18.2%"
                    icon={Settings}
                    loading={isTableLoading}
                />
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Left Card column */}
                <div className="flex flex-col gap-8">
                    {/* Buttons Showcase */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Button Variants & Loading States</CardTitle>
                            <CardDescription>All sizes (sm, md, lg), states, and icon layouts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-wrap gap-3">
                                <Button variant="primary">Primary</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="danger">Danger</Button>
                                <Button variant="success">Success</Button>
                                <Button variant="ghost">Ghost</Button>
                            </div>

                            <div className="flex flex-wrap gap-3 items-center">
                                <Button variant="primary" size="sm">Small size</Button>
                                <Button variant="primary" size="md">Medium Size</Button>
                                <Button variant="primary" size="lg">Large Size</Button>
                            </div>

                            <div className="flex flex-wrap gap-3 items-center">
                                <Button variant="outline" size="sm" leftIcon={<User className="h-3.5 w-3.5" />}>
                                    Left Icon
                                </Button>
                                <Button variant="primary" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                                    Right Icon
                                </Button>
                                <Button variant="secondary" loading>
                                    Loading State
                                </Button>
                                <Button variant="danger" disabled>
                                    Disabled Button
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Badges & Tooltips */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Badges & Tooltips</CardTitle>
                            <CardDescription>Hover over tooltips and look at the dot indicator badges.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-wrap gap-3">
                                <Badge variant="primary">Primary Badge</Badge>
                                <Badge variant="secondary">Secondary</Badge>
                                <Badge variant="outline">Outline</Badge>
                                <Badge variant="success" dot>Success Dot</Badge>
                                <Badge variant="warning" dot>Warning Dot</Badge>
                                <Badge variant="danger" dot>Danger Dot</Badge>
                                <Badge variant="accent">Accent</Badge>
                            </div>

                            <div className="flex flex-wrap gap-6 items-center pt-2">
                                <Tooltip content="Top positioned tooltip" position="top">
                                    <Button variant="outline" size="sm">Tooltip Top</Button>
                                </Tooltip>

                                <Tooltip content="Right positioned tooltip" position="right">
                                    <Button variant="outline" size="sm">Tooltip Right</Button>
                                </Tooltip>

                                <Tooltip content="Bottom positioned tooltip" position="bottom">
                                    <Button variant="outline" size="sm">Tooltip Bottom</Button>
                                </Tooltip>

                                <Tooltip content="Left positioned tooltip" position="left">
                                    <Button variant="outline" size="sm">Tooltip Left</Button>
                                </Tooltip>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Alerts Showcase */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Semantic Alerts</CardTitle>
                            <CardDescription>Standard notifications with optional dismiss triggers.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Alert variant="info" title="Central Audit System Info" onDismiss={() => alert("Info Dismissed")}>
                                Synchronizing core database accounts log files...
                            </Alert>
                            <Alert variant="success" title="Ingestion Running Successfully">
                                All rules pipeline log lines matched client assertions.
                            </Alert>
                            <Alert variant="warning" title="Elevated API Usage Latency">
                                Node server responses increased above threshold (340msavg).
                            </Alert>
                            <Alert variant="danger" title="Validation Process Flipped">
                                System failed parsing rules file at line index 12.
                            </Alert>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Card column */}
                <div className="flex flex-col gap-8">
                    {/* Input Controls */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Input Elements & Controls</CardTitle>
                            <CardDescription>Keyboard accessible widgets, password setups, and helper validation lines.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <Input
                                label="Standard Input Box"
                                placeholder="Enter Username..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                helperText="Make sure it conforms to standard domain handles."
                                rightIcon={<User className="h-4 w-4" />}
                            />

                            <Input
                                label="Error Bound Input Box"
                                placeholder="Enter Email..."
                                defaultValue="invalid-email@"
                                error="Please input a valid email coordinate."
                            />

                            <SearchInput
                                placeholder="Dynamic Search Input..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onClear={() => setSearchText("")}
                            />

                            <Select
                                label="Selector Option list"
                                placeholder="Choose account limit..."
                                value={selectVal}
                                onChange={(e) => setSelectVal(e.target.value)}
                                options={[
                                    { value: "less_10k", label: "Less than $10,000" },
                                    { value: "10k_100k", label: "$10,000 - $100,000" },
                                    { value: "more_100k", label: "More than $100,000" }
                                ]}
                            />
                        </CardContent>
                    </Card>

                    {/* Loader Indicators */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Spinners & Skeletons Loaders</CardTitle>
                            <CardDescription>Dynamic premium loaders for Shaowcase layouts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-wrap items-center gap-6">
                                <Spinner size="sm" />
                                <Spinner size="md" />
                                <Spinner size="lg" />
                                <Spinner size="xl" variant="accent" />
                                <Spinner size="md" variant="success" />
                                <Spinner size="md" variant="danger" />
                            </div>

                            <div className="space-y-3 pt-2">
                                <Skeleton variant="line" width="90%" />
                                <div className="flex items-center gap-3">
                                    <Skeleton variant="circle" width="3rem" height="3rem" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton variant="line" width="60%" />
                                        <Skeleton variant="line" width="40%" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Interactive Triggers */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Interactive Triggers Dialogs</CardTitle>
                            <CardDescription>Press button triggers to launch overlay components.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-4">
                            <Button variant="outline" className="border-slate-700" onClick={() => setIsModalOpen(true)}>
                                Show Modal Overlay
                            </Button>
                            <Button variant="outline" className="border-slate-705" onClick={() => setIsDrawerOpen(true)}>
                                Open Drawer Panel
                            </Button>
                            <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>
                                Delete Ledger Record
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* 3. Table and Pagination Wrapper section */}
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>DataTable Integration</CardTitle>
                        <CardDescription>Displays mock records with pagination, status badges and sticky column rows.</CardDescription>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setIsTableLoading(true);
                            setTimeout(() => setIsTableLoading(false), 900);
                        }}
                    >
                        Force Load State
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={allData}
                        isLoading={isTableLoading}
                        striped
                        pagination={{
                            currentPage: currentPage,
                            totalPages: 3,
                            onPageChange: (page) => setCurrentPage(page)
                        }}
                    />
                </CardContent>
            </Card>

            {/* OVERLAYS PORTALS */}

            {/* Modal portal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="SaaS Sandbox Configuration"
                description="Modify client rule sets, API ingress keys, and testing thresholds."
            >
                <div className="space-y-4">
                    <p className="text-slate-400">
                        Adjust config parameters within WayneCorp endpoints. Make sure to back up ledger definitions regularly.
                    </p>
                    <Input label="Ingestion Key Override" placeholder="Enter key hash..." />
                    <Select
                        label="Override Environment"
                        options={[
                            { value: "dev", label: "Development Ingress" },
                            { value: "staging", label: "Staging Pipeline" },
                            { value: "prod", label: "Production Ledger" }
                        ]}
                    />
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                            Save Override
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Drawer portal */}
            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                position="right"
                size="md"
                title="System Operational Audit Logs"
                description="Overview of ledger pipelines and transaction ingest assertions."
            >
                <div className="space-y-6">
                    <Alert variant="info" title="System Checkin Log">
                        Audit task matching index verified successfully.
                    </Alert>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-slate-205">Audit Event Trail</h4>
                        <div className="border border-slate-800 rounded-lg p-3 space-y-2.5 bg-slate-950/40">
                            {[
                                { event: "SYNC_TRANSACTION", time: "12 mins ago", user: "Bruce Wayne" },
                                { event: "RULE_VALIDATED", time: "1 hour ago", user: "Sarah Connor" },
                                { event: "ANOMALY_RESOLVED", time: "3 hours ago", user: "Bruce Wayne" }
                            ].map((evt, idx) => (
                                <div key={idx} className="flex justify-between text-xs py-1.5 border-b border-slate-800 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-semibold text-slate-200">{evt.event}</p>
                                        <p className="text-slate-500 font-medium">By {evt.user}</p>
                                    </div>
                                    <span className="text-slate-450">{evt.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2.5 pt-4">
                        <Button variant="primary" fullWidth onClick={() => setIsDrawerOpen(false)}>
                            Close Audit Panel
                        </Button>
                    </div>
                </div>
            </Drawer>

            {/* Confirm destructive Dialog portal */}
            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmAction}
                variant="danger"
                title="Delete Ledger Record?"
                message="Are you absolutely sure you want to delete this client transaction ledger? All matching anomalies and ingested rules under Sandbox will be purged forever."
                confirmText="Delete Permanently"
                isLoading={isConfirmLoading}
            />
        </div>
    );
}

export default Showcase;