import { Layout } from "@/Layouts";
import { capitalizeFirstLetter } from "@/libs/utils";
import { PermissionTypes, RoleHasPermissions, RoleTypes } from "@/types";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    BreadcrumbItem,
    Breadcrumbs,
    Chip,
    Select,
    SelectItem,
    Selection,
    Button,
} from "@nextui-org/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function ShowRole({
    role,
    permissions,
    roleHasPermissions,
}: {
    role: RoleTypes;
    permissions: PermissionTypes[];
    roleHasPermissions: RoleHasPermissions[];
}) {
    const initialSelectedPermissions = new Set(
        roleHasPermissions.map((rp) => rp.permission_name)
    );
    const [selectedPermissions, setSelectedPermissions] = useState<Selection>(
        new Set(initialSelectedPermissions)
    );
    const { setData, put, processing, errors, clearErrors } = useForm({
        permissions: [] as string[],
    });

    useEffect(() => {
        setData("permissions", Array.from(selectedPermissions as string));
    }, [selectedPermissions]);

    const handleClose = (permissionToRemove: string) => {
        setSelectedPermissions((prev) => {
            const newSelectedPermissions = new Set(prev);
            newSelectedPermissions.delete(permissionToRemove);
            return newSelectedPermissions;
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route("roles.permissions.update", role.id));
    };

    return (
        <Layout>
            <Head title={`${capitalizeFirstLetter(role.name)}`} />
            <div className={clsx("mx-auto max-w-7xl py-6 px-6 lg:px-8")}>
                <div></div>

                <div>
                    <div>
                        <Breadcrumbs
                            aria-label="Back"
                            className={clsx("sm:hidden")}
                        >
                            <BreadcrumbItem
                                href={route("roles.index") as string}
                                startContent={
                                    <ChevronLeftIcon
                                        className={clsx("size-4")}
                                    />
                                }
                            >
                                Back
                            </BreadcrumbItem>
                        </Breadcrumbs>

                        <Breadcrumbs
                            aria-label="Breadcrumb"
                            className={clsx("hidden sm:flex")}
                        >
                            <BreadcrumbItem
                                href={route("roles.index") as string}
                            >
                                Roles
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                {capitalizeFirstLetter(role.name)}
                            </BreadcrumbItem>
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
                                {capitalizeFirstLetter(role.name)}
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
                    <div className={clsx("px-4 py-4 sm:p-8")}>
                        <Select
                            classNames={{
                                trigger: "py-2 px-4",
                            }}
                            label={`Permissions for ${capitalizeFirstLetter(
                                role.name
                            )}`}
                            labelPlacement="outside"
                            selectionMode="multiple"
                            isMultiline
                            placeholder="Select permissions"
                            selectedKeys={selectedPermissions}
                            onSelectionChange={setSelectedPermissions}
                            renderValue={() => {
                                return (
                                    <div
                                        className={clsx("flex flex-wrap gap-2")}
                                    >
                                        {Array.from(selectedPermissions).map(
                                            (item, index) => (
                                                <Chip
                                                    key={index}
                                                    variant="bordered"
                                                    color="success"
                                                    onClose={() =>
                                                        handleClose(
                                                            item as string
                                                        )
                                                    }
                                                >
                                                    {item}
                                                </Chip>
                                            )
                                        )}
                                    </div>
                                );
                            }}
                        >
                            {permissions.map((permission) => (
                                <SelectItem key={permission.name}>
                                    {permission.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div
                        className={clsx(
                            "flex items-center justify-end gap-x-6 px-4 pb-4 sm:px-8"
                        )}
                    >
                        <Button
                            type="submit"
                            color="primary"
                            isLoading={processing}
                        >
                            Update permissions
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
