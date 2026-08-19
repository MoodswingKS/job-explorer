import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="grid gap-12 py-20 md:grid-cols-[1.2fr_0.8fr] md:py-28">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
            Vol. I &mdash; Field Index
          </p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[1.05] tracking-tight text-paper md:text-6xl">
            A field guide to
            <br />
            where the work happens.
          </h1>
          <p className="mt-6 max-w-md text-balance text-base leading-relaxed text-sage">
            Every open role, sorted by function instead of title. Eight
            territories, each cataloged with its own headcount, growth
            status, and remote range &mdash; so you can survey the map before
            you commit to a trail.
          </p>
          <div className="mt-9 flex items-center gap-4">
            <Link
              href="/functions"
              className="inline-flex items-center gap-2 rounded-sm bg-brass px-5 py-3 font-mono text-xs uppercase tracking-widest text-canopy-dark transition-colors hover:bg-brass-light"
            >
              Browse functions
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <span className="font-mono text-xs uppercase tracking-widest text-sage">
              8 territories charted
            </span>
          </div>
        </div>

        <div className="flex items-start justify-center md:justify-end">
          <div className="w-full max-w-xs rotate-1 border border-paper-line bg-paper p-6 text-ink shadow-[6px_6px_0_0_rgba(0,0,0,0.25)]">
            <p className="font-mono text-[10px] uppercase tracking-widest text-rust">
              Specimen&nbsp;No. 04
            </p>
            <p className="mt-3 font-display text-2xl font-medium">
              Engineering
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              Design, build, and maintain the systems behind the product.
            </p>
            <div className="mt-5 border-t border-dashed border-paper-line pt-4 font-mono text-[11px] uppercase tracking-widest text-ink/60">
              42 open roles &middot; 85% remote
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
