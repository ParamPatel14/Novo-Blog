import type { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: {blog: Blog}) => {
    return <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_52%,#eef2ff_100%)]">
        <Appbar />
        <div className="flex justify-center px-6 py-12 lg:px-10">
            <div className="grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <div className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 lg:text-6xl">
                        {blog.title}
                    </div>
                    <div className="pt-4 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
                        Published story
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
                                    A clean reading layout with enough breathing room to let the article stand on its own.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}