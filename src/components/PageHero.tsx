import type { ReactNode } from 'react';

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description: string }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="mono section-tag">{eyebrow}</div>
        <h1 className="display">{title}</h1>
        <p>{description}</p>
      </div>
      <span className="orb" />
      <span className="orb-two" />
    </section>
  );
}
