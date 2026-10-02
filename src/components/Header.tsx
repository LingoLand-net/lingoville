import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Brand } from './Brand';
import { getNavItems, getUtilityNav } from '@/lib/nav';
import { useLanguage } from '@/i18n';

export function Header() {
  const [open, setOpen] = useState(false);
  const { t, lang, toggleLang } = useLanguage();
  const navItems = getNavItems(t);
  const utilityNav = getUtilityNav(t);

  const close = () => setOpen(false);

  return (
    <header className="mobile-bar">
      <Brand />
      <div className="mobile-bar-actions">
        <button
          type="button"
          className="mobile-lang-btn"
          onClick={toggleLang}
          aria-label={lang === 'en' ? t('nav.toggleAriaToFr') : t('nav.toggleAriaToEn')}
        >
          {lang === 'en' ? t('nav.toggleToFr') : t('nav.toggleToEn')}
        </button>
        <button
          className="track-control"
          onClick={() => setOpen(!open)}
          aria-label={t('nav.menuAria')}
          data-testid="button-menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav className="mobile-menu">
          {navItems.map((item) => (
            <Link key={item.id} href={item.href} onClick={close}>{item.label}</Link>
          ))}
          <div className="mobile-menu-divider" />
          {utilityNav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
            >
              {item.label} ↗
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}