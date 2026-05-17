import { signinInput, signupInput, type SignupInput } from "@parampatel12/medium-comman";
import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });
    async function sendRequest() {
        try {
            setErrorMessage("");
            const parsed = type === "signup"
                ? signupInput.safeParse(postInputs)
                : signinInput.safeParse(postInputs);

            if (!parsed.success) {
                setErrorMessage(parsed.error.issues[0]?.message || "Please enter a valid email and password");
                return;
            }

            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.token || response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setErrorMessage(e.response?.data?.message || `Error while ${type === "signup" ? "signing up" : "signing in"}`);
                return;
            }
            setErrorMessage(`Error while ${type === "signup" ? "signing up" : "signing in"}`);
        }
    }
    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#f8fafc_50%,#eef2ff_100%)] px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur lg:grid-cols-2">
                    <div className="hidden flex-col justify-between bg-slate-950 p-10 text-white lg:flex">
                        <div>
                            <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                                Novo-Blog
                            </div>
                            <div className="mt-8 max-w-md text-4xl font-black leading-tight">
                                A cleaner place to publish and read.
                            </div>
                            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
                                Focused layouts, softer surfaces, and a writing flow that stays out of your way.
                            </p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300">
                            Simple UI. Better hierarchy. Less clutter.
                        </div>
                    </div>

                    <div className="p-8 sm:p-10 lg:p-12">
                        <div className="max-w-md">
                            <div className="text-3xl font-black tracking-tight text-slate-950">
                                {type === "signin" ? "Welcome back" : "Create your account"}
                            </div>
                            <div className="mt-3 text-sm text-slate-500">
                                {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                                <Link className="pl-2 font-semibold text-emerald-700 underline-offset-4 hover:underline" to={type === "signin" ? "/signup" : "/signin"}>
                                    {type === "signin" ? "Sign up" : "Sign in"}
                                </Link>
                            </div>
                            {errorMessage ? <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{errorMessage}</div> : null}
                        </div>

                        <div className="pt-8 space-y-5">
                            {type === "signup" ? <LabelledInput label="Name" placeholder="Harkirat Singh..." onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    name: e.target.value
                                })
                            }} /> : null}
                            <LabelledInput label="Email" placeholder="harkirat@gmail.com" onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    email: e.target.value
                                })
                            }} />
                            <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    password: e.target.value
                                })
                            }} />
                            <button onClick={sendRequest} type="button" className="mt-4 w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200">{type === "signup" ? "Sign up" : "Sign in"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}


interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="mb-2 block pt-1 text-sm font-semibold text-slate-700">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" placeholder={placeholder} required />
    </div>

}