import { EmptyState } from "@/Components";
import { Layout } from "@/Layouts";
import { UserTypes } from "@/types";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import clsx from "clsx";
import { useState } from "react";

export default function Users({ users }: { users: UserTypes[] }) {
    const [userId, setUserId] = useState<number | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {
        setData,
        delete: destroy,
        processing,
    } = useForm({
        id: userId,
    });
    const handleOpen = (userId: number) => {
        setUserId(userId);
        setData("id", userId);
        onOpen();
    };
    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        destroy(route("users.destroy", { id: userId }), {
            onSuccess: () => {
                onOpenChange();
                setUserId(null);
            },
        });
    };

    return (
        <Layout>
            <Head title="Users" />
            <div className={clsx("p-8 bg-white")}>
                <div className={clsx("px-4 sm:px-6 lg:px-8")}>
                    <div className={clsx("sm:flex sm:items-center")}>
                        <div className={clsx("flex-auto")}>
                            <h1
                                className={clsx(
                                    "text-base font-semibold leading-6 text-slate-900"
                                )}
                            >
                                Users
                            </h1>
                            <p className={clsx("mt-2 text-sm text-slate-700")}>
                                A list of all the users in your account
                                including their name, title, email and role.
                            </p>
                        </div>

                        <div
                            className={clsx(
                                "mt-4 sm:ml-16 sm:mt-0 sm:flex-none"
                            )}
                        >
                            <Button
                                as={Link}
                                href={route("users.create") as string}
                                color="primary"
                            >
                                Add user
                            </Button>
                        </div>
                    </div>

                    <div className={clsx("mt-8 flow-root")}>
                        <div className={clsx("mx-4 -my-2 sm:my-6 lg:-my-8")}>
                            <div
                                className={clsx(
                                    "inline-block min-w-full py-2 align-middle"
                                )}
                            >
                                {users.length > 0 ? (
                                    <table
                                        className={clsx(
                                            "min-w-full border-separate border-spacing-0"
                                        )}
                                    >
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className={clsx(
                                                        "sticky top-0 z-10 border-b border-slate-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                                    )}
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className={clsx(
                                                        "sticky top-0 z-10 hidden border-b border-slate-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter sm:table-cell"
                                                    )}
                                                >
                                                    Title
                                                </th>
                                                <th
                                                    scope="col"
                                                    className={clsx(
                                                        "sticky top-0 z-10 hidden border-b border-slate-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter lg:table-cell"
                                                    )}
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    scope="col"
                                                    className={clsx(
                                                        "sticky top-0 z-10 border-b border-slate-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter lg:table-cell"
                                                    )}
                                                >
                                                    Role
                                                </th>
                                                <th
                                                    scope="col"
                                                    className={clsx(
                                                        "sticky top-0 z-10 border-b border-slate-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-10"
                                                    )}
                                                >
                                                    <span
                                                        className={clsx(
                                                            "sr-only"
                                                        )}
                                                    >
                                                        Edit
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user.id}>
                                                    <td
                                                        className={clsx(
                                                            "whitespace-nowrap border-b border-slate-200 py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6 lg:pl-8"
                                                        )}
                                                    >
                                                        {user.name}
                                                    </td>
                                                    <td
                                                        className={clsx(
                                                            "hidden whitespace-nowrap border-b border-slate-300 px-3 py-4 text-sm text-slate-500 sm:table-cell"
                                                        )}
                                                    >
                                                        No title
                                                    </td>
                                                    <td
                                                        className={clsx(
                                                            "hidden whitespace-nowrap border-b border-slate-300 px-3 py-4 text-sm text-slate-500 sm:table-cell"
                                                        )}
                                                    >
                                                        {user.email}
                                                    </td>
                                                    <td
                                                        className={clsx(
                                                            "border-b border-slate-300 px-3 py-4"
                                                        )}
                                                    >
                                                        <div
                                                            className={clsx(
                                                                "flex flex-start gap-x-2"
                                                            )}
                                                        >
                                                            {user.roles.map(
                                                                (
                                                                    role,
                                                                    roleIdx
                                                                ) => (
                                                                    <Chip
                                                                        key={
                                                                            roleIdx
                                                                        }
                                                                        size="sm"
                                                                        variant="bordered"
                                                                        color="success"
                                                                    >
                                                                        {
                                                                            role.name
                                                                        }
                                                                    </Chip>
                                                                )
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td
                                                        className={clsx(
                                                            "relative whitespace-nowrap border-b border-slate-300 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                                                        )}
                                                    >
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <button
                                                                    className={clsx(
                                                                        "-mx-2.5 block p-2.5 text-slate-500"
                                                                    )}
                                                                >
                                                                    <EllipsisVerticalIcon
                                                                        className={clsx(
                                                                            "size-5"
                                                                        )}
                                                                    />
                                                                </button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu>
                                                                <DropdownItem
                                                                    as={Link}
                                                                    key="edit"
                                                                    href={
                                                                        route(
                                                                            "users.edit",
                                                                            user.id
                                                                        ) as string
                                                                    }
                                                                >
                                                                    Edit
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    key={`delete-${user.id}`}
                                                                    className="text-danger"
                                                                    color="danger"
                                                                    onClick={() =>
                                                                        handleOpen(
                                                                            user.id
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>

                                                        <>
                                                            <Modal
                                                                as="form"
                                                                backdrop="blur"
                                                                onSubmit={
                                                                    handleDelete
                                                                }
                                                                isOpen={isOpen}
                                                                onOpenChange={
                                                                    onOpenChange
                                                                }
                                                            >
                                                                <ModalContent>
                                                                    {(
                                                                        onClose
                                                                    ) => (
                                                                        <>
                                                                            <ModalHeader
                                                                                className={clsx(
                                                                                    "flex flex-col gap-1"
                                                                                )}
                                                                            >
                                                                                Delete
                                                                                this
                                                                                user
                                                                            </ModalHeader>
                                                                            <ModalBody>
                                                                                Are
                                                                                you
                                                                                sure
                                                                                you
                                                                                want
                                                                                to
                                                                                delete
                                                                                this
                                                                                user?
                                                                            </ModalBody>
                                                                            <ModalFooter>
                                                                                <Button
                                                                                    variant="light"
                                                                                    onPress={
                                                                                        onClose
                                                                                    }
                                                                                >
                                                                                    Cancel
                                                                                </Button>
                                                                                <Button
                                                                                    type="submit"
                                                                                    color="danger"
                                                                                    isLoading={
                                                                                        processing
                                                                                    }
                                                                                >
                                                                                    Delete
                                                                                </Button>
                                                                            </ModalFooter>
                                                                        </>
                                                                    )}
                                                                </ModalContent>
                                                            </Modal>
                                                        </>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <EmptyState
                                        className={clsx("my-12")}
                                        title="No users"
                                        description="Get started by creating a new user."
                                        href={route("users.create") as string}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
