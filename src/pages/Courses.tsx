import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight, Clock3 } from 'lucide-react';
import { Shell } from '@/components/Shell';
import { PageHero } from '@/components/PageHero';
import { Track } from '@/components/Track';
import { useT } from '@/i18n';

type CourseCard = { title: string; text: string; meta: string; alt: string };
type Training = { title: string; weeks: string; meta: string };
type Level = { code: string; name: string; desc: string };

// Images stay hardcoded — they're data, not copy.
const IMAGES = [
  'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=1200&q=80',  // 0 — School curriculum
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=80',    // 1 — General English
  'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&q=80',  // 2 — Exam preparation
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80',  // 3 — Business & Professional
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',  // 4 — French
  'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1200&q=80',     // 5 — Spanish
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80',  // 6 — Reading Club
];

const LEVEL_WIDTHS = ['17%', '32%', '50%', '67%', '84%', '100%'];

const COLOR_CLASSES: Record<string, string> = {
  yellow: 'bg-[var(--yellow)] text-[var(--ink)]',
  orange: 'bg-[var(--orange)] text-[var(--ink)]',
  green:  'bg-[var(--green)] text-[var(--ink)]',
  blue:   'bg-[var(--blue)] text-[var(--paper)]',
  pink:   'bg-[var(--pink)] text-[var(--ink)]',
};

const COLOR_ORDER = ['yellow', 'orange', 'green', 'blue', 'pink', 'yellow', 'orange'] as const;

export default function Courses() {
  const t = useT();
  const cards = t('courses.core.cards') as CourseCard[];
  const trainings = t('courses.trainings.items') as Training[];
  const levels = t('courses.levels.items') as Level[];

  return (
    <Shell>
      <PageHero
        eyebrow={t('courses.eyebrow')}
        title={
          <>
            {t('courses.titleA')}
            <em style={{ color: 'var(--yellow)', fontStyle: 'normal' }}>{t('courses.titleEm')}</em>
            {t('courses.titleB')}
          </>
        }
        description={t('courses.description')}
      />

      <main>
        {/* ─── Core courses ─── */}
        <section className="section">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="mono section-tag">{t('courses.core.tag')}</div>
                <h2 className="display">{t('courses.core.heading')}</h2>
              </div>
              <p>{t('courses.core.intro')}</p>
            </div>

            <Track label={t('courses.core.trackLabel')} mobileWrap={false}>
              {cards.map((c, i) => {
                const color = COLOR_ORDER[i] ?? 'yellow';
                const image = IMAGES[i] ?? IMAGES[0];
                const colorClass = COLOR_CLASSES[color] ?? COLOR_CLASSES.yellow;
                return (
                  <article
                    key={i}
                    className={[
                      'group snap-start',
                      'flex h-[420px] shrink-0 grow-0 flex-col gap-3',
                      'basis-[clamp(280px,24vw,360px)]',
                      'overflow-hidden rounded-[25px] border border-[var(--ink)] p-5',
                      'transition-[transform,box-shadow] duration-300',
                      'hover:-translate-y-1.5 hover:shadow-[6px_7px_0_var(--ink)]',
                      'max-[560px]:h-[440px] max-[560px]:basis-[min(84vw,370px)] max-[560px]:p-[18px]',
                      colorClass,
                    ].join(' ')}
                  >
                    <h3 className="flex h-[2.2em] shrink-0 items-center overflow-hidden text-[clamp(1.4rem,2.2vw,2rem)] font-bold leading-[1.05] tracking-[-0.06em] [font-family:var(--font-display)]">
                      {c.title}
                    </h3>

                    <div className="h-[320px] shrink-0 overflow-hidden rounded-2xl border border-[var(--ink)] bg-[var(--paper)] transition-[height] duration-[550ms] ease-[cubic-bezier(.2,.75,.2,1)] group-hover:h-[120px] [@media(hover:none)]:h-[180px] max-[560px]:h-[180px]">
                      <img src={image} alt={c.alt} className="block h-full w-full object-cover" loading="lazy" />
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col gap-2 translate-y-2.5 opacity-0 transition-[opacity,transform] duration-[400ms] ease-out delay-[120ms] group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 max-[560px]:translate-y-0 max-[560px]:opacity-100">
                      <span className="text-[.66rem] uppercase tracking-[.04em] opacity-70 [font-family:var(--app-font-mono)]">
                        {c.meta}
                      </span>
                      <p className="m-0 line-clamp-4 text-[.85rem] leading-[1.45]">{c.text}</p>
                      <Link
                        href="/contact"
                        className="mt-auto inline-flex shrink-0 items-center gap-1.5 self-start py-1 text-[.78rem] font-bold tracking-[-0.01em] transition-[gap] duration-200 group-hover:gap-2.5"
                      >
                        {t('courses.core.enquire')} <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </Track>
          </div>
        </section>

        {/* ─── Trainings ─── */}
        <section className="section-tight">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="mono section-tag">{t('courses.trainings.tag')}</div>
                <h2 className="display">{t('courses.trainings.heading')}</h2>
              </div>
              <p>{t('courses.trainings.intro')}</p>
            </div>

            <div className="training-grid">
              {trainings.map((tr, i) => (
                <article className="training-card" key={i}>
                  <div className="mono">{tr.meta}</div>
                  <h3>{tr.title}</h3>
                  <div className="training-foot">
                    <span><Clock3 size={14} /> {tr.weeks}</span>
                    <Link href="/contact" className="training-link">
                      {t('courses.trainings.enquire')} <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Levels ─── */}
        <section className="section">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="mono section-tag">{t('courses.levels.tag')}</div>
                <h2 className="display">{t('courses.levels.heading')}</h2>
              </div>
              <p>{t('courses.levels.intro')}</p>
            </div>

            <div className="level-grid">
              {levels.map((lvl, i) => (
                <article className="level-card" key={lvl.code}>
                  <div className="level-code">{lvl.code}</div>
                  <h3>{lvl.name}</h3>
                  <p>{lvl.desc}</p>
                  <div className="level-bar"><i style={{ width: LEVEL_WIDTHS[i] ?? '50%' }} /></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Placement test ─── */}
        <section className="section-tight blue-section">
          <div className="container split-section">
            <div>
              <div className="mono section-tag">{t('courses.placement.tag')}</div>
              <h2 className="display">
                {t('courses.placement.headingA')}<br />{t('courses.placement.headingB')}
              </h2>
            </div>
            <div>
              <p style={{ lineHeight: 1.65 }}>{t('courses.placement.body')}</p>
              <div className="button-row" style={{ marginTop: 24 }}>
                <span className="soon-pill mono">{t('courses.placement.pill')}</span>
                <Link href="/contact" className="button button-primary">
                  {t('courses.placement.cta')} <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}