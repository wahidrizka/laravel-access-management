import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { Image } from "@nextui-org/react";
import clsx from "clsx";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        // <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        //     <div>
        //         <Link href="/">
        //             <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        //         </Link>
        //     </div>

        //     <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        //         {children}
        //     </div>
        // </div>
        <div className={clsx("flex min-h-[900px] flex-col bg-slate-50")}>
            <div
                className={clsx(
                    "flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
                )}
            >
                <div className={clsx("sm:mx-auto sm:w-full sm:max-w-md")}>
                    <div className={clsx("flex justify-center")}>
                        <Image
                            src="/logo.png"
                            alt="Laravel Access Management Logo"
                            className={clsx("h-20 w-auto")}
                        />
                    </div>
                </div>

                <div
                    className={clsx(
                        "mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]"
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
