import { Layout } from "@/Layouts";
import { PageProps, PermissionTypes } from "@/types";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Head, Link, useForm } from "@inertiajs/react";
import { BreadcrumbItem, Breadcrumbs, Button, Input } from "@nextui-org/react";
import clsx from "clsx";

export default function EditPermission({
    auth,
    permission,
}: PageProps<{ permission: PermissionTypes }>) {
    const { data, setData, put, processing, errors, clearErrors } = useForm({
        name: permission.name,
    });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearErrors("name");
        setData("name", e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route("permissions.update", permission.id));
    };

    return (
        <Layout user={auth.user}>
            <Head title="Edit permission" />
            <div className={clsx("mx-auto max-w-7xl py-6 sm:px-6 lg:px-8")}>
                <div></div>

                <div>
                    <div>
                        <Breadcrumbs
                            aria-label="Back"
                            className={clsx("sm:hidden")}
                        >
                            <BreadcrumbItem
                                href={route("permissions.index") as string}
                                startContent={
                                    <ChevronLeftIcon
                                        className={clsx("size-4")}
                                    />
                                }
                            >
                                Back
                            </BreadcrumbItem>
                        </Breadcrumbs>

                        <Breadcrumbs aria-label="Breadcrumb">
                            <BreadcrumbItem
                                href={route("permissions.index") as string}
                            >
                                Home
                            </BreadcrumbItem>
                            <BreadcrumbItem>Edit</BreadcrumbItem>
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
                                Edit permission
                            </h2>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className={clsx(
                        "mt-6 bg-white shadow-sm ring-1 ring-slate-900/5 sm:rounded-xl"
                    )}
                >
                    <div className={clsx("px-4 py-6 sm:p-8")}>
                        <div
                            className={clsx(
                                "grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                            )}
                        >
                            <Input
                                className={clsx("sm:col-span-4")}
                                type="text"
                                variant="bordered"
                                label="Permission name"
                                value={data.name}
                                onChange={handleNameChange}
                                isInvalid={!!errors.name}
                                errorMessage={errors.name}
                            />
                        </div>
                    </div>
                    <div
                        className={clsx(
                            "flex items-center justify-end gap-x-6 border-t border-slate-900/10 px-4 py-4 sm:px-8"
                        )}
                    >
                        <Button
                            as={Link}
                            href={route("permissions.index") as string}
                            variant="light"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            isLoading={processing}
                        >
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
