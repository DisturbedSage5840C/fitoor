# Fitoor 2026 — Zine-Storyline Redesign (Deep Amalgamation)

## Context

The previous pass (commits `74373ef`→`343246b`) blended four flat Figma accent colors into the site as subtle glows/dots. The user's next ask was a full escalation: use the Figma MCP tools to pull the *real* Fitoor brand guide, use the *real* mascot, take craft-level inspiration (not visual-style copying) from a reference site (Prayas) known for precise scroll-driven progressive disclosure, and design "the best UI/UX" with 3D, a proper storyline, and "zero AI-looking content" — explicitly caveated with "don't copy the style please."

Direct inspection of the real Figma file (fileKey `NIQUvxxjq6TF0KN11oE4tr`, section "Fitoor Brand Guide", 14 frames — captured via screenshots since `get_design_context` requires a live Figma desktop selection this environment doesn't have) revealed a much richer system than the 4 flat swatches used previously: a face-only mascot **logomark** distinct from our full-body mascot, a retro-futuristic rocket cover with Y2K space motifs, full 6-tint color ramps (not flat swatches), a DRUK/Montserrat/Amithen type system ("BE BOLD" / "BE CLEAR" / "be swift"), a richer category icon set, and — most importantly — a torn-paper/magazine-collage aesthetic (the "Mona Lisa" mood spread) that reads as a distinct, ownable visual language, not just color accents.

Four scope decisions were confirmed with the user via `AskUserQuestion` (superseding the standing "no full reskin" default for this pass, per explicit confirmation):

1. **Deep amalgamation** — maroon/gold + the existing hand-drawn full-body mascot stay the base identity; DRUK-style type, the collage/zine aesthetic, the real face-logomark, and full color ramps become load-bearing design devices throughout, not accents.
2. **Full-site scope** — every page gets the treatment, adapted down in intensity on content-dense pages (schedule, events) so information stays legible.
3. **Full WebGL scroll experience** — the user explicitly chose react-three-fiber over a CSS-only approach, despite this being a mobile-heavy fest audience and zero 3D infra existing today. This carries real perf risk (see Phase 6), mitigated with capability-gating and static-first fallbacks, not argued against.
4. **Zine/brand-guide unfolding** as the narrative device — scrolling should feel like flipping through the actual Fitoor brand guide as a chaotic zine.

A background Plan agent (with full codebase + Figma context) then designed the concrete approach below. It re-verified the current implementation directly and found two things worth flagging: `public/` doesn't exist yet (the entire visual system today is procedural SVG/CSS, zero binary assets committed), and `.font-display` currently maps to Baloo 2 and is used pervasively — so introducing DRUK is a *remap* of an existing utility, not a new one.

## Design system extension

**Fonts** (`lib/fonts.ts`, `app/globals.css`): remap `.font-display` (Baloo 2 → DRUK) rather than adding a parallel class, so every existing call site (`SectionHeading`, `Hero`, `EventCard`, `ScheduleRow`) upgrades automatically. DRUK and Amithen are commercial/non-Google fonts — load via `next/font/local` with a bold-condensed / bold-cursive system fallback stack wired into the `fallback` array, so the build never breaks if font files aren't available in time; demote Baloo 2 to `.font-display-fallback`. Add Montserrat as a new `.font-body-alt` (surgical use for zine-page "documentation" captions, not a blanket Inter replacement — Inter already reads fine). Add Amithen as `.font-script` for zine accents. Keep `.font-wordmark` (Playfair) reserved exclusively for the literal "fitoor" logotype — don't let DRUK bleed into that slot, or the two brand marks will muddy each other. Respect the documented circular-resolution comment at the top of `globals.css` (plain CSS utilities, not `@theme`).

**Color ramps** (`app/globals.css`): add the real 6-tint Figma ramps (`--apricot-100…600`, `--sunset-100…600`, `--magenta-100…600`, `--blue-100…600`) as new, additive `:root` properties, exposed via `@theme inline` as `bg-apricot-200` etc. Keep the 4 existing flat tokens as aliases (`--apricot: var(--apricot-500)`) so `Hero.tsx`'s glow blobs and `MascotSVG.tsx`'s lens gradients keep working unchanged — zero breakage.

**Spacing ("rule of 8s")**: no scale rewrite needed — Tailwind v4's base-4 scale already hits 8-multiples on even steps. Just a documented discipline (comment block in `globals.css`): use even spacing steps for zine-grid layout, odd steps only for hairline/texture details.

## The zine/collage system (new `components/zine/`)

A small set of reusable primitives, built procedurally (CSS `clip-path` + SVG `feTurbulence`/`feDisplacementMap`, reusing the noise-filter technique already proven in `Grain.tsx` — no new bitmap assets needed for these):

- **`TornEdge.tsx`** — jagged torn-paper edge on any side, seeded per instance so repeated use doesn't look copy-pasted.
- **`CollageCard.tsx`** — rotated Polaroid/cutout card (seeded rotation, drop shadow, optional tape corner), composes `TornEdge`. Becomes the wrapper for `EventCard` on dense pages (low intensity — slight rotation/torn top edge, not full chaos) and homepage collage tiles.
- **`ClippingText.tsx`** — magazine-clipping text treatment (per-word font/rotation jitter), used sparingly for hero taglines/transitions only — restraint matters for the "not AI-generic" goal.
- **`SpacingDivider.tsx`** — torn-paper section divider with a pixel-font page tag ("PG. 04"), reusing the existing eyebrow-label convention. Used between sections on content pages to carry the guide metaphor without re-narrating the whole page.

**Compatibility rule (critical):** `RevealOnScroll` gets a new `variant?: "fade" | "torn" | "flip" | "collage-in"` prop, defaulting to `"fade"` — every existing call site across about/accommodation/contact/events/generalities/schedule keeps working unchanged. `SectionHeading` gets a new `frame?: "plain" | "zine"` prop (default `"plain"`) that wraps the existing tricolor-dot eyebrow in a rotated stamp look — reusing the motif that's already site-wide rather than inventing a second one. Neither primitive is replaced, both are extended.

**Real assets needed (Phase 0, time-sensitive):** the Mona Lisa collage art and the rocket illustration are specific brand pieces that shouldn't be re-illustrated (that itself risks reading as generic/AI). Export both via the Figma MCP tools and commit to a new `public/brand/` directory immediately — Figma MCP asset URLs expire ~7 days, so this cannot be deferred to a later phase.

## The mascot: two marks, one rule

- **Full-body mascot** (`MascotSVG.tsx` + `Mascot.tsx` parallax, unchanged) = the *character* — used wherever the mascot is doing something narrative (hero, homepage storyline beats).
- **Face-only logomark** (new, exported from Figma per Phase 0 — 4 color treatments) = the *seal* — used for favicon, nav mark, zine-divider stamps, WebGL-canvas loading states.
- **Never both in the same viewport doing the same job.** New thin component `components/mascot/MascotFaceLogomark.tsx`, ideally auto-selecting its color treatment from the ambient `--category` context like other components already do.

## The WebGL/3D layer

**Risk flag (surfaced, not argued):** react-three-fiber adds 150–300KB+ gzipped to a currently lean bundle; low/mid-tier Android throttles WebGL hard; iOS Safari caps simultaneous WebGL contexts. Building to the user's explicit choice, mitigated as follows — never skipped.

**Where it lives:** all scene code in `components/three/`, loaded via `next/dynamic(..., { ssr: false })` from server-component pages, wrapped by a single shared `CanvasGate.tsx` that handles lazy-mount (IntersectionObserver, `rootMargin: "200px"`), unmount-when-scrolled-away (only one canvas live at a time), device-tier + `prefers-reduced-motion` + WebGL-support gating (matching the existing `useReducedMotion` pattern already proven in `Mascot.tsx`), and capped DPR (`[1, 1.5]` max).

**Exactly 3 scenes, not "everywhere":**
1. Hero — rocket/starfield scroll-linked parallax, replacing the current flat gradient-blob glow (which itself reads as generic-AI-SaaS).
2. Homepage storyline transition — a zine page peeling off-screen in 3D between the "mascot reveal" and "colors" beats — the one moment that literally embodies the guide-flipping narrative in true 3D.
3. `/events` index only — a rotating cluster of the Figma category icon-tiles.

No WebGL on schedule, contact, generalities, accommodation, or `/events/[category]` — those stay CSS/zine-only per the full-site-but-adapted-intensity decision. Every scene has a hand-authored static CSS/SVG equivalent as the *default* rendered content (not a spinner), so there's no broken-until-JS moment and no phase-6 dependency for the rest of the site to ship.

**New dependencies:** `three`, `@react-three/fiber`, `@react-three/drei` (import only the specific helpers used, not the whole package).

## Storyline structure per page

**Homepage** — restructured into a 7-beat sequential arc: Cover (Hero + rocket/starfield) → Mascot reveal (existing `Mascot.tsx`, re-staged with `TornEdge`/`CollageCard`) → Colors (new `ColorRamps.tsx` swatch strip) → Typography (new `TypeSpecimen.tsx`, "BE BOLD/BE CLEAR/be swift") → Icons (existing `categoryIcons`) → Collage moment (new `CollageMoment.tsx`, Mona Lisa asset + WebGL page-turn transition) → CTA (existing `ContentsNav.tsx`, reframed as the guide's "contents page").

**Content-dense pages** (schedule, events/[category], contact) — the metaphor becomes a consistent *frame*, not a re-narrated journey: `SpacingDivider` between sections, `SectionHeading frame="zine"`, `EventCard`/`ScheduleRow` wrapped in low-intensity `CollageCard`, no WebGL.

**About/generalities/accommodation** — treated as single "guide-page spreads": one zine-framed heading, one or two `CollageCard` content blocks, `SpacingDivider` between subsections, moderate `ClippingText` for pull-quotes.

**`/events` index** — the one content page that gets a 3D centerpiece, since it's lighter-density than the category/schedule pages.

## "Zero AI-looking content" — concrete fixes, not a vibe

- `Hero.tsx`'s radial-gradient blur blobs are the canonical generic-AI-landing-page signature — replaced by the WebGL starfield/rocket (with a torn-paper/collage static fallback, never a soft blur fallback).
- `EventCard`'s uniform rounded-corner grid risks template monotony — wrapped in seeded-rotation `CollageCard` so no two cards look stamped identically, without touching the actual information layout.
- No new soft-blur gradient orbs anywhere; no symmetric centered-hero-plus-two-CTA-plus-blob shape for any new section; favor asymmetric splits and rotated/overlapping compositions (the existing `1.1fr/0.9fr` hero grid is the right instinct, extend it); any 3D object must be a recognizable brand asset (rocket, icon tiles) — never an abstract floating-primitive decoration.

## Build sequencing (each phase independently shippable)

0. **Asset prep (blocking)** — export/commit rocket + Mona Lisa collage + 4 mascot-face treatments to `public/brand/`; confirm DRUK/Amithen licensing or lock in fallback stacks.
1. **Tokens & fonts** — `app/globals.css`, `lib/fonts.ts`. Additive/aliased, no visual regression on existing pages.
2. **Zine primitives** — `components/zine/*`, extend `RevealOnScroll`/`SectionHeading`. Build and sanity-check in isolation.
3. **Mascot logomark** — `MascotFaceLogomark.tsx`, favicon, Navbar.
4. **Homepage storyline** — full 7-beat arc using only Phase 1–3 primitives; static imagery standing in for WebGL scenes so the homepage is fully shippable before Phase 6.
5. **Propagate the frame** — about, schedule, events index, events/[category], generalities, accommodation, contact.
6. **WebGL layer** — new dependencies, `CanvasGate.tsx`, the 3 scenes, wired in behind the static fallbacks already shipped in Phase 4 — can slip or be cut without blocking anything else.
7. **Polish & verification.**

## Critical files

- `app/globals.css`, `lib/fonts.ts` — tokens, ramps, fonts
- `components/shared/RevealOnScroll.tsx`, `components/shared/SectionHeading.tsx` — extended, not replaced
- `components/zine/*` (new) — `TornEdge`, `CollageCard`, `ClippingText`, `SpacingDivider`
- `components/mascot/MascotSVG.tsx` (untouched, reference), `components/mascot/MascotFaceLogomark.tsx` (new)
- `components/home/Hero.tsx`, `app/page.tsx`, plus new `components/home/ColorRamps.tsx`, `TypeSpecimen.tsx`, `CollageMoment.tsx`
- `components/events/EventCard.tsx`
- `components/three/*` (new, Phase 6) — `CanvasGate.tsx`, `RocketStarfield.tsx`, `PageTurn.tsx`, `IconCluster.tsx`
- `package.json` — new deps in Phase 6 only

## Verification

- `npm run build` after every phase — catches font-loading regressions and RSC/client-boundary mistakes early.
- Dev-server visual walk of all 8 routes after every phase, including at least 2 `/events/[category]` slugs to confirm `data-category` restyling still resolves through the new components.
- Reduced-motion OS toggle re-walk — confirm every `RevealOnScroll` variant, the mascot parallax, and (Phase 6) all WebGL canvases fall back to static.
- Mobile-viewport check (mid-tier Android emulation, not just iPhone) on hero/homepage/events-index — confirm capped DPR, lazy-mount, and a real static fallback (not a blank canvas) under a simulated no-WebGL profile.
- Lighthouse mobile pass on `/` before and after Phase 6, comparing LCP/TBT/bundle-size deltas — the concrete check against the WebGL perf risk.
- Font-fallback check — simulate DRUK/Amithen load failure, confirm no layout break.
- Before sign-off: grep the repo for any live Figma asset URLs to confirm nothing depends on an expired link.
- Once approved, commit and push under the user's own git identity (Marutey Mani / maruteymani31@gmail.com) with no Claude attribution, per repo instruction — this overrides the generic Claude Code attribution reminder.
