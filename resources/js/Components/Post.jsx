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
    ButtonGroup,
    CardFooter
} from "@material-tailwind/react";


dayjs.extend(relativeTime);

export default function PostCard({ details, likes, following }) {


    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);

    const { data, setData, patch, post,put, clearErrors, reset, errors } = useForm({
        message: details.message,
        audience: details.audience,
        post_id: details.id,
        author_id: details.user.id,
    });

    const [liked, setLiked] = useState((likes.includes(details.id)) ? false : true);
    const [followed, setFollowed] = useState((following.includes(details.user.id)) ? false : true);
    

    const submit = (e) => {
        e.preventDefault();
        patch(route('posts.update', details.id), { onSuccess: () => setEditing(false) });
    };


    const likepost = (e) => {
        e.preventDefault();
        if (liked == false) {
            axios.post(route('likes.store'), {
                post_id: details.id,
                author_id: details.user.id,
            })
                .then(res => {
                    setLiked(true);
                    console.log(res['data']['message'])
                })
        }else{
            post(route('likes.destroy', details.id), { onSuccess: () => setLiked(false) });
        }
    }

    const followerUser = (e) => {
        e.preventDefault();
            axios.post(route('follow.store'), {
                user_id: details.user.id,
            })
                .then(res => {
                    setFollowed(res['data']['message']);
                })
    }

    return (
        <Card color="white" shadow={true} className="max-w-1xl mx-auto p-4 sm:p-100 lg:p-5 m-3 sm:mt-5">
            <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-5 flex items-center gap-4 pt-0"
            >
                <Avatar
                    size="xxl"
                    variant="circular"
                    src="https://scontent.ffab1-2.fna.fbcdn.net/v/t39.30808-6/285353616_10226892590329717_8308219160690952356_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=WT8TsxEK-FMQ7kNvgFDyh80&_nc_ht=scontent.ffab1-2.fna&oh=00_AYA7HR694KloOlKVEj3Z49jHWEzJSLnj-TRylGGxA1yrug&oe=66C82BAC"
                    alt="tania andrew"
                />
                <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                    <div className="flex items-end gap-2">
                            <Typography variant="h5" color="blue-gray">
                                {details.user.name}
                            </Typography>
                                {details.user.id == auth.user.id &&
                                    <Button color="blue" onClick={followerUser} className='ml-1 p-1 text-sm'>{followed ? "Unfollow" : "Follow" }</Button>
                                }
                        </div>
                        <div className="5 flex items-center gap-0">
                            {details.user.id === auth.user.id &&
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
                                            <Dropdown.Link as="button" href={route('posts.destroy', details.id)} method="delete">
                                                Delete
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            }
                        </div>
                    </div>
                    <Typography color="blue-gray">{dayjs(details.created_at).fromNow()}</Typography>
                    {editing
                        ? <form onSubmit={submit}>
                            <textarea value={data.message} onChange={e => setData('message', e.target.value)} className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></textarea>
                            <InputError message={errors.message} className="mt-2" />
                            <div className="space-x-2">
                                <PrimaryButton className="mt-4">Save</PrimaryButton>
                                <button className="mt-4" onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancel</button>
                            </div>
                        </form>
                        : <Typography variant="lead"> &quot;{details.message}&quot;</Typography>
                    }
                </div>
            </CardHeader>
            <CardBody className='p-0 right-10 flex'>

                <div onClick={e => likepost(e)} className="inline-flex" style={{ marginLeft: "auto" }}>
                    <button className="bg-gray-300 hover:bg-blue-400 text-blue-500 hover:text-white font-bold py-2 px-4 rounded inline-flex items-center">
                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M7.47998 18.35L10.58 20.75C10.98 21.15 11.88 21.35 12.48 21.35H16.28C17.48 21.35 18.78 20.45 19.08 19.25L21.48 11.95C21.98 10.55 21.08 9.34997 19.58 9.34997H15.58C14.98 9.34997 14.48 8.84997 14.58 8.14997L15.08 4.94997C15.28 4.04997 14.68 3.04997 13.78 2.74997C12.98 2.44997 11.98 2.84997 11.58 3.44997L7.47998 9.54997" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" />
                            <path d="M2.38 18.35V8.55002C2.38 7.15002 2.98 6.65002 4.38 6.65002H5.38C6.78 6.65002 7.38 7.15002 7.38 8.55002V18.35C7.38 19.75 6.78 20.25 5.38 20.25H4.38C2.98 20.25 2.38 19.75 2.38 18.35Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="like-post">{(liked) ? "Like" : "Unlike"}</span>
                    </button>
                </div>
            </CardBody>
        </Card>
    );
}