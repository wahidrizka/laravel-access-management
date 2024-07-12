import { Layout } from "@/Layouts";
import { validateEmail, validatePassword } from "@/libs/utils";
import { RolesForUsers, RoleTypes, UserHasRoles, UserTypes } from "@/types";
import {
    ChevronLeftIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/20/solid";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Input,
    Select,
    SelectItem,
    Button,
    Chip,
    Selection,
} from "@nextui-org/react";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

export default function Edit({
    user,
    roles,
    userHasRoles,
}: {
    user: UserTypes;
    roles: RoleTypes[];
    userHasRoles: UserHasRoles[];
}) {
    const initialSelectedRoles = new Set(userHasRoles.map((ur) => ur.name));
    const [selectedRoles, setSelectedRoles] = useState<Selection>(
        new Set(initialSelectedRoles)
    );
    const { data, setData, put, processing, errors, clearErrors } = useForm({
        name: user.name,
        email: user.email,
        password: "",
        roles: [] as string[],
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearErrors("name");
        setData("name", e.target.value);
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearErrors("email");
        setData("email", e.target.value);
    };
    useEffect(() => {
        setData("roles", Array.from(selectedRoles as string));
    }, [selectedRoles]);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearErrors("password");
        setData("password", e.target.value);
    };

    const isInvalidEmail = useMemo(() => {
        if (data.email === "") return false;
        return validateEmail(data.email) ? false : true;
    }, [data.email]);
    const isInvalidPassword = useMemo(() => {
        if (data.password === "") return false;
        return validatePassword(data.password) ? false : true;
    }, [data.password]);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const handleRemoveRole = (roleToRemove: string) => {
        setSelectedRoles((prev) => {
            const newSelectedRoles = new Set(prev);
            newSelectedRoles.delete(roleToRemove);
            return newSelectedRoles;
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route("users.update", user.id));
    };

    return (
        <Layout>
            <Head title={`Edit ${user.name}`} />
            <div className={clsx("mx-auto max-w-7xl py-6 px-6 lg:px-8")}>
                <div></div>

                <div>
                    <div>
                        <Breadcrumbs
                            aria-label="Back"
                            className={clsx("sm:hidden")}
                        >
                            <BreadcrumbItem
                                href={route("users.index") as string}
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
                                href={route("users.index") as string}
                            >
                                Users
                            </BreadcrumbItem>
                            <BreadcrumbItem>{user.name}</BreadcrumbItem>
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
                                Edit user
                            </h2>
                        </div>
                    </div>
                </div>

                <div className={clsx("pt-10")}>
                    <form
                        onSubmit={handleSubmit}
                        className={clsx(
                            "bg-white shadow-sm ring-1 ring-slate-900/5 sm:rounded-xl"
                        )}
                    >
                        <div className={clsx("px-4 py-6 sm:p-8")}>
                            <div
                                className={clsx(
                                    "grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                                )}
                            >
                                <div className={clsx("sm:col-span-5")}>
                                    <Input
                                        isRequired
                                        type="text"
                                        variant="bordered"
                                        label="Name"
                                        labelPlacement="outside"
                                        placeholder="Enter your name"
                                        value={data.name}
                                        onChange={handleNameChange}
                                        isInvalid={!!errors.name}
                                        errorMessage={errors.name}
                                    />
                                </div>
                                <div className={clsx("sm:col-span-5")}>
                                    <Input
                                        isRequired
                                        type="email"
                                        variant="bordered"
                                        label="Email"
                                        labelPlacement="outside"
                                        placeholder="Enter your email"
                                        value={data.email}
                                        onChange={handleEmailChange}
                                        isInvalid={
                                            isInvalidEmail || !!errors.email
                                        }
                                        errorMessage={
                                            errors.email ||
                                            "Please enter a valid email"
                                        }
                                    />
                                </div>

                                <div className={clsx("sm:col-span-3")}>
                                    <h3
                                        className={clsx(
                                            "mb-2 text-foreground-700 text-small"
                                        )}
                                    >
                                        Roles for user
                                    </h3>
                                    <Select
                                        classNames={{
                                            trigger: "py-2 px-4",
                                        }}
                                        aria-labelledby="Roles for user"
                                        variant="bordered"
                                        labelPlacement="outside"
                                        selectionMode="multiple"
                                        isMultiline
                                        placeholder="Select an role"
                                        selectedKeys={selectedRoles}
                                        onSelectionChange={setSelectedRoles}
                                        isInvalid={!!errors.roles}
                                        errorMessage={errors.roles}
                                        renderValue={() => {
                                            return (
                                                <div
                                                    className={clsx(
                                                        "flex flex-wrap gap-2"
                                                    )}
                                                >
                                                    {Array.from(
                                                        selectedRoles
                                                    ).map((item, index) => (
                                                        <Chip
                                                            key={index}
                                                            variant="bordered"
                                                            color="secondary"
                                                            onClose={() =>
                                                                handleRemoveRole(
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
                                        {roles.map((role) => (
                                            <SelectItem
                                                key={role.name}
                                                value={role.name}
                                            >
                                                {role.name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className={clsx("sm:col-span-4")}>
                                    <Input
                                        variant="bordered"
                                        label="Password"
                                        labelPlacement="outside"
                                        placeholder="Enter your password"
                                        value={data.password}
                                        onChange={handlePasswordChange}
                                        isInvalid={
                                            isInvalidPassword ||
                                            !!errors.password
                                        }
                                        errorMessage={
                                            errors.password ||
                                            "Password must be at least 8 characters long and include at least one letter and one number"
                                        }
                                        endContent={
                                            <button
                                                type="button"
                                                className={clsx(
                                                    "focus:outline-none"
                                                )}
                                                onClick={
                                                    togglePasswordVisibility
                                                }
                                            >
                                                {isPasswordVisible ? (
                                                    <EyeSlashIcon className="size-5 text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeIcon className="size-5 text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        type={
                                            isPasswordVisible
                                                ? "text"
                                                : "password"
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            className={clsx(
                                "flex items-center justify-end gap-x-6 border-t border-slate-900/5 px-4 py-4 sm:px-8"
                            )}
                        >
                            <Button
                                as={Link}
                                href={route("users.index") as string}
                                variant="light"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                isLoading={processing}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
