import { Image } from "@nextui-org/react";
import clsx from "clsx";
import { SidebarLink } from "./SidebarLink";
import {
    Cog6ToothIcon,
    HomeIcon,
    KeyIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { usePage } from "@inertiajs/react";

interface SidebarNavigationProps {}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({}) => {
    const { url, component } = usePage();
    return (
        <div
            className={clsx(
                "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
            )}
        >
            <div
                className={clsx(
                    "flex flex-grow flex-col gap-y-5 overflow-y-auto border border-slate-200 bg-white px-6 pb-4"
                )}
            >
                <div className={clsx("flex h-16 flex-shrink-0 items-center")}>
                    {/* <Image src="" fallbackSrc="" alt="Laravel Access Management Logo" /> */}
                </div>
                <nav className={clsx("flex flex-1 flex-col")}>
                    <ul
                        role="list"
                        className={clsx("flex flex-1 flex-col gap-y-7")}
                    >
                        <li>
                            <ul role="list" className={clsx("-mx-2")}>
                                <li>
                                    <SidebarLink
                                        href={"#"}
                                        startContent={
                                            <HomeIcon className="size-6" />
                                        }
                                    >
                                        Home
                                    </SidebarLink>
                                </li>
                                <li>
                                    <SidebarLink
                                        isActive={
                                            component === "Roles/Index" ||
                                            url.includes("roles")
                                        }
                                        href={route("roles.index") as string}
                                        startContent={
                                            <Cog6ToothIcon className="size-6" />
                                        }
                                    >
                                        Roles
                                    </SidebarLink>
                                </li>
                                <li>
                                    <SidebarLink
                                        isActive={
                                            component === "Permissions/Index" ||
                                            url.includes("permissions")
                                        }
                                        href={
                                            route("permissions.index") as string
                                        }
                                        startContent={
                                            <KeyIcon className="size-6" />
                                        }
                                    >
                                        Permissions
                                    </SidebarLink>
                                </li>
                                <li>
                                    <SidebarLink
                                        isActive={
                                            component === "Users/Index" ||
                                            url.includes("users")
                                        }
                                        href={route("users.index") as string}
                                        startContent={
                                            <UsersIcon className="size-6" />
                                        }
                                    >
                                        Users
                                    </SidebarLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
