// src/components/Seo.tsx
import { useEffect } from 'react';
import { useLanguage } from '@/i18n';
import { applySeo } from '@/lib/seo';

export function Seo({
  title,
  description,
  path,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}) {
  const { lang } = useLanguage();

  useEffect(() => {
    applySeo({ title, description, path, lang, noindex });
  }, [title, description, path, lang, noindex]);

  return null;
}