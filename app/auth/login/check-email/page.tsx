import Link from "next/link";

export default function CheckEmailPage() {
    return (
        <div className="min-h-screen flex justify-center items-start pt-24">
            <div className="rounded-2xl bg-white/5 border border-white/10 w-full max-w-md py-8 px-6 text-center">
                <h1 className="text-lg font-medium text-white">Bestätige deine Email-Adresse</h1>
                <p className="text-sm text-white/60 mt-2">
                    Wir haben dir einen Bestätigungslink geschickt. Bitte klicke auf den Link
                    in der Email, um dein Konto zu aktivieren.
                </p>

                <p className="text-sm text-center text-white/50 mt-6">
                    <Link href="/" className="text-indigo-400 hover:text-indigo-300 transition">
                        Zurück zur Homepage
                    </Link>
                </p>
            </div>
        </div>
    );
}