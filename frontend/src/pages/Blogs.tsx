import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton.tsx";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_52%,#eef2ff_100%)]">
            <Appbar /> 
            <div className="mx-auto flex max-w-7xl justify-center px-6 py-10 lg:px-10">
                <div className="space-y-4">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_52%,#eef2ff_100%)]">
        <Appbar />
        <div className="mx-auto flex max-w-7xl justify-center px-6 py-10 lg:px-10">
            <div className="w-full space-y-5">
                <div className="rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-sm backdrop-blur">
                    <div className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Blog feed</div>
                    <div className="mt-3 text-4xl font-black tracking-tight text-slate-950">Stories, notes, and ideas</div>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">A cleaner, easier-to-scan blog list with softer surfaces and stronger hierarchy.</p>
                </div>

                <div className="space-y-5">
                    {blogs.map(post => <BlogCard
                        key={post.id}
                        id={post.id}
                        authorName={post.author.name || "Anonymous"}
                        title={post.title}
                        content={post.content}
                        publishedDate={"2nd Feb 2024"}
                    />)}
                </div>
            </div>
        </div>
    </div>
}
      