import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import clsx from "clsx";
import { Button, Link } from "@nextui-org/react";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />
            <main className={clsx("bg-slate-50 min-h-screen")}>
                <div
                    className={clsx(
                        "mx-auto max-w-2xl py-32 sm:py-48 lg:py-56"
                    )}
                >
                    <div
                        className={clsx(
                            "hidden sm:mb-8 sm:flex sm:justify-center"
                        )}
                    >
                        <Button variant="bordered">
                            Announcing our next round of funding.
                            <Link href="#" size="sm">
                                Read more
                            </Link>
                        </Button>
                    </div>

                    <div className={clsx("text-center")}>
                        <h1
                            className={clsx(
                                "text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                            )}
                        >
                            Laravel Access Management
                        </h1>
                        <p
                            className={clsx(
                                "mt-6 text-lg leading-8 text-gray-600"
                            )}
                        >
                            Enables administrators to easily manage user roles
                            and permissions, enhancing security and ensuring
                            that only authorized users can access specific
                            features.
                        </p>
                        <div
                            className={clsx(
                                "mt-10 flex items-center justify-center gap-x-6"
                            )}
                        >
                            <Button variant="shadow" color="primary" size="lg">
                                Get started
                            </Button>
                            <Button variant="light" size="lg">
                                Learn more
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
