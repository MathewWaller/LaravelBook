import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useForm, usePage } from '@inertiajs/react';

import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Button,
    ButtonGroup
} from "@material-tailwind/react";


dayjs.extend(relativeTime);

export default function Post({ post }) {

    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        message: post.message,
        audience: post.audience
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('posts.update', post.id), { onSuccess: () => setEditing(false) });
    };

    return (
            <Card color="white" shadow={true} className="max-w-1xl mx-auto p-4 sm:p-100 lg:p-5 m-3 sm:mt-5">
                <CardHeader
                    color="transparent"
                    floated={false}
                    shadow={false}
                    className="mx-5 flex items-center gap-4 pt-0 pb-8"
                >
                    <Avatar
                        size="xxl"
                        variant="circular"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        alt="tania andrew"
                    />
                    <div className="flex w-full flex-col gap-0.5">
                        <div className="flex items-center justify-between">
                            <div>
                            <Typography variant="h5" color="blue-gray">
                                {post.user.name} 
                                {post.user.id !== auth.user.id && 
                                    <Button color="blue" className='ml-1 p-1 text-sm'>Follow</Button>
                                }
                            </Typography>
                            
                            </div>
                            <div className="5 flex items-center gap-0">
                                {post.user.id === auth.user.id &&
                                    <div>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                </svg>
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                                Edit
                                            </button>
                                            <Dropdown.Link as="button" href={route('posts.destroy', post.id)} method="delete">
                                                Delete
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                    </div>
                                }
                            </div>
                        </div>
                        <Typography color="blue-gray">{dayjs(post.created_at).fromNow()}</Typography>
                        {editing
                            ? <form onSubmit={submit}>
                                <textarea value={data.message} onChange={e => setData('message', e.target.value)} className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></textarea>
                                <InputError message={errors.message} className="mt-2" />
                                <div className="space-x-2">
                                    <PrimaryButton className="mt-4">Save</PrimaryButton>
                                    <button className="mt-4" onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancel</button>
                                </div>
                            </form>
                            : <Typography variant="lead"> &quot;{post.message}&quot;</Typography>
                        }
                    </div>
                </CardHeader>
            </Card>
    );
}