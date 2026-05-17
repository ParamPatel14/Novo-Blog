import { Link } from 'react-router-dom';
import { Appbar } from '../components/Appbar';

const highlights = [
  {
    title: 'Public reading',
    description: 'Anyone can open the feed and read articles without signing in.',
  },
  {
    title: 'Signed-in writing',
    description: 'Only signed-in users can create posts and update their profile name.',
  },
  {
    title: 'Simple account control',
    description: 'Profile actions are kept inside the avatar menu for a cleaner header.',
  },
];

export const Landing = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.14),_transparent_32%),linear-gradient(180deg,#fffaf5_0%,#f8fafc_48%,#eef2ff_100%)] text-slate-900">
      <Appbar />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 py-14 lg:px-10">
        <section className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-sm font-medium text-amber-900 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Public reading, signed-in publishing
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Read blogs publicly,
              <span className="block text-emerald-600">publish only when signed in.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              Novo-Blog keeps the feed open for everyone while protecting post creation and profile updates behind sign in.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Sign up
              </Link>
              <Link
                to="/blogs"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white"
              >
                Explore blogs
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ['Fast', 'lighter surfaces and cleaner spacing'],
                ['Focused', 'reader-first layouts for every article'],
                ['Simple', 'less clutter, more content'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-10 h-28 w-28 rounded-full bg-emerald-300/30 blur-3xl" />
            <div className="absolute -right-4 bottom-8 h-36 w-36 rounded-full bg-amber-300/30 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="text-sm font-medium text-slate-500">Feed preview</div>
                  <div className="text-lg font-bold text-slate-900">Recent posts appear here</div>
                </div>
                <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Live</div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="h-3 w-2/3 rounded-full bg-slate-200" />
                <div className="h-3 w-full rounded-full bg-slate-100" />
                <div className="h-3 w-11/12 rounded-full bg-slate-100" />
                <div className="h-3 w-5/6 rounded-full bg-slate-100" />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/70">
                    <div className="text-sm font-bold text-slate-900">{item.title}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {[
            ['Open feed', 'Everyone can read blog posts without creating an account.'],
            ['Protected writing', 'Creating and publishing posts requires sign in.'],
            ['Profile menu', 'Signed-in users can change their displayed name from the avatar menu.'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-3xl border border-white/60 bg-white/75 p-6 shadow-sm backdrop-blur">
              <div className="text-lg font-bold text-slate-950">{title}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};
