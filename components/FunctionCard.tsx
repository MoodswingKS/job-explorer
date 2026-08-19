import Link from "next/link";
import type { JobFunction } from "@/types/job-function";

export default function FunctionCard({
  fn,
  index,
}: {
  fn: JobFunction;
  index: number;
}) {
  return (
    <Link href={`/functions/${fn.id}`} className="block">
    <article className="group relative border border-paper-line bg-paper p-6 text-ink transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(24,40,33,0.35)]">
      {/* punch tab, evokes a rolodex / catalog card */}
      <span
        aria-hidden="true"
        className="absolute -left-px top-6 h-8 w-1.5 rounded-r-sm bg-rust/70"
      />

      <p className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
        {fn.group} · {fn.department} · L{fn.level}
      </p>

      <h3 className="mt-2 font-display text-2xl font-medium leading-tight">
        {fn.title}
      </h3>

      <p className="mt-2.5 text-sm leading-relaxed text-ink/70">
        {fn.description}
      </p>

      <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-ink/60">
        <div className="flex gap-1">
          <dt>Employees</dt>
          <dd className="text-ink">{fn.employeeCount}</dd>
        </div>
        <div className="flex gap-1">
          <dt>Salary</dt>
          <dd className="text-ink">
            €{fn.salary.min.toLocaleString()}–{fn.salary.max.toLocaleString()}
          </dd>
        </div>
      </dl>

      {fn.skills.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {fn.skills.map((skill) => (
            <li
              key={skill}
              className="border border-paper-line/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink/50"
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </article>
    </Link>
  );
}
