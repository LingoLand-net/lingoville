import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const EASE_OUT_CUBIC = (t: number) => 1 - Math.pow(1 - t, 3);

export function Track({
  children,
  label = 'Scroll the story',
  mobileWrap = true,
}: {
  children: ReactNode;
  label?: string;
  /** When false, touch devices get a plain scroll (no infinite wrap). Desktop keeps wrap. */
  mobileWrap?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const lastX = useRef(0);
  const didMove = useRef(false);
  const [dragging, setDragging] = useState(false);

  // Infinite wrap state
  const setWidthRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const items = Array.isArray(children) ? children : [children];

  const isTouchDevice = useRef(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    isTouchDevice.current = window.matchMedia('(hover: none)').matches;
  }, []);

  // ── Infinite wrap: setup + scroll listener ───────────────────────
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only enable infinite wrap when we actually rendered 3 sets.
    // (mobileWrap === false renders a single set — nothing to wrap to.)
    const sets = el.querySelectorAll<HTMLElement>('.horizontal-track-set');
    if (sets.length < 3) return;

    const measureSetWidth = () => {
      const all = el.querySelectorAll<HTMLElement>('.horizontal-track-set');
      if (all.length < 2) return 0;
      // Distance between consecutive sets = one full set incl. trailing gap.
      // This is what makes the jump invisible.
      return all[1].offsetLeft - all[0].offsetLeft;
    };

    const alignToMiddle = () => {
      const w = measureSetWidth();
      if (w <= 0) return;
      setWidthRef.current = w;
      el.scrollLeft = w;
    };

    // Wait for layout + fonts/images.
    const raf = requestAnimationFrame(() => requestAnimationFrame(alignToMiddle));
    const t1 = window.setTimeout(alignToMiddle, 100);
    const t2 = window.setTimeout(alignToMiddle, 400);

    // Re-measure when the track's size changes (font load, resize, etc.)
    const ro = new ResizeObserver(() => {
      const prev = setWidthRef.current;
      const next = measureSetWidth();
      if (next <= 0) return;
      if (prev <= 0) {
        setWidthRef.current = next;
        el.scrollLeft = next;
      } else if (Math.abs(next - prev) > 1) {
        // Preserve the user's relative position across the middle set.
        const ratio = el.scrollLeft / prev;
        setWidthRef.current = next;
        el.scrollLeft = ratio * next;
      }
    });
    ro.observe(el);

    const onScroll = () => {
      const sw = setWidthRef.current;
      if (sw <= 0) return;
      // Fold the scroll position back into the middle set.
      if (el.scrollLeft < sw * 0.5) {
        el.scrollLeft += sw;
      } else if (el.scrollLeft > sw * 1.5) {
        el.scrollLeft -= sw;
      }
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      ro.disconnect();
      el.removeEventListener('scroll', onScroll);
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [items.length, mobileWrap]);

  // ── Mouse drag ───────────────────────────────────────────────────
  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el || !isDragging.current) return;
      // Incremental delta so a mid-drag wrap doesn't fight the pointer.
      const dx = e.clientX - lastX.current;
      if (Math.abs(e.clientX - startX.current) > 4) didMove.current = true;
      lastX.current = e.clientX;
      el.scrollLeft -= dx;
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

  // ── Button scroll: rAF animation that respects the infinite wrap ─
  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;

    const firstCard = el.firstElementChild?.firstElementChild as HTMLElement | null;
    const step = (firstCard?.offsetWidth ?? 430) + 18;

    // Cancel any in-flight animation.
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const sw = setWidthRef.current;

    // Not wrapping (single-set track): fall back to native smooth scroll.
    if (sw <= 0) {
      el.scrollBy({ left: dir * step, behavior: 'smooth' });
      return;
    }

    // Animate on a "virtual" position, then fold it into the middle set
    // every frame. Because the content repeats every `sw`, the fold is
    // visually seamless — the loop never runs out.
    const startV = el.scrollLeft;
    const delta = dir * step;
    const duration = 420;
    const startTime = performance.now();
    const low = sw * 0.5;

    const mapToBounds = (v: number) => {
      const m = ((v - low) % sw + sw) % sw;
      return m + low;
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const v = startV + delta * EASE_OUT_CUBIC(t);
      el.scrollLeft = mapToBounds(v);
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        animFrameRef.current = null;
      }
    };
    animFrameRef.current = requestAnimationFrame(tick);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Native touch scroll already handles this — only capture mouse drags.
    if (e.pointerType !== 'mouse') return;
    if (e.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    // Kill any in-flight animation so the drag takes over immediately.
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    isDragging.current = true;
    didMove.current = false;
    startX.current = e.clientX;
    lastX.current = e.clientX;
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
        {mobileWrap === false ? (
          // Single set: no wrap, no duplicate clones.
          <div className="horizontal-track-set">
            {items}
          </div>
        ) : (
          [0, 1, 2].map((setIdx) => (
            <div key={setIdx} className="horizontal-track-set" aria-hidden={setIdx !== 1}>
              {items}
            </div>
          ))
        )}
      </div>
    </div>
  );
}