"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { sharedAudioContext } from "@/lib/sound";
import { sitarLevel } from "@/lib/sitar-level";
import { isPreviewPlaying, onPreviewChange } from "@/lib/preview-duck";
import { useRegistrationOpen } from "@/components/shared/RegisterCta";

const SRC = "/audio/sitar-loop.m4a";
const STORAGE_KEY = "fitoor:sitar";
/** Time constant of the gain glide; ~3x this to fully settle. */
const GLIDE_S = 0.25;
/** Long enough for the fade-out to finish before the element pauses. */
const PAUSE_AFTER_MS = 1000;

interface SitarGraph {
  el: HTMLAudioElement;
  /** Null without Web Audio; the element's own volume is used instead
   *  (which iOS ignores, so there it is simply on or off). */
  gain: GainNode | null;
  ctx: AudioContext | null;
}

function buildGraph(): SitarGraph {
  const el = new Audio(SRC);
  el.loop = true;
  el.preload = "auto";
  const ctx = sharedAudioContext();
  if (!ctx) return { el, gain: null, ctx: null };
  const gain = ctx.createGain();
  gain.gain.value = 0;
  ctx.createMediaElementSource(el).connect(gain).connect(ctx.destination);
  return { el, gain, ctx };
}

function glideTo({ el, gain, ctx }: SitarGraph, level: number): void {
  if (gain && ctx) gain.gain.setTargetAtTime(level, ctx.currentTime, GLIDE_S);
  else el.volume = level;
}

function readPreference(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === null ? sessionPreference : stored === "on";
  } catch {
    return sessionPreference; // Storage blocked (private mode, sandbox).
  }
}

/** Fallback when storage is blocked, so the toggle still works this visit. */
let sessionPreference = false;
const preferenceListeners = new Set<() => void>();

function savePreference(on: boolean): void {
  sessionPreference = on;
  try {
    localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    // Not remembering the choice across visits is fine.
  }
  preferenceListeners.forEach((listener) => listener());
}

function onPreferenceChange(listener: () => void): () => void {
  preferenceListeners.add(listener);
  return () => {
    preferenceListeners.delete(listener);
  };
}

function onVisibilityChange(listener: () => void): () => void {
  document.addEventListener("visibilitychange", listener);
  return () => document.removeEventListener("visibilitychange", listener);
}

const isTabHidden = (): boolean => document.hidden;
/** Server render: always quiet, visible and un-ducked; the client catches up after hydration. */
const serverOff = (): boolean => false;

/** Resolves on the visitor's next tap or key press, which browsers require before audio. */
function nextGesture(): Promise<void> {
  return new Promise((resolve) => {
    const done = () => {
      window.removeEventListener("pointerdown", done);
      window.removeEventListener("keydown", done);
      resolve();
    };
    window.addEventListener("pointerdown", done, { once: true });
    window.addEventListener("keydown", done, { once: true });
  });
}

/** Opt-in background sitar from the hero clip. Off by default and remembered
 *  per visitor; ducks under artist previews; pauses while the tab is hidden. */
export function SitarMusic() {
  const on = useSyncExternalStore(onPreferenceChange, readPreference, serverOff);
  const ducked = useSyncExternalStore(onPreviewChange, isPreviewPlaying, serverOff);
  const hidden = useSyncExternalStore(onVisibilityChange, isTabHidden, serverOff);
  const registerBarShowing = useRegistrationOpen();
  const graphRef = useRef<SitarGraph | null>(null);

  useEffect(() => {
    const audible = on && !hidden;
    if (!audible && !graphRef.current) return;
    graphRef.current ??= buildGraph();
    const graph = graphRef.current;
    glideTo(graph, sitarLevel({ muted: !audible, ducked }));
    if (!audible) {
      const timer = window.setTimeout(() => graph.el.pause(), PAUSE_AFTER_MS);
      return () => window.clearTimeout(timer);
    }
    let cancelled = false;
    const start = async () => {
      try {
        await graph.ctx?.resume();
        await graph.el.play();
      } catch (error: unknown) {
        const blocked = error instanceof DOMException && error.name === "NotAllowedError";
        if (!blocked) {
          console.warn("Sitar loop failed to play", error);
          return;
        }
        // A remembered "on" from a past visit: wait for the first tap.
        await nextGesture();
        if (!cancelled) void start();
      }
    };
    void start();
    return () => {
      cancelled = true;
    };
  }, [on, ducked, hidden]);

  useEffect(
    () => () => {
      graphRef.current?.el.pause();
    },
    [],
  );

  const toggle = () => savePreference(!on);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      className={cn(
        // Phones get a bare icon so it never sits on the hero's date line.
        "font-body fixed right-4 z-40 flex size-12 items-center justify-center gap-2 rounded-full border-2 text-sm font-bold shadow-[3px_3px_0_var(--rose)] transition-colors sm:w-auto sm:px-4 lg:bottom-6",
        // Clear the mobile register bar only while it is actually showing.
        registerBarShowing ? "bottom-20" : "bottom-[max(1rem,env(safe-area-inset-bottom))]",
        on
          ? "border-gold bg-gold text-maroon-deepest"
          : "border-gold/50 bg-maroon-deepest/90 text-gold backdrop-blur-sm hover:border-gold",
      )}
    >
      {on ? <Volume2 className="size-5" aria-hidden /> : <VolumeX className="size-5" aria-hidden />}
      <span className="sr-only sm:not-sr-only">sitar {on ? "on" : "off"}</span>
      <span className="sr-only"> (background music)</span>
    </button>
  );
}
