import { XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React, { useState } from "react";

interface AlertProps {
    className?: string;
    isShow?: boolean;
    type?: "success" | "error" | "warning";
    message: string;
    startContent?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
    isShow = false,
    className,
    message,
    type = "success",
    startContent,
}) => {
    const [show, setShow] = useState(isShow);
    const bgClasses = {
        success: "bg-green-100",
        error: "bg-red-100",
        warning: "bg-yellow-100",
    };

    const colorClasses = {
        success: "text-green-800",
        error: "text-red-800",
        warning: "text-yellow-800",
    };

    const colorIconClasses = {
        success: "text-green-400",
        error: "text-red-400",
        warning: "text-yellow-400",
    };

    const dismiss = () => {
        setShow(false);
    };

    if (show) {
        return (
            <div className={clsx("rounded-lg p-4", bgClasses[type], className)}>
                <div className={clsx("flex items-center")}>
                    {startContent && (
                        <div
                            className={clsx(
                                "flex-shrink-0",
                                colorIconClasses[type]
                            )}
                        >
                            {startContent}
                        </div>
                    )}
                    <div className={clsx("ml-3")}>
                        <p
                            className={clsx(
                                "text-sm font-medium",
                                colorClasses[type]
                            )}
                        >
                            {message}
                        </p>
                    </div>

                    <div className={clsx("ml-auto p-3")}>
                        <div className={clsx("-mx-1.5 -my-1.5")}>
                            <button
                                className={clsx(
                                    "inline-flex rounded-md p-1.5",
                                    colorIconClasses[type]
                                )}
                                onClick={dismiss}
                            >
                                <span className={clsx("sr-only")}>Dismiss</span>
                                <XMarkIcon className={clsx("size-5")} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
