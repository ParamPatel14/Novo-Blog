import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return <header className="sticky top-0 z-30 border-b border-white/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
            <Link to={'/'} className="flex items-center gap-3 cursor-pointer">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-950/20">
                    NB
                </div>
                <div>
                    <div className="text-lg font-extrabold tracking-tight text-slate-950">Novo-Blog</div>
                    <div className="text-xs uppercase tracking-[0.25em] text-slate-500">Write better</div>
                </div>
            </Link>

            <div className="flex items-center gap-3">
                <Link to={'/blogs'} className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 sm:inline-flex">
                    Blogs
                </Link>
                <Link to={'/signin'} className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 sm:inline-flex">
                    Sign in
                </Link>
                <Link to={`/publish`}>
                    <button type="button" className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200">New post</button>
                </Link>

                <div className="rounded-full border border-slate-200 bg-white p-1 shadow-sm">
                    <Avatar size={"big"} name="harkirat" />
                </div>
            </div>
        </div>
    </header>
}