/** The background sitar's loudness: low enough to sit behind the page. */
export const SITAR_VOLUME = 0.35;
/** Under an artist's song preview, so the two never fight. */
export const DUCKED_VOLUME = 0.06;

export interface SitarMix {
  muted: boolean;
  ducked: boolean;
}

/** The gain the sitar should fade to for the visitor's choice and what else is playing. */
export function sitarLevel({ muted, ducked }: SitarMix): number {
  if (muted) return 0;
  return ducked ? DUCKED_VOLUME : SITAR_VOLUME;
}
