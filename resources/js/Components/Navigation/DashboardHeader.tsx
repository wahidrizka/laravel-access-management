import { getFirstWord } from "@/libs/utils";
import { UserTypes } from "@/types";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
    Bars3Icon,
    BellIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
} from "@nextui-org/react";
import clsx from "clsx";

interface DashboardHeaderProps {
    user?: UserTypes;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
    return (
        <div
            className={clsx(
                "sticky top-0 z-40 flex h-16 flex-shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
            )}
        >
            <button
                type="button"
                className={clsx("-m-2.5 p-2.5 text-slate-700 lg:hidden")}
            >
                <span className={clsx("sr-only")}>Open sidebar</span>
                <Bars3Icon className={clsx("size-6")} />
            </button>

            <div
                aria-hidden
                className={clsx("h-6 w-px bg-slate-900/10 lg:hidden")}
            />

            <div className={clsx("flex flex-1 gap-x-4 self-stretch")}>
                <form className={clsx("relative flex flex-1")}>
                    <label htmlFor="search-field" className={clsx("sr-only")}>
                        Search
                    </label>
                    <MagnifyingGlassIcon
                        className={clsx(
                            "pointer-events-none absolute inset-y-0 left-0 h-full w-6 text-slate-400"
                        )}
                    />
                    <input
                        id="search-field"
                        name="search"
                        type="search"
                        placeholder="Search..."
                        className={clsx(
                            "pl-8 pr-0 text-slate-900 sm:text-sm focus:outline-none"
                        )}
                    />
                </form>

                <div className={clsx("flex items-center gap-x-4")}>
                    <button
                        type="button"
                        className={clsx("-m-2.5 p-2.5 text-slate-400")}
                    >
                        <span className={clsx("sr-only")}>
                            View notifications
                        </span>
                        <BellIcon className={clsx("size-6")} />
                    </button>

                    <div
                        className={clsx(
                            "hidden lg:block lg:h-6 lg:w-px lg:bg-slate-900/10"
                        )}
                    />
                    <Dropdown>
                        <DropdownTrigger className={clsx("relative")}>
                            <button
                                className={clsx(
                                    "-m-1.5 flex items-center p-1.5 focus:outline-none"
                                )}
                            >
                                <span className={clsx("sr-only")}>
                                    Open user menu
                                </span>
                                <Image
                                    src="/avatar.png"
                                    alt=""
                                    className={clsx(
                                        "size-8 rounded-full bg-white"
                                    )}
                                />
                                <span
                                    className={clsx(
                                        "hidden lg:flex lg:items-center"
                                    )}
                                >
                                    <span
                                        aria-hidden
                                        className={clsx(
                                            "ml-4 text-sm font-semibold leading-6 text-slate-900 truncate"
                                        )}
                                    >
                                        {getFirstWord(user?.name || "")}
                                    </span>
                                    <ChevronDownIcon
                                        className={clsx(
                                            "ml-2 size-5 text-slate-400"
                                        )}
                                    />
                                </span>
                            </button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="User menu">
                            <DropdownItem
                                key="profile"
                                as={Link}
                                href={route("profile.edit") as string}
                            >
                                Profile
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                as={Link}
                                href={route("logout") as string}
                                className={clsx("text-danger")}
                                color="danger"
                            >
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};
