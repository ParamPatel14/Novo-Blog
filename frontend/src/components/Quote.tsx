

export const Quote = () => {
    return (
        <div className="flex h-screen flex-col justify-center bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(180deg,#0f172a_0%,#111827_100%)] px-12 text-white">
            <div className="flex justify-center">
                <div className="max-w-lg">
                    <div className="text-3xl font-black leading-tight tracking-tight">
                        "A simple interface changes everything."
                    </div>
                    <div className="mt-4 max-w-md text-base leading-7 text-slate-300">
                        Clean surfaces, better hierarchy, and calmer reading make the experience feel premium without feeling heavy.
                    </div>
                    <div className="mt-8 max-w-md text-lg font-semibold text-left">
                        Praman Patel
                    </div>
                    <div className="max-w-md text-sm font-medium text-slate-400">
                        CEO | Novo-Blog
                    </div>
                </div>
            </div>
        </div>
    );
}