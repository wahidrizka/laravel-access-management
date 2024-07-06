import { Head, Link } from "@inertiajs/react";
import { Button } from "@nextui-org/react";
import clsx from "clsx";

export default function Permission() {
    return (
        <>
            <Head title="Permissions" />
            <main className={clsx("bg-slate-100")}>
                <div className={clsx("mx-auto max-w-7xl py-6 sm:px-6 lg:px-8")}>
                    <div className={clsx("mx-auto max-w-none")}>
                        <div
                            className={clsx(
                                "overflow-hidden bg-white sm:rounded-lg sm:shadow"
                            )}
                        >
                            <div
                                className={clsx(
                                    "border-b border-slate-200 bg-white px-4 sm:py-6"
                                )}
                            >
                                <div
                                    className={clsx(
                                        "-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap"
                                    )}
                                >
                                    <div className={clsx("ml-4 mt-4")}>
                                        <h3
                                            className={clsx(
                                                "text-base font-semibold leading-6 text-slate-900"
                                            )}
                                        >
                                            Permissions
                                        </h3>
                                        <p
                                            className={clsx(
                                                "mt-1 text-sm text-slate-500"
                                            )}
                                        >
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit quam
                                            corrupti consectetur.
                                        </p>
                                    </div>

                                    <div
                                        className={clsx(
                                            "ml-4 mt-4 flex-shrink-0"
                                        )}
                                    >
                                        <Button color="primary">
                                            <Link
                                                href={
                                                    route(
                                                        "permissions.create"
                                                    ) as string
                                                }
                                            >
                                                Create new permission
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
