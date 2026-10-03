import { Link } from 'wouter';
import { Shell } from '@/components/Shell';

export default function NotFound() {
  return (
    <Shell>
      <section className="grid min-h-[60vh] place-items-center px-6 py-[72px] max-[900px]:px-5 max-[900px]:py-12 max-[560px]:px-4 max-[560px]:py-9">
        <div className="max-w-[640px] text-center">
          <div
            aria-hidden="true"
            className="mx-auto mb-[26px] inline-flex h-20 w-20 items-center justify-center rounded-[22px] border border-[var(--ink)] bg-[var(--orange)] text-[2rem] font-bold text-[var(--ink)] shadow-[5px_5px_0_var(--ink)] [font-family:var(--font-display)]"
          >
            !
          </div>

          <p
            aria-hidden="true"
            className="m-0 text-[clamp(5rem,16vw,9rem)] font-bold leading-[.82] tracking-[-.06em] text-[var(--orange)] [font-family:var(--font-display)]"
          >
            404
          </p>

          <h1 className="mb-[14px] mt-[18px] text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[.95] tracking-[-.05em] [font-family:var(--font-display)]">
            This page is not on the record.
          </h1>

          <p className="mx-auto mb-[30px] max-w-[480px] text-[.98rem] leading-[1.6] text-[#4c4944]">
            The certificate verification page you requested may have moved,
            expired, or never existed. Let&apos;s get you back to the official
            portal.
          </p>

          <div className="flex flex-wrap justify-center gap-[10px] max-[560px]:flex-col">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[var(--ink)] bg-[var(--teal,#0F9589)] px-[22px] py-[13px] text-[.8rem] font-bold text-[var(--paper)] no-underline transition-[transform,box-shadow,background] duration-[250ms] hover:-translate-y-[3px] hover:shadow-[4px_4px_0_var(--ink)] max-[560px]:w-full"
            >
              Verify a certificate
            </Link>
            <a
              href="https://learn.lingo-ville.com/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[var(--ink)] bg-[var(--card,#fffaf2)] px-[22px] py-[13px] text-[.8rem] font-bold text-[var(--ink)] no-underline transition-[transform,box-shadow,background] duration-[250ms] hover:-translate-y-[3px] hover:shadow-[4px_4px_0_var(--ink)] max-[560px]:w-full"
            >
              Student Login ↗
            </a>
          </div>
        </div>
      </section>
    </Shell>
  );
}