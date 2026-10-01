import { useEffect, useState } from 'react';
import { useT } from '@/i18n';

const DURATION = 1100;
const FADE = 350;

export function Loadout() {
  const t = useT();
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const tt = Math.min(1, (now - start) / DURATION);
      setProgress(1 - Math.pow(1 - tt, 3));
      if (tt < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setHidden(true), FADE);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;

  return (
    <div className={`loadout ${progress >= 1 ? 'loadout-done' : ''}`} aria-hidden={progress >= 1}>
      <div className="loadout-inner">
        <div className="loadout-brand">
          <img src="/logo-icon.png" alt="" className="loadout-mark" />
          <span className="loadout-name">LINGO<br />VILLE</span>
        </div>
        <div className="loadout-bar">
          <i style={{ transform: `scaleX(${progress})` }} />
        </div>
        <div className="loadout-meta mono">
          <span>{t('loadout.loading')}</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
      </div>
    </div>
  );
}