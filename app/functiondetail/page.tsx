import Link from "next/link";
import { notFound } from "next/navigation";
import { getFunctionById, loadFunctions } from "@/app/lib/job-functions";

export default async function FunctionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const fn = await getFunctionById(params.id);

  if (!fn) {
    notFound();
  }

  const related =
    fn.relatedFunctionIds.length > 0
      ? (await loadFunctions()).filter((f) =>
          fn.relatedFunctionIds.includes(f.id),
        )
      : [];

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 text-ink">
      <Link
        href="/"
        className="font-mono text-[10px] uppercase tracking-widest text-sage hover:text-ink"
      >
        ← Back to overview
      </Link>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-ink/50">
        {fn.group} · {fn.department} · L{fn.level}
      </p>

      <h1 className="mt-2 font-display text-4xl font-medium leading-tight">
        {fn.title}
      </h1>

      <p className="mt-4 text-base leading-relaxed text-ink/70">
        {fn.description}
      </p>

      <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-widest text-ink/60">
        <div className="flex gap-1.5">
          <dt>Employees</dt>
          <dd className="text-ink">{fn.employeeCount}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt>Salary</dt>
          <dd className="text-ink">
            €{fn.salary.min.toLocaleString()}–{fn.salary.max.toLocaleString()}
          </dd>
        </div>
      </dl>

      {fn.skills.length > 0 && (
        <div className="mt-8">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
            Skills
          </h2>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {fn.skills.map((skill) => (
              <li
                key={skill}
                className="border border-paper-line/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink/50"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
            Related functions
          </h2>
          <ul className="mt-2 space-y-1">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/functions/${r.id}`}
                  className="text-sm text-ink/80 underline decoration-dotted hover:text-ink"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
