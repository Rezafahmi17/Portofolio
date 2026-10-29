import { useRef, useState, useEffect } from 'react';

let globalTopZ = 55;

/**
 * Ultra-Smooth 120fps Draggable Sticker / Artifact (PRD F-02)
 * - Uses requestAnimationFrame spring interpolation directly on DOM style.transform
 *   (zero React state updates during pointermove for silky motion!)
 * - Mobile (<768px): Static collage / tap-to-shuffle friendly (never blocks vertical touch scroll)
 */
export default function DraggableArtifact({
  children,
  initialRotate = 0,
  resetSignal = 0,
  shuffleOffset = { x: 0, y: 0, r: 0 },
  className = '',
  style = {},
  onTap,
}) {
  const elRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(50);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );

  const animRef = useRef({
    curX: shuffleOffset.x || 0,
    curY: shuffleOffset.y || 0,
    targetX: shuffleOffset.x || 0,
    targetY: shuffleOffset.y || 0,
    curTilt: 0,
    targetTilt: 0,
    curScale: 1,
    targetScale: 1,
    baseRotate: initialRotate + (shuffleOffset.r || 0),
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    lastPointerX: 0,
    moved: false,
    rafId: null,
  });

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const startSpringLoop = () => {
    const a = animRef.current;
    if (a.rafId) return;

    const tick = () => {
      const lerpFactor = a.active ? 0.36 : 0.18;
      a.curX += (a.targetX - a.curX) * lerpFactor;
      a.curY += (a.targetY - a.curY) * lerpFactor;
      a.curTilt += (a.targetTilt - a.curTilt) * 0.22;
      a.curScale += (a.targetScale - a.curScale) * 0.24;

      if (!a.active) {
        a.targetTilt *= 0.85;
      }

      const rot = a.baseRotate + a.curTilt;
      if (elRef.current) {
        elRef.current.style.transform = `translate3d(${a.curX.toFixed(2)}px, ${a.curY.toFixed(
          2
        )}px, 0) rotate(${rot.toFixed(2)}deg) scale(${a.curScale.toFixed(3)})`;
      }

      const settled =
        !a.active &&
        Math.abs(a.targetX - a.curX) < 0.08 &&
        Math.abs(a.targetY - a.curY) < 0.08 &&
        Math.abs(a.curTilt) < 0.08 &&
        Math.abs(a.targetScale - a.curScale) < 0.004;

      if (settled) {
        a.curX = a.targetX;
        a.curY = a.targetY;
        a.curTilt = 0;
        a.curScale = a.targetScale;
        if (elRef.current) {
          elRef.current.style.transform = `translate3d(${a.curX.toFixed(2)}px, ${a.curY.toFixed(
            2
          )}px, 0) rotate(${a.baseRotate.toFixed(2)}deg) scale(${a.curScale.toFixed(3)})`;
        }
        a.rafId = null;
      } else {
        a.rafId = requestAnimationFrame(tick);
      }
    };

    a.rafId = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const a = animRef.current;
    a.targetX = shuffleOffset.x || 0;
    a.targetY = shuffleOffset.y || 0;
    a.baseRotate = initialRotate + (shuffleOffset.r || 0);
    startSpringLoop();
    return () => {
      if (a.rafId) {
        cancelAnimationFrame(a.rafId);
        a.rafId = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal, initialRotate, shuffleOffset.x, shuffleOffset.y, shuffleOffset.r]);

  const handlePointerDown = (e) => {
    if (!isDesktop) return;
    if (e.button !== undefined && e.button !== 0) return;

    e.stopPropagation();
    e.currentTarget.setPointerCapture?.(e.pointerId);

    globalTopZ += 1;
    setZIndex(globalTopZ);
    setIsDragging(true);
    document.body.dataset.dragging = 'true';

    const a = animRef.current;
    a.active = true;
    a.startX = e.clientX;
    a.startY = e.clientY;
    a.originX = a.targetX;
    a.originY = a.targetY;
    a.lastPointerX = e.clientX;
    a.targetScale = 1.055;
    a.moved = false;

    startSpringLoop();
  };

  const handlePointerMove = (e) => {
    const a = animRef.current;
    if (!a.active) return;

    const dx = e.clientX - a.startX;
    const dy = e.clientY - a.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      a.moved = true;
    }

    const vx = Math.max(-11, Math.min(11, (e.clientX - a.lastPointerX) * 0.45));
    a.lastPointerX = e.clientX;

    a.targetTilt = vx;
    a.targetX = a.originX + dx;
    a.targetY = a.originY + dy;
    startSpringLoop();
  };

  const endDrag = (e) => {
    const a = animRef.current;
    if (!a.active) return;

    a.active = false;
    a.targetTilt = 0;
    a.targetScale = 1;
    setIsDragging(false);
    delete document.body.dataset.dragging;
    startSpringLoop();

    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }

    if (!a.moved && onTap) {
      onTap();
    }
  };

  return (
    <div
      ref={elRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClick={() => {
        if (!isDesktop && onTap) onTap();
      }}
      data-cursor-label={isDesktop ? 'DRAG ME ✦' : undefined}
      data-cursor-variant="drag"
      style={{
        ...style,
        zIndex,
        willChange: 'transform',
        transform: `translate3d(0px, 0px, 0) rotate(${initialRotate}deg) scale(1)`,
        touchAction: isDesktop ? 'none' : 'pan-y',
      }}
      className={`select-none transition-[filter] duration-300 ${
        isDesktop ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-pointer'
      } ${
        isDragging
          ? 'drop-shadow-[0_28px_38px_rgba(0,0,0,0.48)]'
          : 'drop-shadow-[0_14px_24px_rgba(0,0,0,0.28)] hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.36)]'
      } ${className}`}
    >
      {children}
    </div>
  );
}
