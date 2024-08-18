import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PostCard from '@/Components/Post';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';


import 'react-dropdown/style.css';

import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Button,
    ButtonGroup,
    Dropdown
} from "@material-tailwind/react";


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
                <div className="max-w-2xl mx-auto">
                    <Typography variant="lead" className='max-w-1xl mx-auto sm:p-1 m-3 sm:mt-5'>
                        What do you want to share with the world today?
                    </Typography>
                    <Card color="white" shadow={true} className="max-w-1xl mx-auto p-4 sm:p-1 lg:p-5 m-3 sm:mt-5">
                        <CardHeader
                            color="transparent"
                            floated={false}
                            shadow={false}
                            className="mx-5 flex items-center gap-4 pt-0 pb-0"
                        >
                            <form className="flex w-full flex-col gap-0.5" onSubmit={submit}>
                                <InputError message={errors.message} className="mt-2" />
                                <textarea
                                    value={data.message}
                                    placeholder="What's on your mind?"
                                    className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    onChange={
                                        e => setData('message', e.target.value)
                                    }
                                ></textarea>
                                <div className="flex flex-row-reverse text-sm leading-6 text-gray-600">
                                    <div>
                                        <PrimaryButton className="mt-4 pb-4" disabled={processing}>Sign</PrimaryButton>
                                    </div>
                                    <div className='w-100 pr-5'>
                                    
                                    </div>

                                </div>
                            </form>
                        </CardHeader>
                    </Card>
                    <Typography variant="lead" className='max-w-1xl mx-auto sm:p-1 m-3 sm:mt-5'>
                        What are other people talking about?
                    </Typography>
                </div>


                <div className="max-w-2xl mx-auto">
                    {posts.map(post_child =>
                        <PostCard key={post_child.id} details={post_child} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}