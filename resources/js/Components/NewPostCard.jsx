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

export default function NewPostCard() {
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

    const handleChange = (e) => {
        let isChecked = e.target.checked;
        (isChecked) ? setData('audience', 'All') : setData('audience', 'Private');
      }
    return (
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
                            <div  className="inline-flex items-center pr-5 PT-20">
                                <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                                    <input defaultChecked="true" onChange={e=> {handleChange(e)}} id="auto-update" type="checkbox"
                                        className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-700 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900" />
                                    <label htmlFor="auto-update"
                                        className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900">
                                        <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                                            data-ripple-dark="true"></div>
                                    </label>
                                </div>
                                <label htmlFor="auto-update" className="mt-px mb-0 ml-3 font-light text-gray-700 cursor-pointer select-none">
                                    {(data.audience == "All") ? "Public" : "Private"}
                                </label>
                            </div>
                            <PrimaryButton className="mt-4" disabled={processing}>Sign</PrimaryButton>
                        </div>
                        <div className='w-100 pr-5'>

                        </div>

                    </div>
                </form>
            </CardHeader>
        </Card>
    );
}


