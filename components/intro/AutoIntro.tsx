"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FRAME_COUNT, frameSrc } from "@/components/mascot/MascotSequence";

/** Once-per-session flag, written when the intro ends (played or skipped). */
const SEEN_KEY = "fitoor-intro-seen";
const ROOT_ID = "auto-intro";

const FPS = 24;
/** The clip idles on the spot until this moment, then drives off. */
const HOLD_T = 23 / FPS;
/** Never keep anyone waiting longer than this, whatever is still loading. */
const CAP_MS = 6000;
const MIN_MS = 1000;
const SKIP_AFTER_MS = 1000;
/** Curtain edge sits this far (fraction of width) right of the banner tip. */
const EDGE_MARGIN = 0.006;

/** Rightmost opaque column of the banner in every frame, as a 0–1 fraction of
 *  the clip width. The curtain is clipped to this so the site is revealed
 *  exactly as the banner's trailing edge leaves each part of the screen. */
const BANNER_EDGE = [
  0.991, 0.991, 0.991, 0.991, 0.991, 0.991, 0.991, 0.991, 0.99, 0.989, 0.989, 0.989,
  0.989, 0.99, 0.989, 0.989, 0.989, 0.989, 0.99, 0.99, 0.99, 0.991, 0.991, 0.991,
  0.991, 0.991, 0.99, 0.989, 0.987, 0.987, 0.986, 0.984, 0.983, 0.981, 0.979, 0.976,
  0.974, 0.972, 0.968, 0.967, 0.963, 0.959, 0.956, 0.951, 0.946, 0.941, 0.937, 0.93,
  0.924, 0.919, 0.911, 0.907, 0.899, 0.893, 0.886, 0.879, 0.871, 0.862, 0.853, 0.843,
  0.834, 0.824, 0.813, 0.802, 0.793, 0.78, 0.769, 0.756, 0.745, 0.733, 0.72, 0.707,
  0.695, 0.679, 0.665, 0.65, 0.634, 0.619, 0.603, 0.587, 0.57, 0.554, 0.538, 0.521,
  0.505, 0.486, 0.468, 0.451, 0.434, 0.415, 0.397, 0.378, 0.361, 0.342, 0.324, 0.305,
  0.289, 0.269, 0.251, 0.233, 0.215, 0.196, 0.179, 0.161, 0.144, 0.127, 0.111, 0.095,
  0.081, 0.063, 0.049, 0.035, 0.022, 0.0,
];

function edgeAt(time: number) {
  const f = Math.min(BANNER_EDGE.length - 1, Math.max(0, time * FPS));
  const i = Math.floor(f);
  const a = BANNER_EDGE[i];
  const b = BANNER_EDGE[Math.min(BANNER_EDGE.length - 1, i + 1)];
  return a + (b - a) * (f - i);
}

/** Skip conditions, shared by the pre-paint script and the mount effect. */
const skipCheck = `try{return sessionStorage.getItem("${SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}`;

/** Runs while the HTML is parsed, so returning visitors and reduced-motion
 *  users never see the curtain paint. The timeout is a last-resort escape
 *  hatch in case client JS never takes over. */
const PRE_PAINT = `(function(){var el=document.getElementById("${ROOT_ID}");if(!el)return;function hide(){el.style.display="none"}if((function(){${skipCheck}})())hide();else setTimeout(function(){if(el.dataset.ready!=="1")hide()},${CAP_MS + 4000})})()`;

function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** WebKit plays the HEVC-with-alpha .mov; everything else gets VP9 alpha WebM. */
function pickSource() {
  const ua = navigator.userAgent;
  const webkit =
    /iP(hone|ad|od)/.test(ua) ||
    (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua)) ||
    (/Safari\//.test(ua) && !/Chrome|Chromium|Android|Firefox/.test(ua));
  return webkit ? "/intro/ride.mov" : "/intro/ride.webm";
}

function lockScroll() {
  const stop = (e: Event) => e.preventDefault();
  const keys = new Set([" ", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown"]);
  const onKey = (e: KeyboardEvent) => {
    if (keys.has(e.key)) e.preventDefault();
  };
  window.addEventListener("wheel", stop, { passive: false });
  window.addEventListener("touchmove", stop, { passive: false });
  window.addEventListener("keydown", onKey);
  return () => {
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchmove", stop);
    window.removeEventListener("keydown", onKey);
  };
}

const INERT_SELECTOR = "body > header, body > footer, main";

function setInert(on: boolean) {
  document.querySelectorAll(INERT_SELECTOR).forEach((el) => {
    if (on) el.setAttribute("inert", "");
    else el.removeAttribute("inert");
  });
}

/** Full-screen auto-rickshaw intro for the home page. An alpha video plays
 *  over a dark-maroon curtain; once critical assets are in, the auto drives
 *  off and the curtain is wiped away along the banner's trailing edge. */
export function AutoIntro() {
  // Only a hard load on "/" ever plays it; later client navigations do not.
  const pathname = usePathname();
  const [startedOnHome] = useState(pathname === "/");
  const [active, setActive] = useState(startedOnHome);
  const [src, setSrc] = useState<string | null>(null);
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!active) return;
    const root = rootRef.current;
    if (!root) return;

    let skip = false;
    try {
      skip =
        !!sessionStorage.getItem(SEEN_KEY) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}
    if (skip) {
      setActive(false);
      return;
    }

    root.dataset.ready = "1";
    setSrc(pickSource());
    setInert(true);
    const unlockScroll = lockScroll();

    let raf = 0;
    let done = false;
    let go = false;
    let shown = 0;
    let lastPct = -1;
    let goAt = 0;
    let lastTime = -1;
    let stalledSince = 0;
    const t0 = performance.now();

    // Warm the hero's frame sequence (cached for when the hero mounts) and
    // count it towards progress.
    let framesLoaded = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = img.onerror = () => {
        framesLoaded++;
      };
      img.src = frameSrc(i);
    }

    const finish = (fade: boolean) => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      unlockScroll();
      setInert(false);
      window.removeEventListener("keydown", onEsc);
      const end = () => setActive(false);
      if (fade) {
        setLeaving(true);
        window.setTimeout(end, 450);
      } else end();
    };
    finishRef.current = () => finish(true);
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish(true);
    };
    window.addEventListener("keydown", onEsc);
    const skipTimer = window.setTimeout(() => setShowSkip(true), SKIP_AFTER_MS);

    const tick = (now: number) => {
      const v = videoRef.current;
      const elapsed = now - t0;

      let vp = 0;
      if (v) {
        if (v.readyState >= 4) vp = 1;
        else if (v.buffered.length && Number.isFinite(v.duration) && v.duration > 0) {
          vp = Math.min(1, v.buffered.end(v.buffered.length - 1) / v.duration);
        }
      }
      const failed = !!v?.error;
      const target = (failed ? 1 : vp) * 0.4 + (framesLoaded / FRAME_COUNT) * 0.6;
      // Ease the counter so it never jumps, and let time alone move it a
      // little so a stalled network still looks alive.
      shown += (Math.max(target, Math.min(0.85, elapsed / CAP_MS)) - shown) * 0.12;
      const next = go ? 100 : Math.min(99, Math.floor(shown * 100));
      if (next !== lastPct) {
        lastPct = next;
        setPct(next);
      }

      if (!go) {
        // Idle on the hold pose until everything is ready.
        if (v && !v.paused && v.currentTime >= HOLD_T) v.pause();
        const assetsReady = target >= 0.999 && shown > 0.97;
        const ready = (assetsReady && elapsed >= MIN_MS) || elapsed >= CAP_MS;
        if (ready) {
          if (!v || failed) {
            finish(true);
            return;
          }
          go = true;
          goAt = now;
          setPct(100);
          v.play().catch(() => finish(true));
        }
      } else if (v) {
        const t = v.currentTime;
        const e = edgeAt(t);
        root.style.clipPath = `inset(0 ${Math.max(0, 1 - Math.min(1, e + EDGE_MARGIN)) * 100}% 0 0)`;
        if (v.ended || (t > HOLD_T + 0.5 && e <= 0.001)) {
          finish(false);
          return;
        }
        // Watchdog: playback that never advances (autoplay blocked, decode
        // stall) must not trap anyone behind the curtain.
        if (t !== lastTime) {
          lastTime = t;
          stalledSince = now;
        } else if (now - Math.max(stalledSince, goAt) > 2500) {
          finish(true);
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      done = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(skipTimer);
      window.removeEventListener("keydown", onEsc);
      unlockScroll();
      setInert(false);
    };
  }, [active]);

  if (!startedOnHome || !active) return null;

  return (
    <>
      <div
        id={ROOT_ID}
        ref={rootRef}
        role="region"
        aria-label="Fitoor '26 intro"
        suppressHydrationWarning
        className={`fixed inset-0 z-[100] overflow-hidden bg-[radial-gradient(ellipse_at_50%_55%,#2a0a0f_0%,#0e0305_72%)] transition-opacity duration-[450ms] ${
          leaving ? "opacity-0" : "opacity-100"
        }`}
      >
        {src && (
          <video
            ref={videoRef}
            key={src}
            className="pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2"
            style={{ aspectRatio: "1264 / 560" }}
            src={src}
            poster="/intro/poster.webp"
            muted
            autoPlay
            playsInline
            preload="auto"
            aria-hidden
          />
        )}

        <p
          className={`font-serif-dev absolute inset-x-0 bottom-[12%] px-4 text-center text-sm tracking-wide text-gold/80 transition-opacity duration-300 sm:text-base ${
            pct >= 100 ? "opacity-0" : "opacity-100"
          }`}
        >
          फ़ितूर लोड हो रहा है… <span className="font-body tabular-nums">{pct}%</span>
        </p>
      </div>

      <button
        type="button"
        onClick={() => finishRef.current()}
        tabIndex={showSkip ? 0 : -1}
        className={`font-body fixed top-4 right-4 z-[101] rounded-full border border-cream/30 px-5 py-3 text-xs font-semibold tracking-[0.2em] text-cream/80 uppercase transition-all hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none ${
          showSkip && !leaving ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        Skip
      </button>
      <InlineScript html={PRE_PAINT} />
    </>
  );
}
