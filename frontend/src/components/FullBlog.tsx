import type { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
import { useCurrentUser } from "../hooks/useCurrentUser"
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'

export const FullBlog = ({ blog }: {blog: Blog}) => {
    const { user } = useCurrentUser();
    const navigate = useNavigate();

    const isOwner = Boolean(user?.id && blog.author?.id && user.id === blog.author.id);

    const handleDelete = async () => {
        if (!confirm('Delete this post?')) return;
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}`, { headers: { Authorization: localStorage.getItem('token') || '' } });
            navigate('/blogs');
        } catch (e) {
            alert('Failed to delete post');
            console.error(e);
        }
    }

    const handleEdit = () => {
        navigate(`/publish?id=${blog.id}`);
    }

    return <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_52%,#eef2ff_100%)]">
        <Appbar />
        <div className="flex justify-center px-6 py-12 lg:px-10">
            <div className="grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <div className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 lg:text-6xl">
                        {blog.title}
                    </div>
                    <div className="pt-4 flex items-center justify-between">
                        <div className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Blog post</div>
                        {isOwner ? (
                            <div className="flex items-center gap-3">
                                <button onClick={handleEdit} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium">Edit</button>
                                <button onClick={handleDelete} className="rounded-full border border-red-300 bg-red-50 px-3 py-1 text-sm font-medium text-red-600">Delete</button>
                            </div>
                        ) : null}
                    </div>
                    <div className="prose prose-slate max-w-none pt-8 text-lg leading-8 text-slate-700">
                        {blog.content}
                    </div>
                </div>
                <div className="lg:col-span-4">
                    <div className="sticky top-28 rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-xl shadow-slate-200/60 backdrop-blur">
                        <div className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                            Author
                        </div>
                        <div className="mt-5 flex w-full items-start gap-4">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                            <div>
                                <div className="text-xl font-bold text-slate-950">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-sm leading-6 text-slate-500">
                                    Authored on Novo-Blog.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}