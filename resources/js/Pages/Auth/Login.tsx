import { useEffect, FormEventHandler, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import clsx from "clsx";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { GoogleIcon } from "@/Components/icons/GoogleIcon";
import { GitHubIcon } from "@/Components/icons/GitHubIcon";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [isRemember, setIsRemember] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: isRemember,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Sign in" />
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <div
                className={clsx(
                    "bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12"
                )}
            >
                <form className={clsx("space-y-14")} onSubmit={submit}>
                    <Input
                        type="email"
                        size="lg"
                        variant="bordered"
                        label="Email"
                        labelPlacement="outside"
                        placeholder="Enter your email"
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <Input
                        type="password"
                        size="lg"
                        variant="bordered"
                        label="Password"
                        labelPlacement="outside"
                        placeholder="Enter your password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <div
                        className={clsx(
                            "flex items-center justify-between !mt-6"
                        )}
                    >
                        <div className={clsx("flex items-center")}>
                            <Checkbox
                                isSelected={data.remember}
                                onValueChange={setIsRemember}
                            >
                                Remember me
                            </Checkbox>
                        </div>
                        {canResetPassword && (
                            <div>
                                <Link
                                    href={route("password.request") as string}
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className={clsx("!mt-6")}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="shadow"
                            color="primary"
                            size="lg"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>

                {/* <div>
                    <div className={clsx("relative mt-10")}>
                        <div
                            aria-hidden
                            className={clsx(
                                "absolute inset-0 flex items-center"
                            )}
                        >
                            <div
                                className={clsx(
                                    "w-full border-t border-slate-200"
                                )}
                            />
                        </div>

                        <div
                            className={clsx(
                                "relative flex justify-center text-sm font-medium leading-6"
                            )}
                        >
                            <span
                                className={clsx("bg-white px-6 text-slate-900")}
                            >
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className={clsx("mt-6 grid grid-cols-2 gap-4")}>
                        <Button
                            variant="bordered"
                            startContent={
                                <GoogleIcon className={clsx("w-5 h-5")} />
                            }
                        >
                            Google
                        </Button>
                        <Button
                            variant="bordered"
                            startContent={
                                <GitHubIcon className={clsx("w-5 h-5")} />
                            }
                        >
                            GitHub
                        </Button>
                    </div>
                </div> */}
            </div>
        </GuestLayout>
    );
}
