import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NotAuthorised from "@/Components/NotAuthorised"; "@/Components/NotAuthorised";
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';

export default function Index({ auth, posts }) {
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <Head title="LaravelBook - Posts" />
                <div>
                    <div className="max-w-2xl mx-auto mt-4">
                        <article className="max-w-none format mt-1">
                            <h1 className="mb-1 pb-1 center">You can not view this post!</h1>
                            <NotAuthorised width="300" className="center-image opacity-40" />
                            <h4 className="lead mt-1 center">Only people who follow {posts.user.name} can view this post.</h4>

                            <div className="center-image center ">
                                <PrimaryButton className="full hover:bg-gradient-to-tl hover:from-fuchsia-500 hover:to-cyan-300">
                                    <p className="center-button">Follow {posts.user.name} Now!</p>
                                </PrimaryButton>
                            </div>
                        </article>




                    </div>

                </div>
            </AuthenticatedLayout>
        </div>
    );
}