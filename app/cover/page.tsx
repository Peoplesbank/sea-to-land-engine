export default function CoverPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/40 bg-slate-900 p-5 shadow-2xl">
          <img
            src="/house-of-memory-cover.png"
            alt="House of Memory Sea-to-Land Engine cover"
            className="w-full rounded-2xl border border-amber-400/30"
          />

          <div className="mt-8 rounded-2xl border border-cyan-400/30 bg-slate-950 p-6 text-center">
            <div className="text-sm font-bold uppercase tracking-widest text-amber-300">
              House of Memory • Sea-to-Land Engine
            </div>

            <h1 className="mt-4 text-4xl font-bold md:text-6xl">
              The Roads Were Never Separate.
            </h1>

            <p className="mt-4 text-lg font-semibold text-slate-300">
              Empires fall. Memory endures. The Sea remembers. The Land records.
              The Engine restores.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="/"
                className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-bold uppercase tracking-widest text-cyan-200 hover:bg-cyan-400/20"
              >
                Enter the Engine
              </a>

              <a
                href="/history"
                className="rounded-xl border border-amber-400/40 bg-amber-400/10 px-5 py-3 text-sm font-bold uppercase tracking-widest text-amber-200 hover:bg-amber-400/20"
              >
                Open Living History
              </a>

              <a
                href="/admin"
                className="rounded-xl border border-purple-400/40 bg-purple-400/10 px-5 py-3 text-sm font-bold uppercase tracking-widest text-purple-200 hover:bg-purple-400/20"
              >
                Open Admin
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}