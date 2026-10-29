import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { EDITORIAL_PROFILE } from '../../data/editorialPortfolioData';

const BARCODE_BARS = [
  3, 1, 2, 1, 4, 1, 2, 2, 1, 3, 1, 1, 3, 2, 1, 4, 1, 2, 1, 3, 2, 1, 2, 4, 1, 2,
];

const NUM_NODES = 9;
// Exact distance in SVG units from punch-slot center (0,0) to stitched fabric cuff center (0, -44)
const CLASP_LENGTH = 44;
// Distance from top edge of PVC badge holder to center of oblong punch-slot
const SLOT_PIVOT_Y = 18;

/**
 * Build a silky quadratic midpoint spline SVG path through Verlet rope nodes
 */
function buildSmoothRopePath(nodes, offsetX = 0, offsetY = 0) {
  if (!nodes || nodes.length < 2) return '';
  const pts = nodes.map((n) => ({ x: n.x + offsetX, y: n.y + offsetY }));
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;

  for (let i = 1; i < pts.length - 1; i++) {
    const midX = (pts[i].x + pts[i + 1].x) * 0.5;
    const midY = (pts[i].y + pts[i + 1].y) * 0.5;
    d += ` Q ${pts[i].x.toFixed(2)} ${pts[i].y.toFixed(2)}, ${midX.toFixed(2)} ${midY.toFixed(2)}`;
  }

  const last = pts[pts.length - 1];
  d += ` L ${last.x.toFixed(2)} ${last.y.toFixed(2)}`;
  return d;
}

/**
 * Interactive Physics-Driven Backstage VIP Lanyard & Nametag
 * - Continuous woven orange lanyard strap simulated at 60/120fps with Verlet rope physics
 * - Sub-pixel-locked SVG metal clasp + fabric cuff (mathematically impossible to detach or break)
 * - Real 2D damped spring-pendulum swing + rotational inertia upon release
 * - Zero React re-renders during motion (pure GPU DOM & SVG updates in requestAnimationFrame)
 */
export default function InteractiveLanyardPass({ stageRef, resetSignal = 0 }) {
  const slotRef = useRef(null);
  const cardMoverRef = useRef(null);
  const glareRef = useRef(null);

  // SVG Elements Updated Directly in RAF
  const shadowPathRef = useRef(null);
  const borderPathRef = useRef(null);
  const mainRibbonRef = useRef(null);
  const stitchPathRef = useRef(null);
  const highlightPathRef = useRef(null);
  const topMountGroupRef = useRef(null);
  const claspGroupRef = useRef(null);

  const [svgHost, setSvgHost] = useState(null);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const physicsRef = useRef({
    restX: 0,
    restY: 0,
    anchorX: 0,
    anchorY: 0,
    dx: 0,
    dy: 0,
    vx: 0,
    vy: 0,
    targetDx: 0,
    targetDy: 0,
    angle: -6.5,
    omega: 0,
    restAngle: -6.5,
    tiltX: 0,
    tiltY: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    dragging: false,
    pointerStartX: 0,
    pointerStartY: 0,
    dragOriginDx: 0,
    dragOriginDy: 0,
    grabTorqueFactor: 0,
    nodes: Array.from({ length: NUM_NODES }, () => ({
      x: 0,
      y: 0,
      oldX: 0,
      oldY: 0,
    })),
    ropeInitialized: false,
  });

  useEffect(() => {
    if (stageRef?.current) {
      setSvgHost(stageRef.current);
    }
  }, [stageRef]);

  // Playful pendulum swing impulse when user clicks "Shuffle Stickers"
  useEffect(() => {
    if (resetSignal === 0) return;
    const p = physicsRef.current;
    p.vx += (Math.random() > 0.5 ? 1 : -1) * 15;
    p.vy -= 5;
    p.omega += (Math.random() - 0.5) * 3.5;
  }, [resetSignal]);

  useEffect(() => {
    const stageEl = stageRef?.current;
    const slotEl = slotRef.current;
    if (!stageEl || !slotEl) return undefined;

    const measureGeometry = () => {
      const stageRect = stageEl.getBoundingClientRect();
      const slotRect = slotEl.getBoundingClientRect();
      const p = physicsRef.current;

      const desktop = window.innerWidth >= 1024;
      const restX = slotRect.left - stageRect.left + slotRect.width * 0.5;
      const restY = slotRect.top - stageRect.top + SLOT_PIVOT_Y;

      p.restX = restX;
      p.restY = restY;

      if (desktop) {
        // Anchored directly to the very top edge of the Hero Stage frame (Screenshot 1!)
        p.anchorX = restX + 18;
        p.anchorY = 0;
      } else {
        // Clean overhead backstage strap rail right above the badge on mobile/tablet
        p.anchorX = restX + 10;
        p.anchorY = Math.max(10, restY - 108);
      }

      if (topMountGroupRef.current) {
        topMountGroupRef.current.setAttribute(
          'transform',
          `translate(${p.anchorX.toFixed(2)}, ${p.anchorY.toFixed(2)})`
        );
      }

      if (!p.ropeInitialized) {
        const endX = restX + p.dx;
        const endY = restY + p.dy - CLASP_LENGTH;
        for (let i = 0; i < NUM_NODES; i++) {
          const t = i / (NUM_NODES - 1);
          const nx = p.anchorX + (endX - p.anchorX) * t;
          const ny = p.anchorY + (endY - p.anchorY) * t;
          p.nodes[i] = { x: nx, y: ny, oldX: nx, oldY: ny };
        }
        p.ropeInitialized = true;
      }
    };

    measureGeometry();

    const ro = new ResizeObserver(measureGeometry);
    ro.observe(stageEl);
    ro.observe(slotEl);
    window.addEventListener('resize', measureGeometry);

    let rafId;
    const startTime = performance.now();

    const stepPhysics = (now) => {
      const p = physicsRef.current;
      const elapsed = (now - startTime) * 0.001;

      if (p.dragging) {
        const prevDx = p.dx;
        const prevDy = p.dy;

        // Silky spring tracking while dragging (zero micro-stutter)
        p.dx += (p.targetDx - p.dx) * 0.38;
        p.dy += (p.targetDy - p.dy) * 0.38;

        p.vx = p.dx - prevDx;
        p.vy = p.dy - prevDy;

        const curPivotX = p.restX + p.dx;
        const curPivotY = p.restY + p.dy;
        const tetherAngleDeg =
          -Math.atan2(curPivotX - p.anchorX, Math.max(60, curPivotY - p.anchorY)) *
          (180 / Math.PI) *
          0.45;

        const targetAngle =
          p.restAngle * 0.3 +
          tetherAngleDeg +
          Math.max(-24, Math.min(24, p.vx * 1.4)) +
          p.grabTorqueFactor * Math.max(-14, Math.min(14, p.vx * 0.85));

        p.angle += (targetAngle - p.angle) * 0.25;
        p.omega = 0;
      } else {
        // Gentle idle pendulum sway + 2D harmonic spring return upon release
        const idleSwayX = Math.sin(elapsed * 1.3) * 2.2;
        const idleSwayY = Math.cos(elapsed * 2.0) * 1.1;

        const springK = 0.052;
        const ax = (idleSwayX - p.dx) * springK;
        const ay = (idleSwayY - p.dy) * (springK * 1.25);

        p.vx = (p.vx + ax) * 0.9;
        p.vy = (p.vy + ay) * 0.87;

        p.dx += p.vx;
        p.dy += p.vy;

        const idleAngle = p.restAngle + Math.sin(elapsed * 1.3 - 0.45) * 1.05;
        const alpha = (idleAngle - p.angle) * 0.062 + p.vx * 0.135;
        p.omega = (p.omega + alpha) * 0.88;
        p.angle += p.omega;
      }

      p.tiltX += (p.targetTiltX - p.tiltX) * 0.16;
      p.tiltY += (p.targetTiltY - p.tiltY) * 0.16;

      // Exact punch-slot world coordinates in stageEl space
      const pivotX = p.restX + p.dx;
      const pivotY = p.restY + p.dy;

      // Clasp angle smoothly points from punch-slot toward the rope pull vector
      const pullNode = p.nodes[Math.max(0, NUM_NODES - 3)];
      const pullX = pullNode ? pullNode.x * 0.65 + p.anchorX * 0.35 : p.anchorX;
      const pullY = pullNode ? pullNode.y * 0.65 + p.anchorY * 0.35 : p.anchorY;
      const claspRad = Math.atan2(pullX - pivotX, Math.max(22, pivotY - pullY));
      const claspDeg = claspRad * (180 / Math.PI);

      // Exact fabric cuff center (0, -CLASP_LENGTH) rotated by claspRad around (pivotX, pivotY)
      const strapEndX = pivotX + CLASP_LENGTH * Math.sin(claspRad);
      const strapEndY = pivotY - CLASP_LENGTH * Math.cos(claspRad);

      // ── Verlet Rope Simulation (Nodes 0 .. NUM_NODES-1) ──
      const nodes = p.nodes;
      const currentSpan = Math.hypot(strapEndX - p.anchorX, strapEndY - p.anchorY);
      const restSpan = Math.max(
        68,
        Math.hypot(p.restX - p.anchorX, p.restY - CLASP_LENGTH - p.anchorY)
      );
      const segLen = Math.max(currentSpan, restSpan * 0.99) / (NUM_NODES - 1);

      nodes[0].x = p.anchorX;
      nodes[0].y = p.anchorY;
      nodes[NUM_NODES - 1].x = strapEndX;
      nodes[NUM_NODES - 1].y = strapEndY;

      for (let i = 1; i < NUM_NODES - 1; i++) {
        const n = nodes[i];
        const vx = (n.x - n.oldX) * 0.91;
        const vy = (n.y - n.oldY) * 0.91;
        n.oldX = n.x;
        n.oldY = n.y;
        n.x += vx;
        n.y += vy + 0.55; // Natural woven fabric gravity sag
      }

      // 12 Constraint Passes -> Zero stretching gaps, zero tearing at any speed
      for (let iter = 0; iter < 12; iter++) {
        nodes[0].x = p.anchorX;
        nodes[0].y = p.anchorY;
        nodes[NUM_NODES - 1].x = strapEndX;
        nodes[NUM_NODES - 1].y = strapEndY;

        for (let i = 0; i < NUM_NODES - 1; i++) {
          const a = nodes[i];
          const b = nodes[i + 1];
          const diffX = b.x - a.x;
          const diffY = b.y - a.y;
          const dist = Math.hypot(diffX, diffY) || 0.0001;
          const err = (dist - segLen) / dist;

          if (i === 0) {
            b.x -= diffX * err;
            b.y -= diffY * err;
          } else if (i + 1 === NUM_NODES - 1) {
            a.x += diffX * err;
            a.y += diffY * err;
          } else {
            a.x += diffX * err * 0.5;
            a.y += diffY * err * 0.5;
            b.x -= diffX * err * 0.5;
            b.y -= diffY * err * 0.5;
          }
        }
      }

      // ── Update Card DOM & SVG Hardware in Lockstep ──
      if (cardMoverRef.current) {
        const scale = p.dragging ? 1.03 : 1;
        cardMoverRef.current.style.transform = `perspective(1100px) translate3d(${p.dx.toFixed(
          2
        )}px, ${p.dy.toFixed(2)}px, 0) rotate(${p.angle.toFixed(2)}deg) rotateX(${p.tiltX.toFixed(
          2
        )}deg) rotateY(${p.tiltY.toFixed(2)}deg) scale(${scale})`;
      }

      if (claspGroupRef.current) {
        claspGroupRef.current.setAttribute(
          'transform',
          `translate(${pivotX.toFixed(2)}, ${pivotY.toFixed(2)}) rotate(${claspDeg.toFixed(2)})`
        );
      }

      if (glareRef.current) {
        const glareX = 50 + p.tiltY * 2.5 + p.angle * 1.1;
        const glareY = 34 - p.tiltX * 2.5;
        glareRef.current.style.background = `radial-gradient(circle at ${glareX.toFixed(
          1
        )}% ${glareY.toFixed(
          1
        )}%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.08) 38%, transparent 68%)`;
      }

      const mainD = buildSmoothRopePath(nodes, 0, 0);
      const shadowD = buildSmoothRopePath(nodes, 8, 12);

      if (shadowPathRef.current) shadowPathRef.current.setAttribute('d', shadowD);
      if (borderPathRef.current) borderPathRef.current.setAttribute('d', mainD);
      if (mainRibbonRef.current) mainRibbonRef.current.setAttribute('d', mainD);
      if (stitchPathRef.current) stitchPathRef.current.setAttribute('d', mainD);
      if (highlightPathRef.current) highlightPathRef.current.setAttribute('d', mainD);

      rafId = requestAnimationFrame(stepPhysics);
    };

    rafId = requestAnimationFrame(stepPhysics);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', measureGeometry);
    };
  }, [stageRef]);

  // ── Pointer Handlers on Badge Card ──
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    e.stopPropagation();
    e.currentTarget.setPointerCapture?.(e.pointerId);

    const cardRect = e.currentTarget.getBoundingClientRect();
    const clickRelX =
      (e.clientX - (cardRect.left + cardRect.width * 0.5)) / (cardRect.width * 0.5);

    const p = physicsRef.current;
    p.dragging = true;
    p.pointerStartX = e.clientX;
    p.pointerStartY = e.clientY;
    p.dragOriginDx = p.dx;
    p.dragOriginDy = p.dy;
    p.targetDx = p.dx;
    p.targetDy = p.dy;
    p.grabTorqueFactor = clickRelX;

    setIsGrabbing(true);
    document.body.dataset.dragging = 'true';
  };

  const handlePointerMove = (e) => {
    const p = physicsRef.current;
    const cardRect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - cardRect.left) / cardRect.width - 0.5) * 2;
    const ny = ((e.clientY - cardRect.top) / cardRect.height - 0.5) * 2;
    p.targetTiltX = -ny * 7;
    p.targetTiltY = nx * 8;

    if (!p.dragging) return;

    const rawDx = p.dragOriginDx + (e.clientX - p.pointerStartX);
    const rawDy = p.dragOriginDy + (e.clientY - p.pointerStartY);

    // Elastic woven lanyard constraint: natural slack + smooth rubber-band tension when pulled far
    const curPivotX = p.restX + rawDx;
    const curPivotY = p.restY + rawDy;
    const vecX = curPivotX - p.anchorX;
    const vecY = Math.max(28, curPivotY - p.anchorY);
    const dist = Math.hypot(vecX, vecY) || 1;

    const baseLen = Math.max(130, Math.hypot(p.restX - p.anchorX, p.restY - p.anchorY));
    const freeRadius = baseLen * 1.45;
    const maxStretch = baseLen * 2.6;

    let finalPivotX = p.anchorX + vecX;
    let finalPivotY = p.anchorY + vecY;

    if (dist > freeRadius) {
      const extra = dist - freeRadius;
      const dampedExtra =
        (maxStretch - freeRadius) * (1 - Math.exp(-extra / (maxStretch - freeRadius)));
      const clampedDist = freeRadius + dampedExtra;
      finalPivotX = p.anchorX + (vecX / dist) * clampedDist;
      finalPivotY = p.anchorY + (vecY / dist) * clampedDist;
    }

    p.targetDx = finalPivotX - p.restX;
    p.targetDy = finalPivotY - p.restY;
  };

  const handlePointerUpOrCancel = (e) => {
    const p = physicsRef.current;
    if (!p.dragging) return;

    p.dragging = false;
    p.targetTiltX = 0;
    p.targetTiltY = 0;
    setIsGrabbing(false);
    delete document.body.dataset.dragging;

    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerLeave = () => {
    const p = physicsRef.current;
    if (!p.dragging) {
      p.targetTiltX = 0;
      p.targetTiltY = 0;
    }
  };

  // Continuous Full-Stage Lanyard + Sub-Pixel-Locked Metal Clasp SVG Portal
  const lanyardSvgLayer = svgHost
    ? createPortal(
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible select-none"
          style={{ zIndex: 42 }}
        >
          <defs>
            <linearGradient id="lanyardStrapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B1A" />
              <stop offset="50%" stopColor="#F25600" />
              <stop offset="100%" stopColor="#C94100" />
            </linearGradient>
            <linearGradient
              id="steelHardwareGrad"
              x1="-18"
              y1="-50"
              x2="18"
              y2="8"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FAFAFA" />
              <stop offset="32%" stopColor="#A1A1AA" />
              <stop offset="64%" stopColor="#F4F4F5" />
              <stop offset="100%" stopColor="#52525B" />
            </linearGradient>
          </defs>

          {/* 1. Soft Cast Shadow of Woven Strap */}
          <path
            ref={shadowPathRef}
            fill="none"
            stroke="rgba(18, 18, 18, 0.22)"
            strokeWidth="26"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 2. Crisp Editorial Ink Outline of Strap */}
          <path
            ref={borderPathRef}
            fill="none"
            stroke="#121212"
            strokeWidth="27"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 3. Main International Orange Woven Fabric Ribbon */}
          <path
            ref={mainRibbonRef}
            fill="none"
            stroke="url(#lanyardStrapGrad)"
            strokeWidth="23.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 4. Subtle Woven Fabric Ribbing */}
          <path
            ref={stitchPathRef}
            fill="none"
            stroke="rgba(18, 18, 18, 0.15)"
            strokeWidth="14"
            strokeDasharray="2 3"
            strokeLinecap="butt"
          />

          {/* 5. Center Specular Fabric Highlight */}
          <path
            ref={highlightPathRef}
            fill="none"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 6. Top Stage-Rim Strap Mount Clamp (Physically anchors the top of the strap!) */}
          <g ref={topMountGroupRef}>
            <rect
              x="-18"
              y="-5"
              width="36"
              height="14"
              rx="4"
              fill="#141416"
              stroke="#52525B"
              strokeWidth="1.4"
            />
            <rect x="-12.5" y="-1.5" width="25" height="5" rx="1.8" fill="#FF5E0E" />
            <circle cx="-12" cy="1.5" r="1.4" fill="#D4D4D8" />
            <circle cx="12" cy="1.5" r="1.4" fill="#D4D4D8" />
          </g>

          {/* 7. Sub-Pixel-Locked Metal Swivel Clasp & Stitched Cuff at (pivotX, pivotY) */}
          <g ref={claspGroupRef}>
            {/* Stitched Orange Cuff Wrapping Top D-Ring (Centered at y = -44 = strapEnd!) */}
            <rect
              x="-13"
              y="-52"
              width="26"
              height="16"
              rx="3"
              fill="#F25600"
              stroke="#121212"
              strokeWidth="1.6"
            />
            <rect
              x="-9.5"
              y="-49"
              width="19"
              height="10"
              rx="1"
              stroke="#121212"
              strokeOpacity="0.45"
              strokeWidth="1"
              strokeDasharray="2 1.5"
            />

            {/* Brushed Steel Triangle D-Ring */}
            <path
              d="M -14 -37 H 14 C 17 -37 17.5 -33 15 -30 L 6 -22 H -6 L -15 -30 C -17.5 -33 -17 -37 -14 -37 Z"
              stroke="url(#steelHardwareGrad)"
              strokeWidth="4"
              fill="none"
            />

            {/* Rotating Swivel Barrel */}
            <rect
              x="-5.5"
              y="-24"
              width="11"
              height="11"
              rx="3"
              fill="url(#steelHardwareGrad)"
              stroke="#27272A"
              strokeWidth="1.1"
            />
            <circle cx="0" cy="-18.5" r="1.6" fill="#18181B" />

            {/* Lobster Hook Looping Cleanly Into the Badge Punch Slot at (0, 0) */}
            <path
              d="M 0 -13 V 2 C 0 6.5 -6 6.5 -6 1.5 V -3"
              stroke="url(#steelHardwareGrad)"
              strokeWidth="4.4"
              strokeLinecap="round"
            />
          </g>
        </svg>,
        svgHost
      )
    : null;

  return (
    <>
      {lanyardSvgLayer}

      {/* Un-transformed Layout Slot so ResizeObserver always knows exact resting position */}
      <div
        ref={slotRef}
        className="relative w-[264px] sm:w-[300px] md:w-[322px] select-none"
        style={{ zIndex: 38 }}
      >
        {/* GPU-Transformed Swinging Nametag (Pivots strictly around (50%, SLOT_PIVOT_Y)!) */}
        <div
          ref={cardMoverRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUpOrCancel}
          onPointerCancel={handlePointerUpOrCancel}
          onPointerLeave={handlePointerLeave}
          data-cursor-label="GRAB & SWING ✦"
          data-cursor-variant="drag"
          style={{
            transformOrigin: `50% ${SLOT_PIVOT_Y}px`,
            willChange: 'transform',
            touchAction: 'none',
          }}
          className={`relative w-full ${
            isGrabbing
              ? 'cursor-grabbing drop-shadow-[0_34px_50px_rgba(0,0,0,0.52)]'
              : 'cursor-grab drop-shadow-[0_22px_34px_rgba(0,0,0,0.34)]'
          } transition-[filter] duration-300`}
        >
          {/* ── Translucent Frosted PVC Badge Holder Sleeve ── */}
          <div
            className="relative w-full p-2.5 sm:p-3 rounded-[20px] border border-white/55 overflow-hidden"
            style={{
              background:
                'linear-gradient(145deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.16) 52%, rgba(255,255,255,0.3) 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow:
                'inset 0 1px 1px rgba(255,255,255,0.65), inset 0 -1px 2px rgba(0,0,0,0.18)',
            }}
          >
            {/* Dynamic Specular Vinyl Sheen */}
            <div
              ref={glareRef}
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-30 rounded-[20px]"
            />

            {/* Top Oblong Punch Slot (Centered at y = 18px = SLOT_PIVOT_Y!) */}
            <div className="mx-auto mt-0.5 mb-2.5 w-14 h-3 rounded-full bg-[#141416]/85 border border-white/45 shadow-inner" />

            {/* ── Inner Vibrant International Orange VIP Pass Card ── */}
            <div className="relative z-10 rounded-[12px] bg-[#F25C05] text-[#121212] p-4 sm:p-5 overflow-hidden border border-[#121212]/30 shadow-inner">
              {/* Top Row: VIP Seal + Crisp Scannable Barcode Sticker */}
              <div className="flex items-start justify-between gap-2 mb-3.5">
                <div className="w-9 h-9 rounded-full border-[1.5px] border-[#121212] flex flex-col items-center justify-center text-[6.5px] font-mono font-bold leading-none tracking-tight uppercase bg-[#FF7420]">
                  <span>VIP</span>
                  <span className="mt-0.5">2026</span>
                </div>

                <div className="bg-[#F6F5F0] px-2.5 py-1 rounded-[4px] border border-[#121212]/25 flex flex-col items-center shadow-sm">
                  <div className="flex items-center gap-[1.5px] h-4">
                    {[2, 1, 3, 1, 2, 1, 2, 3, 1, 2].map((w, idx) => (
                      <span
                        key={idx}
                        style={{ width: `${w}px` }}
                        className="h-full bg-[#121212] inline-block"
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[6.5px] font-semibold tracking-widest text-[#121212] mt-0.5">
                    RF-017
                  </span>
                </div>
              </div>

              {/* Specialty Strip */}
              <div className="font-sans text-[8.5px] sm:text-[9px] font-semibold tracking-tight text-[#121212]/85 flex flex-wrap gap-x-1.5 gap-y-0.5 mb-1.5 border-b border-[#121212]/20 pb-1.5">
                <span>React &amp; PHP</span>
                <span>·</span>
                <span>Node/Express</span>
                <span>·</span>
                <span>SQL &amp; Supabase</span>
                <span>·</span>
                <span>AI Agents</span>
              </div>

              {/* Bold Condensed Role Headline */}
              <div className="font-condensed uppercase text-[25px] sm:text-[29px] leading-[0.94] tracking-[-0.01em] text-[#121212] mb-4">
                FULL-STACK &amp; AI
                <br />
                DEVELOPER
              </div>

              {/* Middle Identity + Portrait Frame */}
              <div className="grid grid-cols-12 gap-2.5 items-end mb-4">
                <div className="col-span-6 space-y-0.5">
                  <p className="font-mono text-[7.5px] uppercase tracking-[0.12em] text-[#121212]/70">
                    ALL-ACCESS CREATOR
                  </p>
                  <p className="font-sans font-extrabold text-[15px] sm:text-[16px] leading-[1.08] text-[#121212]">
                    Reza Fahmi
                    <br />
                    Alkhamdani
                  </p>
                  <p className="font-mono text-[8.5px] text-[#121212]/80 pt-0.5">
                    {EDITORIAL_PROFILE.handle}
                  </p>
                </div>

                <div className="col-span-6">
                  <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-right text-[#121212]/75 mb-1">
                    BACKSTAGE PASS:
                  </p>
                  <div className="aspect-[4/4.3] w-full rounded-[5px] overflow-hidden bg-[#F6F5F0] border-[1.5px] border-[#121212] shadow-sm relative">
                    <img
                      src={EDITORIAL_PROFILE.avatar}
                      alt={EDITORIAL_PROFILE.fullName}
                      className="w-full h-full object-cover pointer-events-none select-none"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Full Barcode Strip */}
              <div className="pt-2.5 border-t border-[#121212]/25 flex items-center justify-between gap-2">
                <span className="font-mono text-[7.5px] font-bold uppercase">IDN</span>
                <div className="flex-1 flex items-center justify-center gap-[2px] h-5 overflow-hidden">
                  {BARCODE_BARS.map((barWidth, idx) => (
                    <span
                      key={idx}
                      style={{ width: `${barWidth}px` }}
                      className="h-full bg-[#121212] inline-block shrink-0"
                    />
                  ))}
                </div>
                <span className="font-mono text-[7.5px] font-bold uppercase">&apos;26</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
