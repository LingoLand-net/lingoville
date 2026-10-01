import { Link } from 'wouter';
import { Brand } from './Brand';
import { getNavItems } from '@/lib/nav';
import { useT } from '@/i18n';

export const SOCIALS_URL = 'https://card.tccards.tn/@lingo-ville';

export function Footer() {
  const t = useT();
  const navItems = getNavItems(t);

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Brand variant="icon" />
          <p style={{ marginTop: 20 }}>{t('footer.tagline')}</p>
        </div>

        <div>
          <h4>{t('footer.explore')}</h4>
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              data-testid={`link-footer-${item.id}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <h4>{t('footer.startHere')}</h4>
          <Link href="/courses">{t('footer.exploreCourses')}</Link>
          <Link href="/contact">{t('footer.talkToStudio')}</Link>
          <a href="mailto:hey@lingo-ville.com">hey@lingo-ville.com</a>
          <a href={SOCIALS_URL} target="_blank" rel="noopener noreferrer">
            {t('footer.followUs')} ↗
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>{t('footer.copyright')}</span>
        <span>{t('footer.langs')}</span>
      </div>
    </footer>
  );
}