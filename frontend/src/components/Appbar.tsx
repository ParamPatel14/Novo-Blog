import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Avatar } from './BlogCard';
import { useCurrentUser } from '../hooks/useCurrentUser';

export const Appbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const isSignedIn = Boolean(localStorage.getItem('token'));

  useEffect(() => {
    if (user?.name) {
      setNameInput(user.name);
    } else {
      setNameInput('');
    }
  }, [user?.name]);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('scroll', closeMenu, { passive: true });
    return () => window.removeEventListener('scroll', closeMenu);
  }, []);

  const displayName = useMemo(() => user?.name || user?.email?.split('@')[0] || 'User', [user]);

  const saveName = async () => {
    const token = localStorage.getItem('token');
    if (!token || !nameInput.trim()) return;

    const response = await axios.put(
      `${BACKEND_URL}/api/v1/user/me`,
      { name: nameInput.trim() },
      { headers: { Authorization: token } }
    );

    setUser(response.data.user);
    setMenuOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/20 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to={'/'} className="flex items-center gap-3 cursor-pointer">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/60 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/10 backdrop-blur-xl">
            NB
          </div>
          <div>
            <div className="text-lg font-extrabold tracking-tight text-slate-950">Novo-Blog</div>
            <div className="text-xs uppercase tracking-[0.25em] text-slate-500">Public feed</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link to={'/blogs'} className="hidden rounded-full border border-white/50 bg-white/35 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm shadow-slate-950/5 backdrop-blur transition hover:bg-white/50 hover:text-slate-950 sm:inline-flex">
            Blogs
          </Link>

          {isSignedIn ? (
            <>
              <Link to={'/publish'} className="hidden rounded-full border border-white/50 bg-emerald-500/90 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 backdrop-blur transition hover:-translate-y-0.5 hover:bg-emerald-600 sm:inline-flex">
                New post
              </Link>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((value) => !value)}
                  className="flex items-center gap-3 rounded-full border border-white/50 bg-white/35 px-3 py-2 shadow-sm shadow-slate-950/5 backdrop-blur transition hover:bg-white/50"
                >
                  <Avatar size="big" name={displayName} />
                  <div className="hidden text-left sm:block">
                    <div className="text-sm font-semibold text-slate-900">{displayName}</div>
                    <div className="text-xs text-slate-500">Profile</div>
                  </div>
                </button>

                {menuOpen ? (
                  <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.18)] backdrop-blur-2xl">
                    <div className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-3">
                      <Avatar size="big" name={displayName} />
                      <div>
                        <div className="text-sm font-bold text-slate-950">{displayName}</div>
                        <div className="text-xs text-slate-500">{user?.email}</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Change name</label>
                      <input
                        value={nameInput}
                        onChange={(event) => setNameInput(event.target.value)}
                        className="block w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        placeholder="Enter a new name"
                      />
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={saveName}
                        className="flex-1 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={logout}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <Link to={'/signin'} className="hidden rounded-full border border-white/50 bg-white/35 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm shadow-slate-950/5 backdrop-blur transition hover:bg-white/50 hover:text-slate-950 sm:inline-flex">
                Sign in
              </Link>
              <Link to={'/signup'} className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
