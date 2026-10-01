import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from './Brand';
import { getNavItems, getUtilityNav } from '@/lib/nav';
import { useLanguage } from '@/i18n';

export const SOCIALS_URL = 'https://card.tccards.tn/@lingo-ville';

export function Sidebar() {
  const { t, lang, toggleLang } = useLanguage();
  const navItems = getNavItems(t);
  const utilityNav = getUtilityNav(t);

  return (
    <aside className="sidebar">
      <Brand variant="icon" />

      <nav className="rail-nav" aria-label="Main navigation">
        {navItems.map((item, i) => (
          <Link
            key={item.id}
            href={item.href}
            className="rail-link"
            data-testid={`link-nav-${item.id}`}
          >
            <span className="rail-top">
              <span>0{i + 1}</span>
              <ArrowUpRight size={12} />
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="rail-utility">
        {utilityNav.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            /* class is driven by the stable id — never by the translated label */
            className={`rail-utility-link rail-utility-${item.id}`}
            data-testid={`link-nav-${item.id}`}
          >
            {item.label} ↗
          </a>
        ))}
      </div>

      <button
        type="button"
        className="rail-toggle"
        onClick={toggleLang}
        aria-label={lang === 'en' ? t('nav.toggleAriaToFr') : t('nav.toggleAriaToEn')}
      >
        {lang === 'en' ? t('nav.toggleToFr') : t('nav.toggleToEn')}
      </button>

      <a
        href={SOCIALS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rail-social"
        aria-label={t('nav.socialsAria')}
      >
        ◎ f in
      </a>
    </aside>
  );
}