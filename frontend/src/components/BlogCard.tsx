import { Link } from "react-router-dom";
interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="group w-screen max-w-screen-md cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
            <div className="flex items-center gap-3">
                <Avatar name={authorName} />
                <div className="font-semibold text-sm text-slate-700 flex justify-center flex-col">{authorName}</div>
                <div className="flex justify-center flex-col">
                    <Circle />
                </div>
                <div className="font-medium text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-2xl font-bold pt-4 text-slate-950 group-hover:text-emerald-700 transition">
                {title}
            </div>
            <div className="mt-3 text-base leading-7 text-slate-600">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="pt-5 text-sm font-medium text-slate-500">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    </Link>
}

export function Circle() {
    return <div className="mx-1 h-1 w-1 rounded-full bg-slate-300">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-slate-900 ${size === "small" ? "w-7 h-7" : "w-11 h-11"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-sm"} font-bold text-white`}>
        {name[0]}
    </span>
</div>
}