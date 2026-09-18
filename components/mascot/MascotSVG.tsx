import type { Ref } from "react";

export interface MascotLayerRefs {
  glow?: Ref<SVGGElement>;
  body?: Ref<SVGGElement>;
  hair?: Ref<SVGGElement>;
  jewelry?: Ref<SVGGElement>;
  glasses?: Ref<SVGGElement>;
  prop?: Ref<SVGGElement>;
}

interface MascotSVGProps {
  className?: string;
  layerRefs?: MascotLayerRefs;
}

const SKIN = "#b5754a";
const SKIN_SHADE = "#9a5f39";
const HAIR = "#1c1116";

/**
 * "Fitoor Aunty" — hand-authored layered mascot. Grouped into
 * glow|body|hair|jewelry|glasses|prop depth layers so a parallax wrapper
 * (components/home/Mascot.tsx) can translate each one independently for a
 * pseudo-3D effect. This component itself stays static/presentational —
 * no motion, no "use client" — so it renders identically on the server
 * and can be sanity-checked at any size on its own.
 */
export function MascotSVG({ className, layerRefs }: MascotSVGProps) {
  return (
    <svg
      viewBox="0 0 360 420"
      className={className}
      role="img"
      aria-label="Fitoor mascot — an illustrated desi aunty wearing oversized sunglasses, gold jhumkas, and holding a boombox"
    >
      <defs>
        <radialGradient id="mascot-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="var(--category)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--category)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mascot-blouse" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--category-light)" />
          <stop offset="100%" stopColor="var(--category)" />
        </linearGradient>
        <clipPath id="mascot-lens-left">
          <path d="M112 148 C112 132 130 124 150 128 C166 131 172 140 172 150 C172 164 160 172 142 172 C124 172 112 162 112 148 Z" />
        </clipPath>
        <clipPath id="mascot-lens-right">
          <path d="M248 148 C248 132 230 124 210 128 C194 131 188 140 188 150 C188 164 200 172 218 172 C236 172 248 162 248 148 Z" />
        </clipPath>
      </defs>

      {/* glow */}
      <g ref={layerRefs?.glow} data-layer="glow">
        <ellipse cx="180" cy="170" rx="170" ry="190" fill="url(#mascot-glow)" />
      </g>

      {/* body: shoulders, neck, head, boat-neck blouse */}
      <g ref={layerRefs?.body} data-layer="body">
        <path
          d="M60 420 C58 330 90 275 150 262 L210 262 C270 275 302 330 300 420 Z"
          fill="url(#mascot-blouse)"
        />
        <path
          d="M150 262 L210 262 L204 290 C194 300 166 300 156 290 Z"
          fill={SKIN_SHADE}
        />
        <rect x="158" y="205" width="44" height="65" rx="18" fill={SKIN} />
        <circle cx="180" cy="150" r="64" fill={SKIN} />
        <path
          d="M120 160 C120 118 146 90 180 90 C214 90 240 118 240 160 L240 168 C224 150 210 176 180 176 C150 176 136 150 120 168 Z"
          fill={SKIN_SHADE}
          opacity="0.35"
        />
      </g>

      {/* hair: bouffant bun + face-framing volume */}
      <g ref={layerRefs?.hair} data-layer="hair">
        <path
          d="M180 74 C232 74 258 112 254 156 C250 140 236 128 220 124 C224 108 210 92 180 92 C150 92 136 108 140 124 C124 128 110 140 106 156 C102 112 128 74 180 74 Z"
          fill={HAIR}
        />
        <ellipse cx="180" cy="68" rx="46" ry="28" fill={HAIR} />
        <path
          d="M112 150 C104 176 106 206 122 226 C112 202 114 176 122 158 Z"
          fill={HAIR}
        />
        <path
          d="M248 150 C256 176 254 206 238 226 C248 202 246 176 238 158 Z"
          fill={HAIR}
        />
      </g>

      {/* jewelry: bindi, jhumkas, layered necklace, bangles */}
      <g ref={layerRefs?.jewelry} data-layer="jewelry">
        <circle cx="180" cy="120" r="6" fill="var(--gold)" />
        <path d="M180 108 L184 116 L176 116 Z" fill="var(--gold)" />

        <g transform="translate(124 178)">
          <circle r="6" fill="var(--gold-bright)" />
          <path d="M-5 6 L5 6 L3 26 L-3 26 Z" fill="var(--gold)" />
          <circle cy="30" r="5" fill="var(--gold-bright)" />
        </g>
        <g transform="translate(236 178)">
          <circle r="6" fill="var(--gold-bright)" />
          <path d="M-5 6 L5 6 L3 26 L-3 26 Z" fill="var(--gold)" />
          <circle cy="30" r="5" fill="var(--gold-bright)" />
        </g>

        <path
          d="M148 268 C160 282 200 282 212 268"
          stroke="var(--gold)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M142 280 C158 300 202 300 218 280"
          stroke="var(--gold-bright)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="180" cy="300" r="6" fill="var(--gold-bright)" />
      </g>

      {/* glasses: oversized Y2K cat-eye sunglasses, tricolor lenses matching
          the Figma "Fitoor '26" mascot (teal / gold / coral lens bands) */}
      <g ref={layerRefs?.glasses} data-layer="glasses">
        <g clipPath="url(#mascot-lens-left)">
          <rect x="106" y="118" width="22" height="60" fill="var(--dance)" />
          <rect x="128" y="118" width="22" height="60" fill="var(--gold)" />
          <rect x="150" y="118" width="28" height="60" fill="var(--sunset)" />
        </g>
        <g clipPath="url(#mascot-lens-right)">
          <rect x="182" y="118" width="28" height="60" fill="var(--sunset)" />
          <rect x="210" y="118" width="22" height="60" fill="var(--gold)" />
          <rect x="232" y="118" width="22" height="60" fill="var(--dance)" />
        </g>

        <path
          d="M112 148 C112 132 130 124 150 128 C166 131 172 140 172 150 C172 164 160 172 142 172 C124 172 112 162 112 148 Z"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="4"
        />
        <path
          d="M248 148 C248 132 230 124 210 128 C194 131 188 140 188 150 C188 164 200 172 218 172 C236 172 248 162 248 148 Z"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="4"
        />
        <path
          d="M172 146 C176 142 184 142 188 146"
          stroke="var(--gold)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M110 150 C104 148 98 148 94 152"
          stroke="var(--gold)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M250 150 C256 148 262 148 266 152"
          stroke="var(--gold)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* prop: retro boombox, tilted at the hip */}
      <g ref={layerRefs?.prop} data-layer="prop" transform="translate(246 300) rotate(-10)">
        <rect x="-58" y="-38" width="116" height="76" rx="14" fill="#211418" stroke="var(--gold)" strokeWidth="3" />
        <path d="M-40 -38 C-40 -54 40 -54 40 -38" stroke="var(--gold)" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="-32" cy="0" r="22" fill="#120a0c" stroke="var(--gold)" strokeWidth="3" />
        <circle cx="-32" cy="0" r="10" fill="#2c1a20" />
        <circle cx="32" cy="0" r="22" fill="#120a0c" stroke="var(--gold)" strokeWidth="3" />
        <circle cx="32" cy="0" r="10" fill="#2c1a20" />
        <rect x="-8" y="-14" width="16" height="10" rx="2" fill="var(--category-light)" />
        <rect x="-6" y="2" width="4" height="14" fill="var(--gold)" />
        <rect x="1" y="6" width="4" height="10" fill="var(--gold-bright)" />
        <rect x="8" y="0" width="4" height="16" fill="var(--gold)" />
      </g>
    </svg>
  );
}
