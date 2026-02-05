import Logo from "./_components/logo";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        {/* Logo container */}
        <div className="flex flex-row w-full items-center justify-around">
          <Logo size={100} />
        </div>
      </main>
    </div>
  );
}
