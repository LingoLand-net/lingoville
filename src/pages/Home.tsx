import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Star } from 'lucide-react';
import { Shell } from '@/components/Shell';
import { Reveal } from '@/components/Reveal';
import { reviewData } from '@/data/reviews';
import { submitForm, fetchApprovedReviews, type ApprovedReview } from '@/lib/api';
import { useT } from '@/i18n';
import { Seo } from '@/components/Seo';

type Slide = { eyebrow: string; titleA: string; titleEm: string; titleB: string; text: string; alt: string };

const IMAGES = ['/classroom-students.jpg', '/adult-conversation.jpg', '/classroom-students.jpg'];

function HeroSlider() {
  const t = useT();
  const slides = t('home.slides') as Slide[];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const tt = setInterval(() => setI((prev) => (prev + 1) % slides.length), 6500);
    return () => clearInterval(tt);
  }, [paused, slides.length]);

  const go = (dir: number) => setI((prev) => (prev + dir + slides.length) % slides.length);
  const s = slides[i];

  return (
    <section
      className="hero hero-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container hero-grid">
        <div className="hero-copy-col">
          <div className="eyebrow mono">
            <span className="eyebrow-line" />
            <span key={i} className="eyebrow-text">{s.eyebrow}</span>
          </div>
          <h1 key={`h-${i}`} className="display hero-slide-in">
            {s.titleA}<em>{s.titleEm}</em><br />{s.titleB}
          </h1>
          <p key={`p-${i}`} className="hero-copy hero-slide-in">{s.text}</p>

          <div className="button-row">
            <Link href="/courses" className="button button-primary">
              {t('home.hero.exploreCourses')} <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="button button-ghost">
              {t('home.hero.meetStudio')}
            </Link>
          </div>

          <div className="slider-controls">
            <button className="track-control" onClick={() => go(-1)} aria-label={t('home.hero.prevSlide')}>
              <ArrowLeft size={15} />
            </button>
            <div className="slider-dots">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  className={`slider-dot ${idx === i ? 'active' : ''}`}
                  onClick={() => setI(idx)}
                  aria-label={`${idx + 1}`}
                />
              ))}
            </div>
            <button className="track-control" onClick={() => go(1)} aria-label={t('home.hero.nextSlide')}>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image">
            {slides.map((sl, idx) => (
              <img
                key={idx}
                src={IMAGES[idx]}
                alt={sl.alt}
                className={idx === i ? 'hero-slide-img active' : 'hero-slide-img'}
              />
            ))}
          </div>
          <div className="sticker">{t('home.hero.sticker.0')}<br />{t('home.hero.sticker.1')}</div>
          <span className="shape shape-one" />
          <span className="shape shape-two" />
          <span className="shape shape-three" />
        </div>
      </div>
    </section>
  );
}

function QuickAbout() {
  const t = useT();
  return (
    <Reveal>
      <section className="section">
        <div className="container quick-about">
          <div>
            <div className="mono section-tag">{t('home.quickAbout.tag')}</div>
            <h2 className="display">
              {t('home.quickAbout.heading')}<br />{t('home.quickAbout.heading2')}
            </h2>
          </div>
          <div>
            <p className="quick-about-lead">{t('home.quickAbout.lead')}</p>
            <p>{t('home.quickAbout.body')}</p>
            <Link href="/about" className="button button-primary">
              {t('home.quickAbout.cta')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function ReviewsCarousel() {
  const t = useT();
  const [reviews, setReviews] = useState<ApprovedReview[]>([]);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchApprovedReviews().then((fetched) => {
      if (!mounted) return;
      if (fetched.length > 0) setReviews(fetched);
      else setReviews(reviewData.map((r) => ({ name: r.name, role: r.role, text: r.text })));
      setLoaded(true);
    });
    return () => { mounted = false; };
  }, []);

  const total = reviews.length;

  useEffect(() => {
    if (paused || total < 2) return;
    const tt = setInterval(() => setI((prev) => (prev + 1) % total), 4000);
    return () => clearInterval(tt);
  }, [paused, total]);

  useEffect(() => {
    if (i >= total && total > 0) setI(0);
  }, [total, i]);

  const go = (dir: number) => setI((prev) => (prev + dir + total) % total);
  const r = total > 0 ? reviews[i % total] : null;

  return (
    <section
      className="section-tight blue-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="mono section-tag">{t('home.reviews.tag')}</div>
            <h2 className="display">{t('home.reviews.heading')}</h2>
          </div>
        </div>

        <div className="review-showcase">
          {!loaded ? (
            <article className="review-showcase-card">
              <Star className="stars" fill="currentColor" />
              <blockquote>{t('home.reviews.loading')}</blockquote>
              <div className="review-author">{t('home.reviews.studio')}</div>
            </article>
          ) : r ? (
            <article className="review-showcase-card">
              <Star className="stars" fill="currentColor" />
              <blockquote>“{r.text}”</blockquote>
              <div className="review-author">
                {r.name}{r.role ? <span>{r.role}</span> : null}
              </div>
            </article>
          ) : (
            <article className="review-showcase-card">
              <Star className="stars" fill="currentColor" />
              <blockquote>“{t('home.reviews.empty')}”</blockquote>
              <div className="review-author">{t('home.reviews.studio')}</div>
            </article>
          )}

          {loaded && total > 1 && (
            <div className="review-showcase-nav">
              <button className="track-control" onClick={() => go(-1)} aria-label={t('home.reviews.prevAria')}>
                <ArrowLeft size={15} />
              </button>
              <span className="mono">{i + 1} / {total}</span>
              <button className="track-control" onClick={() => go(1)} aria-label={t('home.reviews.nextAria')}>
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function LeaveReview() {
  const t = useT();
  const points = t('home.leaveReview.points') as string[];
  const roleOptions = [t('home.leaveReview.roleStudent'), t('home.leaveReview.roleParent')];
  const courseOptions = [
    t('home.leaveReview.courseEnglish'),
    t('home.leaveReview.courseFrench'),
    t('home.leaveReview.courseSpanish'),
    t('home.leaveReview.courseExam'),
    t('home.leaveReview.courseBusiness'),
    t('home.leaveReview.courseUnsure'),
  ];

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData(e.currentTarget);

    const result = await submitForm('review', {
      Name:   String(data.get('name') ?? ''),
      Email:  String(data.get('email') ?? ''),
      Role:   String(data.get('role') ?? ''),
      Course: String(data.get('course') ?? ''),
      Review: String(data.get('text') ?? ''),
    });

    setSubmitting(false);
    if (result.ok) setSubmitted(true);
    else setError(result.error);
  }

  return (
    <Reveal>
      <section className="section">
        <div className="container review-form-section">
          <div className="review-form-intro">
            <div className="mono section-tag">{t('home.leaveReview.tag')}</div>
            <h2 className="display">{t('home.leaveReview.heading')}</h2>
            <p>{t('home.leaveReview.intro')}</p>
            <ul className="review-form-points">
              {points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>

          {submitted ? (
            <div className="review-form review-form-thanks">
              <span className="avatar" style={{ background: 'var(--green)', margin: '0 0 18px' }}>
                <Check />
              </span>
              <h3 className="display">{t('home.leaveReview.thanksHeading')}</h3>
              <p>{t('home.leaveReview.thanksText')}</p>
            </div>
          ) : (
            <form className="review-form" onSubmit={handleSubmit}>
              <div className="field-grid">
                <div className="field">
                  <label htmlFor="lr-name">{t('home.leaveReview.name')}</label>
                  <input id="lr-name" name="name" required placeholder={t('home.leaveReview.namePlaceholder')} />
                </div>
                <div className="field">
                  <label htmlFor="lr-email">{t('home.leaveReview.email')}</label>
                  <input id="lr-email" name="email" type="email" required placeholder={t('home.leaveReview.emailPlaceholder')} />
                </div>
                <div className="field">
                  <label htmlFor="lr-role">{t('home.leaveReview.role')}</label>
                  <select id="lr-role" name="role">
                    {roleOptions.map((o, i) => <option key={i}>{o}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="lr-course">{t('home.leaveReview.course')}</label>
                  <select id="lr-course" name="course">
                    {courseOptions.map((o, i) => <option key={i}>{o}</option>)}
                  </select>
                </div>
                <div className="field full">
                  <label htmlFor="lr-text">{t('home.leaveReview.review')}</label>
                  <textarea id="lr-text" name="text" required placeholder={t('home.leaveReview.reviewPlaceholder')} />
                </div>
              </div>

              {error && (
                <p style={{ color: 'var(--orange)', fontSize: '.85rem', margin: '0 0 14px' }}>{error}</p>
              )}

              <button
                className="button button-blue"
                type="submit"
                disabled={submitting}
                style={{ opacity: submitting ? 0.6 : 1, cursor: submitting ? 'wait' : 'pointer' }}
              >
                {submitting ? t('home.leaveReview.submitting') : t('home.leaveReview.submit')} <ArrowUpRight size={16} />
              </button>
            </form>
          )}
        </div>
      </section>
    </Reveal>
  );
}

function CtaBand() {
  const t = useT();
  return (
    <Reveal>
      <section className="section-tight">
        <div className="container cta-band">
          <h2 className="display">{t('home.cta.heading')}</h2>
          <Link href="/contact" className="button button-blue">
            {t('home.cta.button')} <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </Reveal>
  );
}

export default function Home() {
  const t = useT();
  return (
    <Shell>
      <Seo
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        path="/"
      />
      <main>
        <HeroSlider />
        <QuickAbout />
        <ReviewsCarousel />
        <LeaveReview />
        <CtaBand />
      </main>
    </Shell>
  );
}