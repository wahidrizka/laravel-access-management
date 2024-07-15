import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Layout } from "@/Layouts";

export default function Dashboard({ auth }: PageProps) {
    return (
        <Layout user={auth.user}>
            <Head title="Dashboard" />

            <div></div>
        </Layout>
    );
}
