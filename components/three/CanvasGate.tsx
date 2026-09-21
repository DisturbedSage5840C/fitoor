"use client";

import { useEffect, useId, useRef, useState } from "react";
import { activateCanvas, deactivateCanvas } from "./canvas-registry";

const LOW_TIER_CORES = 4;
const LOW_TIER_MEMORY_GB = 4;

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

function detectCapability() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = navigator as NavigatorWithMemory;
  const lowTier =
    (nav.hardwareConcurrency ?? 8) < LOW_TIER_CORES ||
    (nav.deviceMemory ?? 8) < LOW_TIER_MEMORY_GB;

  let webgl = false;
  try {
    const canvas = document.createElement("canvas");
    webgl = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    webgl = false;
  }

  return { capable: webgl && !reducedMotion && !lowTier };
}

/**
 * Gates a WebGL scene behind: lazy IntersectionObserver mount (200px
 * rootMargin), device-tier + reduced-motion + WebGL-support checks, and the
 * canvas-registry single-live-canvas rule. Renders `fallback` (a real static
 * CSS/SVG equivalent, never a spinner) until — and unless — the scene is
 * actually going to render.
 */
export function CanvasGate({
  children,
  fallback,
  className,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
  className?: string;
}) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [capable, setCapable] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setCapable(detectCapability().capable);
  }, []);

  useEffect(() => {
    if (!capable) return;
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "200px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [capable]);

  const shouldRender = capable && inView;

  useEffect(() => {
    if (shouldRender) {
      activateCanvas(id, () => setInView(false));
    } else {
      deactivateCanvas(id);
    }
    return () => deactivateCanvas(id);
  }, [shouldRender, id]);

  return (
    <div ref={rootRef} className={className}>
      {shouldRender ? children : fallback}
    </div>
  );
}
