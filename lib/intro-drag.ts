/** Hit-testing for the dragged teeli on the landing-page loader. Pure so the
 *  rules can be tested without a browser. */

export interface Point {
  x: number;
  y: number;
}

export interface Box {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/** How far the head must rub along the striker, in total, to catch. */
export const STRIKE_TRAVEL_PX = 70;
/** Slack around the striker strip so a finger need not be pixel-perfect. */
export const STRIKER_PAD_PX = 12;
/** The flame lights the invite once its head is this close to the wick. */
export const LIGHT_RADIUS_PX = 36;

/** The wick: the bottom-left marigold, in the envelope art's 420x270 viewBox. */
const WICK_VIEWBOX = { x: 26, y: 244, width: 420, height: 270 } as const;

export function isInside(p: Point, box: Box, pad: number = 0): boolean {
  return (
    p.x >= box.left - pad &&
    p.x <= box.right + pad &&
    p.y >= box.top - pad &&
    p.y <= box.bottom + pad
  );
}

/** Running strike distance: grows with every sideways rub on the striker and
 *  drops back to zero as soon as the head leaves it. */
export function strikeTravel(travel: number, from: Point, to: Point, striker: Box): number {
  const onStriker = isInside(from, striker, STRIKER_PAD_PX) && isInside(to, striker, STRIKER_PAD_PX);
  return onStriker ? travel + Math.abs(to.x - from.x) : 0;
}

export function isTouching(head: Point, wick: Point, radius: number = LIGHT_RADIUS_PX): boolean {
  return Math.hypot(head.x - wick.x, head.y - wick.y) <= radius;
}

/** Screen position of the wick for the envelope's on-screen box. */
export function wickPoint(envelope: Box): Point {
  const width = envelope.right - envelope.left;
  const height = envelope.bottom - envelope.top;
  return {
    x: envelope.left + (width * WICK_VIEWBOX.x) / WICK_VIEWBOX.width,
    y: envelope.top + (height * WICK_VIEWBOX.y) / WICK_VIEWBOX.height,
  };
}
