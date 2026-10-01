import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function Track({ children, label = 'Scroll the story' }: { children: ReactNode; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const didMove = useRef(false);
  const [dragging, setDragging] = useState(false);

  const items = Array.isArray(children) ? children : [children];

  // ── Wrap-around: keep scrollLeft inside the middle "set" ─────────
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const jumpToMiddle = () => {
      const setWidth = el.scrollWidth / 3;
      el.scrollLeft = setWidth;
    };
    const raf = requestAnimationFrame(jumpToMiddle);
    const t = setTimeout(jumpToMiddle, 100);

    const onScroll = () => {
      const setWidth = el.scrollWidth / 3;
      if (setWidth === 0) return;
      if (el.scrollLeft < setWidth * 0.5) {
        el.scrollLeft += setWidth;
      } else if (el.scrollLeft > setWidth * 1.5) {
        el.scrollLeft -= setWidth;
      }
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      el.removeEventListener('scroll', onScroll);
    };
  }, [items.length]);

  // ── Global listeners while dragging (no setPointerCapture) ──────
  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el || !isDragging.current) return;
      const dx = e.clientX - startX.current;
      if (Math.abs(dx) > 4) didMove.current = true;
      el.scrollLeft = startScroll.current - dx;
    };

    const onUp = () => {
      isDragging.current = false;
      setDragging(false);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [dragging]);

  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    // Cards live inside .horizontal-track-set → go two levels deep
    const firstCard = el.firstElementChild?.firstElementChild as HTMLElement | null;
    const step = (firstCard?.offsetWidth ?? 430) + 18; // + gap
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    isDragging.current = true;
    didMove.current = false;
    startX.current = e.clientX;
    startScroll.current = el.scrollLeft;
    setDragging(true);
  };

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (didMove.current) {
      e.preventDefault();
      e.stopPropagation();
      didMove.current = false;
    }
  };

  return (
    <div className="horizontal-wrap">
      <div className="track-controls">
        <span className="mono" style={{ marginRight: 'auto', alignSelf: 'center' }}>{label}</span>
        <button className="track-control" onClick={() => scroll(-1)} aria-label="Previous cards"><ArrowLeft size={15} /></button>
        <button className="track-control" onClick={() => scroll(1)} aria-label="Next cards"><ArrowRight size={15} /></button>
      </div>
      <div
        ref={ref}
        className={`horizontal-track${dragging ? ' is-dragging' : ''}`}
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
      >
        {[0, 1, 2].map((setIdx) => (
          <div key={setIdx} className="horizontal-track-set" aria-hidden={setIdx !== 1}>
            {items}
          </div>
        ))}
      </div>
    </div>
  );
}