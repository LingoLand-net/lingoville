import type { useT } from '@/i18n';

type T = ReturnType<typeof useT>;

export type NavItem = {
  /** stable id used for CSS classes — never translated */
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

export function getNavItems(t: T): NavItem[] {
  return [
    { id: 'home',    label: t('nav.home'),    href: '/' },
    { id: 'about',   label: t('nav.about'),   href: '/about' },
    { id: 'courses', label: t('nav.courses'), href: '/courses' },
    { id: 'contact', label: t('nav.contact'), href: '/contact' },
  ];
}

export function getUtilityNav(t: T): NavItem[] {
  return [
    { id: 'certificate', label: t('nav.certificate'), href: 'https://cert.lingo-ville.com', external: true },
    { id: 'login',       label: t('nav.login'),       href: 'https://learn.lingo-ville.com',       external: true },
  ];
}