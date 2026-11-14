/** Whether an artist's song preview is playing, so background music can duck
 *  under it. A tiny module-level store: previews report in, the sitar listens. */

type PreviewListener = (playing: boolean) => void;

let previewing = false;
const listeners = new Set<PreviewListener>();

export function isPreviewPlaying(): boolean {
  return previewing;
}

/** Reports a preview starting or stopping; only a real change notifies. */
export function setPreviewPlaying(playing: boolean): void {
  if (playing === previewing) return;
  previewing = playing;
  listeners.forEach((listener) => listener(playing));
}

/** Subscribes to preview changes; returns the unsubscribe. */
export function onPreviewChange(listener: PreviewListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
