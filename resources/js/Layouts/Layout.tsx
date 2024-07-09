import { SidebarNavigation } from "@/Components/Navigation";
import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={clsx("bg-white")}>
            <div>
                <SidebarNavigation />
                <div className={clsx("lg:pl-72")}>
                    <main className={clsx("py-10")}>{children}</main>
                </div>
            </div>
        </div>
    );
};
