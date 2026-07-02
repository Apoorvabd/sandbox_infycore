import clsx from "clsx";

export const buttonVariants = ({
    variant = "primary",
    size = "md",
    fullWidth = false,
}) => {
    const base = clsx(
        "inline-flex items-center justify-center gap-2",
        "rounded-lg font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:ring-offset-2 focus:ring-offset-sky-50",
        "disabled:opacity-50 disabled:pointer-events-none",
        "active:scale-[0.98] select-none cursor-pointer"
    );

    const variants = {
        primary: "bg-sky-500 text-white hover:bg-sky-600 border border-transparent shadow-[0_1px_2px_rgba(14,165,233,0.2)]",
        secondary: "bg-sky-50 text-slate-800 hover:bg-sky-100 border border-sky-200 shadow-sm",
        outline: "border border-sky-200 bg-transparent text-slate-700 hover:bg-sky-50",
        danger: "bg-red-600 text-white hover:bg-red-500 border border-transparent shadow-[0_1px_2px_rgba(220,38,38,0.2)]",
        success: "bg-emerald-600 text-white hover:bg-emerald-500 border border-transparent shadow-[0_1px_2px_rgba(16,185,129,0.2)]",
        ghost: "bg-transparent text-slate-600 hover:bg-sky-50 hover:text-slate-900",
    };

    const sizes = {
        sm: "h-9 px-3 text-xs gap-1.5",
        md: "h-10 px-4 text-sm gap-2",
        lg: "h-12 px-6 text-base gap-2.5",
    };

    return clsx(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full"
    );
};
