import { Layout } from "@/Layouts";
import { PermissionTypes, RoleTypes } from "@/types";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    BreadcrumbItem,
    Breadcrumbs,
    Button,
    Chip,
    Input,
    Select,
    Selection,
    SelectItem,
} from "@nextui-org/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function EditRole({
    role,
    permissions,
    hasPermissions,
}: {
    role: RoleTypes;
    hasPermissions: PermissionTypes[];
    permissions: PermissionTypes[];
}) {
    const initialSelectedPermission = new Set(
        hasPermissions.map((hp) => hp.name)
    );
    const [selectedPermission, setSelectedPermission] = useState<Selection>(
        new Set(initialSelectedPermission)
    );
    const { data, setData, put, processing, errors, clearErrors } = useForm({
        name: role.name,
        permissions: [] as string[],
    });

    useEffect(() => {
        setData("permissions", Array.from(selectedPermission as string));
    }, [selectedPermission]);

    const handleRemovePermission = (permissionToRemove: string) => {
        setSelectedPermission((prev) => {
            const newSelectedPermission = new Set(prev);
            newSelectedPermission.delete(permissionToRemove);
            return newSelectedPermission;
        });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearErrors("name");
        setData("name", e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route("roles.update", role.id));
    };

    return (
        <Layout>
            <Head title="Edit role" />
            <div className={clsx("mx-auto max-w-7xl py-6 sm:px-6 lg:px-8")}>
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

                        <Breadcrumbs aria-label="Breadcrumb">
                            <BreadcrumbItem
                                href={route("roles.index") as string}
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
                                Edit role
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
                            <div className={clsx("sm:col-span-3")}>
                                <Input
                                    className={clsx("sm:col-span-4")}
                                    type="text"
                                    variant="bordered"
                                    label="Role name"
                                    value={data.name}
                                    onChange={handleNameChange}
                                    isInvalid={!!errors.name}
                                    errorMessage={errors.name}
                                />
                            </div>

                            <div className={clsx("sm:col-span-4")}>
                                <h3
                                    className={clsx(
                                        "mb-2 text-foreground-700 text-small"
                                    )}
                                >
                                    Permission for role
                                </h3>
                                <Select
                                    classNames={{
                                        trigger: "py-2 px-4",
                                    }}
                                    aria-labelledby="Permission for role"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    selectionMode="multiple"
                                    isMultiline
                                    placeholder="Select an permission"
                                    selectedKeys={selectedPermission}
                                    onSelectionChange={setSelectedPermission}
                                    isInvalid={!!errors.permissions}
                                    errorMessage={errors.permissions}
                                    renderValue={() => {
                                        return (
                                            <div
                                                className={clsx(
                                                    "flex flex-wrap gap-2"
                                                )}
                                            >
                                                {Array.from(
                                                    selectedPermission
                                                ).map((item, index) => (
                                                    <Chip
                                                        key={index}
                                                        variant="bordered"
                                                        color="secondary"
                                                        onClose={() =>
                                                            handleRemovePermission(
                                                                item as string
                                                            )
                                                        }
                                                    >
                                                        {item}
                                                    </Chip>
                                                ))}
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
                        </div>
                    </div>
                    <div
                        className={clsx(
                            "flex items-center justify-end gap-x-6 border-t border-slate-900/10 px-4 py-4 sm:px-8"
                        )}
                    >
                        <Button
                            as={Link}
                            href={route("roles.index") as string}
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
