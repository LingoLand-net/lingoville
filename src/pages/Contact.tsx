import { useState } from 'react';
import { ArrowRight, Check, ExternalLink, Plus, X } from 'lucide-react';
import { Shell } from '@/components/Shell';
import { submitForm } from '@/lib/api';
import { useT } from '@/i18n';

type FaqItem = { category: string; q: string; a: string };

const PHONES = [
  { display: '+216 22 571 291', tel: '+21622571291' },
  { display: '+216 95 883 871', tel: '+21695883871' },
];

export default function Contact() {
  const t = useT();
  const faqs = t('contact.faq.items') as FaqItem[];
  const interestOptions = t('contact.form.interestOptions') as string[];
  const languageOptions = t('contact.form.languageOptions') as string[];

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData(e.currentTarget);

    const result = await submitForm('contact', {
      Name:     String(data.get('name') ?? ''),
      Email:    String(data.get('email') ?? ''),
      Interest: String(data.get('interest') ?? ''),
      Language: String(data.get('language') ?? ''),
      Message:  String(data.get('message') ?? ''),
    });

    setSubmitting(false);
    if (result.ok) setSent(true);
    else setError(result.error);
  }

  return (
    <Shell>
      <main>
        <div className="contact-page">
          <div className="contact-split">
            <div className="contact-art">
              <div className="contact-photo">
                <img src="https://lh3.googleusercontent.com/grass-cs/ACvplmMvglL0HfR6bC-KZkHXwq3v8v6-hRyeTVDTy6RUUAmLBAsFMXEG8B_Ry4ceLtNNn-Lf5fSKIWJd8g3e4DtLE44XIE5Od3dibJ2eh-lYwGVDJm3QyGxrIKa06QxJ85jiwhohBA4EnsXVGz3s=w408-h306-k-no" alt="" />
              </div>

              <div className="contact-map">
                <iframe
                  title="Lingoville Language Centre location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d971.9875738569419!2d10.762089540486084!3d34.76422391903136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x638c70f46956c3a5%3A0xacc1271b4e2e96e7!2sLingoville%20Language%20Centre!5e1!3m2!1sen!2stn!4v1790803348200!5m2!1sen!2stn"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                <a
                  href="https://maps.app.goo.gl/tVP989iZABiDcwYV7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-map-overlay"
                  aria-label={t('contact.mapsAria')}
                />
                <div className="contact-map-info">
                  <div className="mono">{t('contact.mapInfoTag')}</div>
                  <strong>{t('contact.mapInfoEmail')}</strong>
                  {PHONES.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="contact-map-phone">
                      {p.display}
                    </a>
                  ))}
                  <div className="social-row">
                    <a href="https://card.tccards.tn/@lingo-ville" target="_blank" rel="noopener noreferrer" aria-label="Social card">◎</a>
                    <span>f</span>
                    <span>in</span>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/tVP989iZABiDcwYV7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-map-open"
                  >
                    {t('contact.openMaps')} <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form">
              {sent ? (
                <div style={{ padding: '65px 0', textAlign: 'center' }}>
                  <span className="avatar" style={{ margin: '0 auto 20px', background: 'var(--green)' }}><Check /></span>
                  <h2 className="display">{t('contact.form.successHeading')}</h2>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{t('contact.form.successText')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mono section-tag">{t('contact.form.tag')}</div>
                  <h2 className="display">
                    {t('contact.form.headingA')}<br />{t('contact.form.headingB')}
                  </h2>

                  <div className="field-grid">
                    <div className="field">
                      <label htmlFor="contact-name">{t('contact.form.name')}</label>
                      <input id="contact-name" name="name" required placeholder={t('contact.form.namePlaceholder')} />
                    </div>
                    <div className="field">
                      <label htmlFor="contact-email">{t('contact.form.email')}</label>
                      <input id="contact-email" name="email" type="email" required placeholder={t('contact.form.emailPlaceholder')} />
                    </div>
                    <div className="field">
                      <label htmlFor="contact-interest">{t('contact.form.interest')}</label>
                      <select id="contact-interest" name="interest">
                        {interestOptions.map((o, i) => <option key={i}>{o}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="contact-language">{t('contact.form.language')}</label>
                      <select id="contact-language" name="language">
                        {languageOptions.map((o, i) => <option key={i}>{o}</option>)}
                      </select>
                    </div>
                    <div className="field full">
                      <label htmlFor="contact-message">{t('contact.form.message')}</label>
                      <textarea id="contact-message" name="message" required placeholder={t('contact.form.messagePlaceholder')} />
                    </div>
                  </div>

                  {error && (
                    <p style={{ color: 'var(--orange)', fontSize: '.85rem', margin: '8px 0 16px' }}>{error}</p>
                  )}

                  <button
                    className="button button-blue"
                    type="submit"
                    disabled={submitting}
                    style={{ opacity: submitting ? 0.6 : 1, cursor: submitting ? 'wait' : 'pointer' }}
                  >
                    {submitting ? t('contact.form.submitting') : t('contact.form.submit')} <ArrowRight size={17} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <section className="section faq-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="mono section-tag">{t('contact.faq.tag')}</div>
                <h2 className="display">
                  {t('contact.faq.headingA')}<br />
                  <em style={{ color: 'var(--orange)', fontStyle: 'normal' }}>{t('contact.faq.headingB')}</em>
                </h2>
              </div>
              <p>{t('contact.faq.intro')}</p>
            </div>

            <div className="faq-grid">
              {faqs.map((item, i) => (
                <div className="faq-item" key={i}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span><small>{item.category}</small><strong>{item.q}</strong></span>
                    <span className="faq-icon">{openFaq === i ? <X size={18} /> : <Plus size={18} />}</span>
                  </button>
                  {openFaq === i && <div className="faq-answer">{item.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}