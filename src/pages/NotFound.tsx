import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Shell } from '@/components/Shell';
import { useT } from '@/i18n';

export default function NotFound() {
  const t = useT();
  return (
    <Shell>
      <div className="section" style={{ minHeight: '60vh' }}>
        <div className="container">
          <div className="mono section-tag">{t('notFound.tag')}</div>
          <h1 className="display" style={{ fontSize: 'clamp(4rem,10vw,9rem)', lineHeight: .85 }}>
            {t('notFound.titleA')}<br />
            <em style={{ color: 'var(--orange)', fontStyle: 'normal' }}>{t('notFound.titleEm')}</em>
          </h1>
          <Link href="/" className="button button-blue" style={{ marginTop: 30 }}>
            {t('notFound.cta')} <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </Shell>
  );
}