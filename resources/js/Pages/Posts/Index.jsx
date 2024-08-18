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
            <div className="max-w-2xl mx-auto p-4 sm:p-100 lg:p-5 m-3 sm:mt-5 bg-white rounded shadow">
                <form onSubmit={submit}>
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
                            <Dropdown
                                className='mt-4 mr-5 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                                options={audienceOptions}
                                onChange={e => setData('audience', e.value)}
                                value={defaultAudienceOption}
                                placeholder="Select an option" />
                        </div>

                    </div>
                </form>
            </div>
            <div className="max-w-2xl mx-auto">
                {posts.map(post =>
                    <Post key={post.id} post={post} />
                )}
            </div>
            </div>
        </AuthenticatedLayout>
    );
}