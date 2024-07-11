import { Layout } from "@/Layouts";
import { RolesForUsers, RoleTypes } from "@/types";
import {
    ChevronLeftIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/20/solid";
import { Head, useForm } from "@inertiajs/react";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Input,
    Select,
    SelectItem,
    Button,
    Link,
} from "@nextui-org/react";
import clsx from "clsx";
import { useMemo, useState } from "react";

export default function CreateUser({ roles }: { roles: RolesForUsers }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        name: "",
        email: "",
        roles: "",
        password: "",
    });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearErrors("name");
        setData("name", e.target.value);
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearErrors("email");
        setData("email", e.target.value);
    };
    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        clearErrors("roles");
        setData("roles", e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearErrors("password");
        setData("password", e.target.value);
    };

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const validateEmail = (email: string) =>
        email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const validatePassword = (password: string) =>
        password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("users.store"));
    };

    return (
        <Layout>
            <Head title="Create User" />
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
                                Create new user
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
                                    <Select
                                        labelPlacement="outside"
                                        label="Role"
                                        placeholder="Select an role"
                                        variant="bordered"
                                        selectedKeys={[data.roles]}
                                        onChange={handleRoleChange}
                                        isInvalid={!!errors.roles}
                                        errorMessage={errors.roles}
                                    >
                                        {Object.keys(roles).map((key) => (
                                            <SelectItem
                                                key={key}
                                                value={roles[key]}
                                            >
                                                {roles[key]}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className={clsx("sm:col-span-4")}>
                                    <Input
                                        isRequired
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
                            <Button type="submit" color="primary">
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
