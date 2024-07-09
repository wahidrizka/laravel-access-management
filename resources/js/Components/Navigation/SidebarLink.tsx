import { InertiaLinkProps, Link } from "@inertiajs/react";
import clsx from "clsx";

interface SidebarLinkProps extends InertiaLinkProps {
    startContent?: React.ReactNode;
    isActive?: boolean;
    children: React.ReactNode;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({
    startContent,
    isActive = false,
    children,
    ...rest
}) => {
    return (
        <Link
            className={clsx(
                "flex gap-x-3 rounded-lg p-2 text-sm font-semibold leading-6",
                "hover:bg-slate-50 hover:text-primary-500",
                isActive ? "bg-slate-50 text-primary-500" : "text-slate-700"
            )}
            {...rest}
        >
            {startContent}
            {children}
        </Link>
    );
};
