import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import Card from "../Card";
import Skeleton from "../Skeleton";
import { cn } from "../../../utils/cn";
import { Wallet } from "lucide-react";


const StatCard = ({
    title,
    value,
    icon: Icon,
    trendVal,
    trendDirection = "up", // "up" | "down"
    loading = false,
    className = "",
    ...props
}) => {
    if (loading) {
        return (
            <Card className={cn("p-6 flex flex-col gap-4", className)} {...props}>
                <div className="flex items-center justify-between">
                    <Skeleton variant="line" width="60%" height="1rem" />
                    <Skeleton variant="circle" width="2rem" height="2rem" />
                </div>
                <div className="flex flex-col gap-2">
                    <Skeleton variant="line" width="40%" height="2rem" />
                    <Skeleton variant="line" width="30%" height="1rem" />
                </div>
            </Card>
        );
    }

    const isTrendUp = trendDirection === "up";

    return (
        <Card hoverable className={cn("p-6 flex flex-col justify-between gap-4", className)} {...props}>
            <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-sky-500 select-none uppercase tracking-wider">
                    {title}
                </span>
                {Icon && (
                    <div className="p-2 rounded-lg bg-sky-50 border border-sky-200 text-sky-600">
                        <Wallet className="h-5 w-5 shrink-0" />
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1 mt-1">
                <span className="text-2xl font-bold text-slate-900 tracking-tight leading-none">
                    {value}
                </span>

                {trendVal && (
                    <div className="flex items-center gap-1.5 mt-2">
                        <span
                            className={cn(
                                "inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full border",
                                isTrendUp
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                            )}
                        >
                            {isTrendUp ? (
                                <TrendingUp className="h-3 w-3 shrink-0" />
                            ) : (
                                <TrendingDown className="h-3 w-3 shrink-0" />
                            )}
                            {trendVal}
                        </span>
                        <span className="text-[11px] text-slate-500 select-none">vs last period</span>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default StatCard;
export { StatCard };
