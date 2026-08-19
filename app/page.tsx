import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
        <div>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[1.05] tracking-tight text-paper md:text-6xl">
            Find your perfect job
          </h1>
          <p className="mt-6 max-w-md text-balance text-base leading-relaxed text-sage">
            There is a role for everyone, find out which one should belong to you!
          </p>
          <div className="mt-9 flex items-center gap-4">
            <Link
              href="/functions"
              className="inline-flex items-center gap-2 rounded-sm bg-brass px-5 py-3 font-mono text-xs uppercase tracking-widest text-canopy-dark transition-colors hover:bg-brass-light"
            >
              Check out the functions
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
    </div>
  );
}
