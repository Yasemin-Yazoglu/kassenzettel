"use client";

import { useState } from "react";
import Logo from '@/public/logo/kassenzettel.svg';
import Link from "next/link";
import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
    const [formState, setFormState] = useState<'login' | 'signup'>('login')

    // TODO: Solve reusability of Logo
    const LogoComponent = Logo;

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="glass w-full max-w-md rounded-3xl p-8">
                <div className="mt-6 text-center">
                    {/* TODO: Remove Link */}
                    <Link href="/">
                        <LogoComponent className="w-64 mx-auto" />
                    </Link>
                </div>
                <p className="text-sm text-white/60 my-4 text-center">
                    Verfolge und analysiere Deine Ausgaben
                </p>
    
                {formState === 'login' && (
                    <LoginForm />
                )}
        
                {/*
                // TODO: Integrate this later into LoginForm Component
                <div className="flex items-center justify-end text-sm">
                    
                    <label className="flex items-center gap-2 text-slate-300">
                        <input type="checkbox" />
                        An mich erinnern
                    </label>
                    
        
                    <button
                        type="button"
                        className="text-indigo-400 hover:text-indigo-300"
                    >
                        Passwort vergessen?
                    </button>
                </div>
                */}
                    

    
            <div className="relative my-6">
                <hr className="w-full border-t border-white/10" />
            </div>
    
            <button
                className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                py-3
                rounded-xl
                border
                border-white/10
                bg-white/10
                hover:bg-white/15
                text-white
                transition
                "
            >
            <svg width="20" height="20" viewBox="0 0 48 48">
                <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.205 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.046 6.053 29.29 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
                />
                <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.046 6.053 29.29 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z"
                />
                <path
                    fill="#4CAF50"
                    d="M24 44c5.188 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.147 35.091 26.683 36 24 36c-5.184 0-9.626-3.329-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                />
                <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.046 12.046 0 01-4.084 5.57h.003l6.19 5.238C36.971 38.482 44 33 44 24c0-1.341-.138-2.651-.389-3.917z"
                />
            </svg>
                Mit Google fortfahren
            </button>
                <p className="text-center text-slate-400 text-sm mt-8">
                    Du hast noch keinen Account?{" "}
                    <button className="text-indigo-400 hover:text-indigo-300">
                    Sign Up
                    </button>
                </p>
                <p className="text-xs text-center text-white/40 mt-6">
                    Mit der Nutzung stimmst du unseren{" "}
                    <a
                        href="/legal/terms"
                        className="underline underline-offset-2 hover:text-white/60 transition"
                    >
                        Nutzungsbedingungen
                    </a>{" "}
                    zu.
                </p>
            </div>
        </div>
    );
}