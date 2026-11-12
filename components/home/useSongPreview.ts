"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type PreviewState = "idle" | "loading" | "playing" | "blocked";

const TARGET_VOLUME = 0.6;
const FADE_MS = 400;

/** Only one poster sings at a time: starting one silences whichever was playing. */
let nowPlaying: HTMLAudioElement | null = null;

function fadeIn(audio: HTMLAudioElement): void {
  const start = performance.now();
  audio.volume = 0;
  const step = (t: number) => {
    const progress = Math.min((t - start) / FADE_MS, 1);
    audio.volume = TARGET_VOLUME * progress;
    if (progress < 1 && !audio.paused) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/**
 * Plays a 30-second preview clip. Hover starts it on mouse devices; a tap or click
 * toggles it everywhere. Browsers refuse audio before the visitor has interacted
 * with the page, so a refused hover shows a "tap to play" hint instead of failing.
 */
export function useSongPreview(src: string | undefined) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hoverStarted = useRef(false);
  const [state, setState] = useState<PreviewState>("idle");

  const getAudio = useCallback((): HTMLAudioElement | null => {
    if (!src) return null;
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.preload = "none";
      audio.addEventListener("ended", () => setState("idle"));
      audio.addEventListener("pause", () => setState((s) => (s === "blocked" ? s : "idle")));
      audioRef.current = audio;
    }
    return audioRef.current;
  }, [src]);

  const play = useCallback(
    (fromHover: boolean) => {
      const audio = getAudio();
      if (!audio) return;
      if (nowPlaying && nowPlaying !== audio) nowPlaying.pause();
      nowPlaying = audio;
      hoverStarted.current = fromHover;
      setState("loading");
      audio
        .play()
        .then(() => {
          fadeIn(audio);
          setState("playing");
        })
        .catch((error: unknown) => {
          // NotAllowedError is the autoplay policy; anything else is a network or decode failure.
          const blocked = error instanceof DOMException && error.name === "NotAllowedError";
          setState(blocked ? "blocked" : "idle");
        });
    },
    [getAudio],
  );

  const stop = useCallback(() => {
    audioRef.current?.pause();
    setState("idle");
  }, []);

  const onHoverStart = useCallback(
    (pointerType: string) => {
      if (pointerType === "mouse" && state === "idle") play(true);
    },
    [play, state],
  );

  const onHoverEnd = useCallback(() => {
    if (hoverStarted.current) stop();
    else if (state === "blocked") setState("idle");
  }, [state, stop]);

  const toggle = useCallback(() => {
    if (state === "playing" || state === "loading") stop();
    else play(false);
  }, [play, state, stop]);

  useEffect(
    () => () => {
      audioRef.current?.pause();
      audioRef.current = null;
    },
    [],
  );

  return { state, onHoverStart, onHoverEnd, toggle };
}
