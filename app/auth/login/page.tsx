"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from '@/public/logo/kassenzettel.svg';
import Link from "next/link";
import { LoginForm } from "./components/LoginForm";
import { LoginWithGoogle } from "./components/LoginWithGoogle";
import { SignupForm } from "./components/SignupForm";
import FormStateToggle from "./components/FormStateToggle";

export default function LoginPage() {
    const [formState, setFormState] = useState<'login' | 'signup'>('login')

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="rounded-2xl bg-white/5 border border-white/10 w-full max-w-md p-8">
                <div className="mt-6 text-center">
                    {/* TODO: Remove Link */}
                    <Link href="/">
                        <Image src={Logo} alt="Kassenzettel" className="w-64 mx-auto" />
                    </Link>
                </div>
                <p className="text-sm text-white/60 my-4 text-center">
                    Verfolge und analysiere Deine Ausgaben
                </p>

                <FormStateToggle value={formState} onChange={setFormState} />
                
                {formState === 'login' && (
                    <LoginForm />
                )}

                {formState == 'signup' && (
                    <SignupForm />
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
            
                <LoginWithGoogle />
                <p className="text-xs text-center text-white/40 mt-6">
                    Mit der Nutzung stimmst du unseren{" "}
                    <a
                        href="/legal/nutzungsbedingungen"
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