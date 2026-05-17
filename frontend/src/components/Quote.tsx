

export const Quote = () => {
    return (
        <div className="flex h-screen flex-col justify-center bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(180deg,#0f172a_0%,#111827_100%)] px-12 text-white">
            <div className="flex justify-center">
                <div className="max-w-lg">
                    <div className="text-3xl font-black leading-tight tracking-tight">
                        Read public blogs and write only when you are signed in.
                    </div>
                    <div className="mt-4 max-w-md text-base leading-7 text-slate-300">
                        Browse the feed, open any post, and use the profile menu to update your name when you want.
                    </div>
                    <div className="mt-8 max-w-md text-lg font-semibold text-left">
                        Novo-Blog
                    </div>
                    <div className="max-w-md text-sm font-medium text-slate-400">
                        Public reading and private writing
                    </div>
                </div>
            </div>
        </div>
    );
}