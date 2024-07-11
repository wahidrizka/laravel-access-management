import clsx from "clsx";
import React from "react";
import { FileIcon } from "./icons";
import { Button } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/react";
interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    href?: string;
    buttonText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    className,
    title,
    description,
    href,
    buttonText,
    ...rest
}: EmptyStateProps) => {
    return (
        <div className={clsx("text-center", className)} {...rest}>
            <FileIcon className={clsx("mx-auto size-28")} />
            <h3 className={clsx("mt-2 text-sm font-semibold text-slate-900")}>
                {title}
            </h3>
            {description && (
                <p className={clsx("mt-1 text-sm text-slate-500")}>
                    {description}
                </p>
            )}
            <div className={clsx("mt-6")}>
                <Button
                    as={Link}
                    href={href || "#"}
                    color="primary"
                    startContent={
                        <PlusIcon className={clsx("size-5 !-ml-0.5")} />
                    }
                >
                    {buttonText || "Add New"}
                </Button>
            </div>
        </div>
    );
};
