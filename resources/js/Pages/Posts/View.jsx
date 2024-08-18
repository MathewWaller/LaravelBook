import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import Post from '@/Components/Post';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


export default function Index({ auth, posts }) {

    const audienceOptions = [
        'All', 'Private'
    ];

    const defaultAudienceOption = audienceOptions[0];

    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
        audience: 'All',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('posts.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="LaravelBook - Posts" />
            <div>
            <div className="max-w-2xl mx-auto rounded shadow bg-white">
                {posts.map(post =>
                    <Post key={post.id} post={post} />
                )}
            </div>
            </div>
        </AuthenticatedLayout>
    );
}