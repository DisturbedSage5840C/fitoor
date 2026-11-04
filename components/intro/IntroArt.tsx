import { fest } from "@/data/content";

/** Marigold cluster for the envelope corners. */
function Marigold({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="9" fill="#f08a1c" />
      <circle r="6" fill="#ffb02e" />
      <circle r="2.5" fill="#c8203f" />
    </g>
  );
}

/** The invite: a haldi-yellow envelope with a wax seal and a gig-ticket stub. */
export function Envelope() {
  return (
    <svg viewBox="0 0 420 270" className="h-auto w-full drop-shadow-[0_18px_0_rgba(28,4,7,0.45)]">
      <rect x="1" y="1" width="418" height="268" rx="6" fill="#e3b23c" stroke="#9c6a1e" strokeWidth="2" />
      <polygon points="0,270 210,138 420,270" fill="#d9a432" />
      <polygon points="0,0 0,270 168,150" fill="#dcaa38" />
      <polygon points="420,0 420,270 252,150" fill="#dcaa38" />
      <polygon points="0,0 210,152 420,0" fill="#efc65e" stroke="#b8832a" strokeWidth="1.5" />
      <rect x="10" y="10" width="400" height="250" rx="4" fill="none" stroke="#c8203f" strokeOpacity="0.45" strokeDasharray="6 5" strokeWidth="2" />

      <circle cx="210" cy="146" r="25" fill="#a3122c" />
      <circle cx="210" cy="146" r="18" fill="none" stroke="#e85a6a" strokeWidth="2" strokeDasharray="3 3" />
      <text x="210" y="155" textAnchor="middle" className="font-serif-dev" fontSize="24" fontWeight="700" fill="#f4d896">
        फ़
      </text>

      {/* Gig-ticket stub: "admit one" to Fitoor, perforated down the left */}
      <g transform="rotate(-3 210 215)">
        <rect x="92" y="184" width="236" height="62" rx="4" fill="#f7ecd9" stroke="#4a1017" strokeWidth="2.5" />
        <rect x="92" y="184" width="44" height="62" rx="4" fill="#c8203f" />
        <line x1="136" y1="188" x2="136" y2="242" stroke="#4a1017" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="114" y="219" textAnchor="middle" className="font-display" fontSize="11" fill="#f7ecd9" transform="rotate(-90 114 215)" letterSpacing="1">
          ADMIT 1
        </text>
        <text x="146" y="200" className="font-body" fontSize="8" fontWeight="800" fill="#c8203f" letterSpacing="1.2">
          {fest.theme.toUpperCase()}
        </text>
        <text x="146" y="226" className="font-wordmark" fontSize="26" fill="#4a1017">
          {`${fest.name} '${String(fest.year).slice(2)}`}
        </text>
        <text x="146" y="239" className="font-body" fontSize="7.5" fontWeight="600" fill="#4a1017" fillOpacity="0.75">
          {`14–15 nov · ${fest.university.toLowerCase()}`}
        </text>
      </g>

      <Marigold x={26} y={244} />
      <Marigold x={394} y={244} />
    </svg>
  );
}

/** Slow, heavy slide: cardboard drags on cardboard, then settles. */
export const DRAWER_EASE = "cubic-bezier(0.33,0,0.15,1)";

/** Small per-stick offsets so the row looks hand-packed, not stamped. */
const STICK_JITTER = [0, 3, -2, 4, 1, -3, 2, -1, 3] as const;

/** A row of matchsticks in the drawer, heads to the right. */
function DrawerSticks({ taken }: { taken: boolean }) {
  return (
    <svg viewBox="0 0 280 150" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="tray-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c99a5c" />
          <stop offset="1" stopColor="#a57840" />
        </linearGradient>
        <linearGradient id="stick-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e2b8" />
          <stop offset="0.6" stopColor="#e7c88e" />
          <stop offset="1" stopColor="#c9a466" />
        </linearGradient>
        <radialGradient id="stick-head" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ef5a5f" />
          <stop offset="0.55" stopColor="#b51d33" />
          <stop offset="1" stopColor="#6e0f1e" />
        </radialGradient>
      </defs>
      <rect width="280" height="150" rx="4" fill="url(#tray-wall)" />
      <rect x="4" y="4" width="272" height="142" rx="3" fill="#7a5229" />
      {STICK_JITTER.map((dx, i) => {
        if (taken && i === 0) return null;
        const y = 16 + i * 14;
        return (
          <g key={y} transform={`translate(${dx} 0)`}>
            <rect x="20" y={y + 1.5} width="236" height="7" rx="2" fill="#4a2c12" opacity="0.5" />
            <rect x="20" y={y} width="236" height="7" rx="2" fill="url(#stick-wood)" />
            <ellipse cx="256" cy={y + 3.5} rx="9" ry="6" fill="url(#stick-head)" />
          </g>
        );
      })}
      {/* The sleeve's shadow falling into the tray */}
      <rect x="4" y="4" width="272" height="10" fill="#2c0a0d" opacity="0.25" />
    </svg>
  );
}

interface MatchboxProps {
  open: boolean;
  /** The top stick has been picked out of the drawer. */
  taken: boolean;
  /** Glow the striker: it is the next thing to touch. */
  strikerHot: boolean;
  drawerRef?: React.Ref<HTMLDivElement>;
  strikerRef?: React.Ref<HTMLDivElement>;
}

/** "Fitoor ki Teeli": a printed cardboard sleeve over a drawer that slides
 *  out slowly when opened. */
export function Matchbox({ open, taken, strikerHot, drawerRef, strikerRef }: MatchboxProps) {
  return (
    <div className="relative aspect-[300/190] w-full">
      <div
        ref={drawerRef}
        className="absolute inset-y-[7%] left-[3%] w-[94%] transition-transform duration-[1600ms] motion-reduce:transition-none"
        style={{ transform: open ? "translateX(46%)" : "translateX(0)", transitionTimingFunction: DRAWER_EASE }}
      >
        <DrawerSticks taken={taken} />
      </div>
      <svg viewBox="0 0 300 190" className="relative h-auto w-full drop-shadow-[0_14px_0_rgba(28,4,7,0.45)]">
        <defs>
          <linearGradient id="sleeve-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f7d462" />
            <stop offset="0.55" stopColor="#f2c94c" />
            <stop offset="1" stopColor="#d9ac34" />
          </linearGradient>
          <filter id="sleeve-paper" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.29  0 0 0 0 0.06  0 0 0 0 0.09  0 0 0 0.16 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
          <filter id="striker-grit" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="3" seed="3" result="grit" />
            <feColorMatrix in="grit" type="matrix" values="0 0 0 0 0.12  0 0 0 0 0.04  0 0 0 0 0.03  0 0 0 0.9 -0.15" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
        <rect x="1" y="1" width="298" height="188" rx="8" fill="url(#sleeve-card)" stroke="#4a1017" strokeWidth="3" />
        <rect x="1" y="1" width="298" height="188" rx="8" fill="#000" filter="url(#sleeve-paper)" />
        {/* Worn highlight along the top fold */}
        <rect x="6" y="4" width="288" height="4" rx="2" fill="#fff6d0" opacity="0.45" />
        <rect x="10" y="10" width="280" height="150" rx="5" fill="none" stroke="#c8203f" strokeWidth="2" strokeDasharray="5 4" />
        {/* Striker strip along the bottom: red phosphorus on sandpaper */}
        <rect x="2" y="166" width="296" height="22" fill="#6a2f1c" />
        <rect x="2" y="166" width="296" height="22" fill="#000" filter="url(#striker-grit)" />
        <rect x="2" y="166" width="296" height="1.5" fill="#2c0a0d" opacity="0.6" />

        <text x="150" y="58" textAnchor="middle" className="font-display" fontSize="34" fill="#4a1017" letterSpacing="1">
          FITOOR KI TEELI
        </text>
        {/* Emblem: a little flame in a mehendi-dotted ring */}
        <circle cx="150" cy="98" r="24" fill="#c8203f" />
        <circle cx="150" cy="98" r="30" fill="none" stroke="#4a1017" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" />
        <path d="M150 78 C160 92 162 100 158 108 C155 114 145 114 142 108 C138 100 142 92 150 78 Z" fill="#ffb02e" />
        <path d="M150 92 C154 99 155 103 153 107 C151 110 149 110 147 107 C145 103 146 99 150 92 Z" fill="#fff3c4" />
        <text x="150" y="150" textAnchor="middle" className="font-serif-dev" fontSize="18" fontWeight="700" fill="#c8203f">
          फ़ितूर की तीली
        </text>
      </svg>
      {/* Hit area matching the striker strip (y 166–188 of 190) */}
      <div
        ref={strikerRef}
        aria-hidden
        className={`pointer-events-none absolute inset-x-[0.7%] top-[87.4%] h-[11.6%] rounded-[2px] transition-shadow duration-500 ${
          strikerHot ? "animate-pulse shadow-[0_0_0_2px_rgba(255,176,46,0.9),0_0_22px_rgba(255,138,31,0.7)] motion-reduce:animate-none" : ""
        }`}
      />
    </div>
  );
}

/** Length of the struck match in px; its head is at the right end. */
export const TEELI_LENGTH = 112;

/** The struck match, drawn horizontally with its head on the right. */
export function Teeli({ lit }: { lit: boolean }) {
  return (
    <div className="relative h-2.5" style={{ width: TEELI_LENGTH }}>
      <div className="absolute inset-y-0 right-3 left-0 rounded-sm bg-[linear-gradient(180deg,#f6e2b8_0%,#e7c88e_60%,#c9a466_100%)] shadow-[0_3px_2px_rgba(28,4,7,0.45)]" />
      {/* Scorch creeping down the stick once it burns */}
      {lit && (
        <div className="absolute inset-y-0 right-3 w-6 bg-[linear-gradient(90deg,transparent,#3a1a0a)] opacity-80" />
      )}
      <div
        className={`absolute top-1/2 right-0 h-4 w-5 -translate-y-1/2 rounded-full transition-[background] duration-500 ${
          lit
            ? "bg-[radial-gradient(circle_at_40%_35%,#5a2a1a_0%,#1c0407_80%)]"
            : "bg-[radial-gradient(circle_at_35%_30%,#ef5a5f_0%,#b51d33_55%,#6e0f1e_100%)]"
        }`}
      />
      {lit && (
        <div className="absolute right-[-6px] bottom-[2px] h-12 w-8 origin-bottom animate-[flame-flicker_0.18s_ease-in-out_infinite_alternate] rounded-[50%_50%_45%_45%/65%_65%_35%_35%] bg-[radial-gradient(ellipse_at_50%_80%,#fff7d6_0%,#ffd45a_30%,#ff8a1f_62%,rgba(255,79,31,0)_75%)] motion-reduce:animate-none" />
      )}
    </div>
  );
}
