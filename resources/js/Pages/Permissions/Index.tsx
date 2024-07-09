import { EmptyState } from "@/Components";
import { Layout } from "@/Layouts";
import { capitalizeFirstLetter, formatDate } from "@/libs/utils";
import { PermissionTypes } from "@/types";
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

export default function Permissions({
    permissions,
}: {
    permissions: PermissionTypes[];
}) {
    const [permissionId, setPermissionId] = useState<number | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {
        setData,
        delete: destroy,
        processing,
    } = useForm({
        id: permissionId,
    });

    const handleOpen = (id: number) => {
        setPermissionId(id);
        setData({ id });
        onOpen();
    };

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        destroy(route("permissions.destroy", { id: permissionId }), {
            onSuccess: () => {
                onOpenChange();
                setPermissionId(null);
            },
        });
    };
    return (
        <Layout>
            <Head title="Permissions" />
            <div className={clsx("mx-auto max-w-7xl py-6 sm:px-6 lg:px-8")}>
                <div className={clsx("mx-auto max-w-none")}>
                    <div
                        className={clsx(
                            "overflow-hidden bg-white sm:rounded-lg sm:shadow"
                        )}
                    >
                        <div
                            className={clsx(
                                "border-b border-slate-200 bg-white px-4 sm:py-6"
                            )}
                        >
                            <div
                                className={clsx(
                                    "-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap"
                                )}
                            >
                                <div className={clsx("ml-4 mt-4")}>
                                    <h3
                                        className={clsx(
                                            "text-base font-semibold leading-6 text-slate-900"
                                        )}
                                    >
                                        Permissions
                                    </h3>
                                    <p
                                        className={clsx(
                                            "mt-1 text-sm text-slate-500"
                                        )}
                                    >
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit quam corrupti
                                        consectetur.
                                    </p>
                                </div>

                                <div
                                    className={clsx(
                                        "ml-4 my-4 sm:mb-0 flex-shrink-0"
                                    )}
                                >
                                    <Button
                                        color="primary"
                                        as={Link}
                                        href={
                                            route(
                                                "permissions.create"
                                            ) as string
                                        }
                                    >
                                        Create new permission
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <ul
                            role="list"
                            className={clsx("divide-y-1 divide-slate-100 m-6")}
                        >
                            {permissions.length > 0 ? (
                                permissions.map((permission, index) => (
                                    <li
                                        key={index}
                                        className={clsx(
                                            "flex items-center justify-between gap-x-6 py-5"
                                        )}
                                    >
                                        <div className={clsx("min-w-0")}>
                                            <div
                                                className={clsx(
                                                    "flex items-start gap-x-2"
                                                )}
                                            >
                                                <p
                                                    className={clsx(
                                                        "text-sm font-semibold leading-6 text-slate-900"
                                                    )}
                                                >
                                                    {capitalizeFirstLetter(
                                                        permission.name
                                                    )}
                                                </p>
                                                <Chip
                                                    size="sm"
                                                    variant="flat"
                                                    color="success"
                                                >
                                                    new
                                                </Chip>
                                            </div>

                                            <div
                                                className={clsx(
                                                    "mt-1 flex items-center gap-x-2 text-xs leading-5 text-slate-500"
                                                )}
                                            >
                                                <p
                                                    className={clsx(
                                                        "whitespace-nowrap"
                                                    )}
                                                >
                                                    Created on&nbsp;
                                                    <time
                                                        dateTime={
                                                            permission.created_at
                                                        }
                                                    >
                                                        {formatDate(
                                                            permission.created_at
                                                        )}
                                                    </time>
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            className={clsx(
                                                "flex flex-none items-center gap-x-4"
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    "relative flex-none"
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
                                                        <DropdownItem key="view">
                                                            View
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            key="edit"
                                                            href={
                                                                route(
                                                                    "permissions.edit",
                                                                    permission.id
                                                                ) as string
                                                            }
                                                        >
                                                            Edit
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            key={`delete-${index}`}
                                                            className="text-danger"
                                                            color="danger"
                                                            onClick={() =>
                                                                handleOpen(
                                                                    permission.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        </div>

                                        <Modal
                                            as="form"
                                            onSubmit={handleDelete}
                                            isOpen={isOpen}
                                            onOpenChange={onOpenChange}
                                        >
                                            <ModalContent>
                                                {(onClose) => (
                                                    <>
                                                        <ModalHeader
                                                            className={clsx(
                                                                "flex flex-col gap-1"
                                                            )}
                                                        >
                                                            Delete this
                                                            permission
                                                        </ModalHeader>
                                                        <ModalBody>
                                                            Are you sure you
                                                            want to delete this
                                                            permission?
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
                                    </li>
                                ))
                            ) : (
                                <EmptyState
                                    title="No Permissions"
                                    description="Get started by creating a new role."
                                    href={route("permissions.create") as string}
                                />
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
