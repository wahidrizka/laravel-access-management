import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Head, Link, useForm } from "@inertiajs/react";
import { BreadcrumbItem, Breadcrumbs, Button, Input } from "@nextui-org/react";
import clsx from "clsx";
import { useState } from "react";

export default function CreatePermission() {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
    });
    const [nameError, setNameError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("permissions.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (error) => {
                console.error(error);
                setNameError(error.name);
            },
        });
    };
    return (
        <>
            <Head title="Permissions" />
            <main className={clsx("bg-slate-50 p-8 min-h-screen")}>
                <div className={clsx("mx-auto max-w-7xl")}>
                    <div></div>

                    <div>
                        <div>
                            <Breadcrumbs
                                aria-label="Back"
                                className={clsx("sm:hidden")}
                            >
                                <BreadcrumbItem
                                    startContent={
                                        <ChevronLeftIcon
                                            className={clsx("size-4")}
                                        />
                                    }
                                >
                                    <Link
                                        href={
                                            route("permissions.index") as string
                                        }
                                    >
                                        Back
                                    </Link>
                                </BreadcrumbItem>
                            </Breadcrumbs>

                            <Breadcrumbs aria-label="Breadcrumb">
                                <BreadcrumbItem>
                                    <Link
                                        href={
                                            route("permissions.index") as string
                                        }
                                    >
                                        Home
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>Create</BreadcrumbItem>
                            </Breadcrumbs>
                        </div>

                        <div
                            className={clsx(
                                "mt-2 md:flex md:items-center md:justify-between"
                            )}
                        >
                            <div className={clsx("min-w-0 flex-1")}>
                                <h2
                                    className={clsx(
                                        "text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight"
                                    )}
                                >
                                    Create new permission
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className={clsx("mt-6 bg-white shadow sm:rounded-lg")}>
                        <div className={clsx("px-4 py-5 sm:p-6")}>
                            <h3
                                className={clsx(
                                    "text-base font-semibold leading-6 text-slate-900"
                                )}
                            >
                                New permission
                            </h3>
                            <div
                                className={clsx(
                                    "mt-2 max-w-xl text-sm text-slate-500"
                                )}
                            >
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit quam corrupti consectetur.
                                </p>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className={clsx(
                                    "mt-5 sm:flex sm:items-center",
                                    nameError && "sm:!items-baseline"
                                )}
                            >
                                <div className={clsx("w-full sm:max-w-80")}>
                                    <Input
                                        size="sm"
                                        type="text"
                                        variant="bordered"
                                        radius="lg"
                                        label="Permission Name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    color="primary"
                                    className={clsx(
                                        "mt-3 sm:ml-3 sm:mt-0 sm:w-auto"
                                    )}
                                    isLoading={processing}
                                >
                                    Save
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
