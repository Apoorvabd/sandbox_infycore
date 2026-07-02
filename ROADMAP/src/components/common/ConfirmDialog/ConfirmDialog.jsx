import React from "react";
import Modal from "../Modal";
import Button from "../Button";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "../../../utils/cn";

const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to perform this action? This step might be irreversible.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "primary", // "primary" | "danger" | "success"
    isLoading = false,
}) => {
    const handleConfirm = async (e) => {
        e.preventDefault();
        if (onConfirm) {
            await onConfirm();
        }
    };

    const colors = {
        primary: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        danger: "text-red-500 bg-red-500/10 border-red-500/20",
        success: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    };

    const statusIcons = {
        primary: AlertCircle,
        danger: AlertTriangle,
        success: AlertCircle,
    };

    const Icon = statusIcons[variant];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="sm"
            closeOnOverlayClick={!isLoading}
        >
            <div className="flex flex-col gap-4 text-center items-center">
                {/* Visual indicator icon */}
                <div className={cn("p-3 rounded-full border mb-1", colors[variant])}>
                    <Icon className="h-6 w-6" />
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                    <h3 className="text-lg font-semibold text-slate-100 leading-tight">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-400 font-normal leading-normal px-2">
                        {message}
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full mt-4">
                    <Button
                        variant="outline"
                        fullWidth
                        onClick={onClose}
                        disabled={isLoading}
                        className="border-slate-800 hover:bg-slate-800 text-slate-300"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant === "danger" ? "danger" : variant === "success" ? "success" : "primary"}
                        fullWidth
                        loading={isLoading}
                        onClick={handleConfirm}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;
