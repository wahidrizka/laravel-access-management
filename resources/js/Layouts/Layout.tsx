import { DashboardHeader, SidebarNavigation } from "@/Components/Navigation";
import { UserTypes } from "@/types";
import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    user?: UserTypes;
}

export const Layout: React.FC<LayoutProps> = ({ children, user }) => {
    return (
        <div className={clsx("bg-white")}>
            <div>
                <SidebarNavigation />
                <div className={clsx("lg:pl-72")}>
                    <DashboardHeader user={user} />
                    <main className={clsx("py-10")}>{children}</main>
                </div>
            </div>
        </div>
    );
};
