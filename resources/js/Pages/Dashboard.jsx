import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PostCard from '@/Components/Post';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    useAccordion,
} from "@material-tailwind/react";

export default function Dashboard({ auth, posts, likes, followed }) {
    console.log(posts);
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="LaravelBook - My Profile" />
            <div className="max-w-5xl mx-auto mt-5">
                <div class="grid xl:grid-cols-4 sm:grid-cols-1 gap-10">
                    <div class="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-1">
                        <Card className="w-full">
                            <CardHeader floated={false} className="pb-0">
                                <img className="mx-auto" src="https://scontent.ffab1-2.fna.fbcdn.net/v/t39.30808-6/285353616_10226892590329717_8308219160690952356_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=WT8TsxEK-FMQ7kNvgFDyh80&_nc_ht=scontent.ffab1-2.fna&oh=00_AYA7HR694KloOlKVEj3Z49jHWEzJSLnj-TRylGGxA1yrug&oe=66C82BAC" alt="profile-picture" />
                            </CardHeader>
                            <CardBody className="text-center">
                                <Typography variant="h5" color="blue-gray" className='mt-0 pt-0'>
                                    {auth.user.name}
                                </Typography>
                            </CardBody>
                        </Card>
                    </div>
                    <div class="xl:col-span-3 lg:col-span-3 md:col-span-1 sm:col-span-1">
                        {posts.map(post_child =>
                            <PostCard following={followed.includes(post_child.user.id)} likes={likes.includes(post_child.id)} key={post_child.id} details={post_child} />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
