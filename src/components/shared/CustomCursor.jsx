import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const cacheRef = useRef({ label: '', variant: 'default', dragging: false, visible: false });

  const [cursorState, setCursorState] = useState({
    label: '',
    variant: 'default',
    dragging: false,
    visible: false,
  });
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const updateMedia = () => setIsFinePointer(mq.matches);
    updateMedia();
    mq.addEventListener?.('change', updateMedia);
    return () => mq.removeEventListener?.('change', updateMedia);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return undefined;

    let rafId;

    const syncCursorState = (next) => {
      const c = cacheRef.current;
      if (
        c.label !== next.label ||
        c.variant !== next.variant ||
        c.dragging !== next.dragging ||
        c.visible !== next.visible
      ) {
        cacheRef.current = next;
        setCursorState(next);
      }
    };

    const onMouseMove = (e) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;

      const isDragging = document.body.dataset.dragging === 'true';
      if (isDragging) {
        syncCursorState({ label: '', variant: 'drag', dragging: true, visible: true });
        return;
      }

      const target = e.target?.closest?.('[data-cursor-label]');
      if (target) {
        syncCursorState({
          label: target.getAttribute('data-cursor-label') || '',
          variant: target.getAttribute('data-cursor-variant') || 'action',
          dragging: false,
          visible: true,
        });
      } else {
        syncCursorState({ label: '', variant: 'default', dragging: false, visible: true });
      }
    };

    const onMouseUp = () => {
      if (cacheRef.current.dragging) {
        syncCursorState({ ...cacheRef.current, dragging: false });
      }
    };

    const onMouseLeave = () => {
      syncCursorState({ ...cacheRef.current, visible: false });
    };

    const tick = () => {
      const p = posRef.current;
      p.x += (p.targetX - p.x) * 0.28;
      p.y += (p.targetY - p.y) * 0.28;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(
          2
        )}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('pointerup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('pointerup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  const { label, variant, dragging, visible } = cursorState;
  const hasLabel = Boolean(label) && !dragging;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none select-none"
      style={{
        zIndex: 9999,
        willChange: 'transform',
        opacity: visible && !dragging ? 1 : 0,
        transition: 'opacity 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Offset pill slightly below-right of cursor tip so it NEVER blocks card artwork or faces */}
      <div
        className={`transition-all duration-200 ease-expo-out flex items-center justify-center font-mono uppercase tracking-[0.09em] font-semibold ${
          hasLabel
            ? variant === 'drag'
              ? 'translate-x-3.5 translate-y-3.5 px-3 py-1.5 rounded-full bg-[#F4BE2A] text-[#121212] text-[10px] shadow-[0_10px_24px_rgba(0,0,0,0.38)] border border-[#121212]'
              : 'translate-x-3.5 translate-y-3.5 px-3 py-1.5 rounded-full bg-[#FF3B00] text-[#F6F5F0] text-[10px] shadow-[0_10px_24px_rgba(255,59,0,0.38)] border border-white/25'
            : '-translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#F6F5F0] mix-blend-difference'
        }`}
      >
        {hasLabel && <span className="whitespace-nowrap">{label}</span>}
      </div>
    </div>
  );
}
