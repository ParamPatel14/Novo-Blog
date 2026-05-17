import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ChangeEvent } from "react";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    return <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_52%,#eef2ff_100%)]">
        <Appbar />
        <div className="mx-auto flex w-full justify-center px-6 py-10 lg:px-10"> 
            <div className="w-full max-w-4xl rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm backdrop-blur">
                <div className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Create post</div>
                <div className="mt-3 text-4xl font-black tracking-tight text-slate-950">Publish something useful</div>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">A calmer editor with more spacing, clearer focus states, and a cleaner writing surface.</p>

                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="mt-8 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" placeholder="Title" />

                <TextEditor onChange={(e) => {
                    setDescription(e.target.value)
                }} />
                <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content: description
                    }, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="mt-6 inline-flex items-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200">
                    Publish post
                </button>
            </div>
        </div>
    </div>
}


function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-4">
        <div className="w-full">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="p-4">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={12} className="block w-full resize-none rounded-2xl border-0 bg-transparent px-1 py-2 text-base leading-8 text-slate-800 outline-none placeholder:text-slate-400" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>
    
}