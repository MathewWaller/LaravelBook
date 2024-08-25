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

import NewPostCard from '../../Components/NewPostCard'


export default function Index({ auth, posts, likes, followers}) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="LaravelBook - Posts" />
            <div>
                <div className="max-w-2xl mx-auto">
                    <Typography variant="lead" className='max-w-1xl mx-auto sm:p-1 m-3 sm:mt-5'>
                        What do you want to share with the world today?
                    </Typography>
                    <NewPostCard/>
                    <Typography variant="lead" className='max-w-1xl mx-auto sm:p-1 m-3 sm:mt-5'>
                        What are other people talking about?
                    </Typography>
                </div>
                <div className="max-w-2xl mx-auto">
                    {posts.map(post_child =>
                        <PostCard following={followers.includes(post_child.user.id)} likes={likes.includes(post_child.id)} key={post_child.id} details={post_child} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}