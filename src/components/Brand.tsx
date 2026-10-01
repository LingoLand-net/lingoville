import { Link } from 'wouter';

type BrandVariant = 'default' | 'icon' | 'wordmark';

/**
 * Brand logo. Three variants for different contexts:
 *   - default   : icon + stacked "LINGO / VILLE" text (mobile header)
 *   - icon      : icon only (loadout, favicon-like spots, small marks)
 *   - wordmark  : horizontal logo image (sidebar, footer)
 *
 * Images live in /public:
 *   /logo-icon.png      → circle mark (transparent)
 *   /logo-wordmark.png  → horizontal wordmark (transparent)
 */
export function Brand({ variant = 'default' }: { variant?: BrandVariant }) {
  if (variant === 'icon') {
    return (
      <Link href="/" className="brand brand-icon" data-testid="link-brand" aria-label="Lingo Ville — home">
        <img src="/logo-icon.png" alt="" className="brand-icon-img" />
      </Link>
    );
  }

  if (variant === 'wordmark') {
    return (
      <Link href="/" className="brand brand-wordmark" data-testid="link-brand" aria-label="Lingo Ville — home">
        <img src="/logo-wordmark.png" alt="" className="brand-wordmark-img" />
      </Link>
    );
  }

  return (
    <Link href="/" className="brand" data-testid="link-brand" aria-label="Lingo Ville — home">
      <img src="/logo-icon.png" alt="" className="brand-mark" />
      <span>LINGO<br />VILLE</span>
    </Link>
  );
}