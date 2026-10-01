import { Shell } from '@/components/Shell';
import { PageHero } from '@/components/PageHero';
import { useT } from '@/i18n';

export default function About() {
  const t = useT();
  const cards = t('about.cards') as unknown as Array<{
    tag: string; titleA: string; titleB: string; body: string;
  }>;
  const steps = t('about.steps') as unknown as Array<{ title: string; body: string }>;

  return (
    <Shell>
      <PageHero
        eyebrow={t('about.eyebrow')}
        title={
          <>
            {t('about.titleA')}
            <em style={{ color: 'var(--yellow)', fontStyle: 'normal' }}>{t('about.titleEm')}</em>
            {t('about.titleB')}
          </>
        }
        description={t('about.description')}
      />
      <main>
        <section className="section">
          <div className="container">
            <div className="about-grid">
              {cards.map((c, i) => (
                <article className="about-card" key={i}>
                  <div className="mono">{c.tag}</div>
                  <h3>
                    {c.titleA}
                    {c.titleB ? <><br />{c.titleB}</> : null}
                  </h3>
                  <p>{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section-tight">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="mono section-tag">{t('about.stepsHeading.tag')}</div>
                <h2 className="display">{t('about.stepsHeading.heading')}</h2>
              </div>
            </div>
            <div className="steps">
              {steps.map((s, i) => (
                <div className="step" key={i}>
                  <span className="step-no">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}