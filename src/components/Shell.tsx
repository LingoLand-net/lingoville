import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <Sidebar />
      <Header />
      <div className="main-content">{children}</div>
      <Footer />
    </div>
  );
}
