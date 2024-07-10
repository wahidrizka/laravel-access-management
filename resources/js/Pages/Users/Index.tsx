import { Layout } from "@/Layouts";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@nextui-org/react";
import clsx from "clsx";

export default function Users() {
    return (
        <Layout>
            <Head title="Users" />
            <div className={clsx("p-8 bg-white")}>
                <div className={clsx("px-4 sm:px-6 lg:px-8")}>
                    <div className={clsx("sm:flex sm:items-center")}>
                        <div className={clsx("flex-auto")}>
                            <h1
                                className={clsx(
                                    "text-base font-semibold leading-6 text-slate-900"
                                )}
                            >
                                Users
                            </h1>
                            <p className={clsx("mt-2 text-sm text-slate-700")}>
                                A list of all the users in your account
                                including their name, title, email and role.
                            </p>
                        </div>

                        <div
                            className={clsx(
                                "mt-4 sm:ml-16 sm:mt-0 sm:flex-none"
                            )}
                        >
                            <Button
                                as={Link}
                                href={route("users.create") as string}
                                color="primary"
                            >
                                Add user
                            </Button>
                        </div>
                    </div>

                    <div className={clsx("mt-8 flow-root")}>
                        <div className={clsx("mx-4 -my-2 sm:my-6 lg:-my-8")}>
                            <div
                                className={clsx(
                                    "inline-block min-w-full py-2 align-middle"
                                )}
                            >
                                <table
                                    className={clsx(
                                        "min-w-full border-separate border-spacing-0"
                                    )}
                                >
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className={clsx(
                                                    "sticky top-0 z-10 border-b border-slate-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                                )}
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className={clsx(
                                                    "sticky top-0 z-10 hidden border-b border-slate-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter sm:table-cell"
                                                )}
                                            >
                                                Title
                                            </th>
                                            <th
                                                scope="col"
                                                className={clsx(
                                                    "sticky top-0 z-10 hidden border-b border-slate-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter lg:table-cell"
                                                )}
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className={clsx(
                                                    "sticky top-0 z-10 border-b border-slate-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter lg:table-cell"
                                                )}
                                            >
                                                Role
                                            </th>
                                            <th
                                                scope="col"
                                                className={clsx(
                                                    "sticky top-0 z-10 border-b border-slate-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-10"
                                                )}
                                            >
                                                <span
                                                    className={clsx("sr-only")}
                                                >
                                                    Edit
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td
                                                className={clsx(
                                                    "whitespace-nowrap border-b border-slate-200 py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6 lg:pl-8"
                                                )}
                                            >
                                                Wahid Rizka Fathurrohman
                                            </td>
                                            <td
                                                className={clsx(
                                                    "hidden whitespace-nowrap border-b border-slate-300 px-3 py-4 text-sm text-slate-500 sm:table-cell"
                                                )}
                                            >
                                                Fullstack Developer
                                            </td>
                                            <td
                                                className={clsx(
                                                    "hidden whitespace-nowrap border-b border-slate-300 px-3 py-4 text-sm text-slate-500 sm:table-cell"
                                                )}
                                            >
                                                Email
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
