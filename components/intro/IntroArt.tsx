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

/** The invite: a haldi-yellow envelope with a wax seal and an address label. */
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

      <rect x="95" y="186" width="230" height="58" rx="8" fill="#f7ecd9" stroke="#c8203f" strokeWidth="2.5" />
      <text x="110" y="204" className="font-body" fontSize="10" fontWeight="700" fill="#c8203f">
        namaste,
      </text>
      <text x="210" y="226" textAnchor="middle" className="font-title" fontSize="22" fill="#4a1017">
        mehmaan
      </text>
      <text x="210" y="239" textAnchor="middle" className="font-body" fontSize="7.5" fontWeight="600" fill="#4a1017" fillOpacity="0.75">
        {`${fest.university.toLowerCase()} · ${fest.region.toLowerCase()}`}
      </text>

      <Marigold x={26} y={244} />
      <Marigold x={394} y={244} />
    </svg>
  );
}

/** A row of matchsticks in the drawer, heads to the right. */
function DrawerSticks() {
  return (
    <svg viewBox="0 0 280 150" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <rect width="280" height="150" rx="4" fill="#b98a4e" />
      <rect x="4" y="4" width="272" height="142" rx="3" fill="#8f6233" />
      {Array.from({ length: 9 }, (_, i) => {
        const y = 16 + i * 14;
        return (
          <g key={y}>
            <rect x="20" y={y} width="236" height="7" rx="2" fill="#f1d6a2" />
            <ellipse cx="256" cy={y + 3.5} rx="9" ry="6" fill="#c8203f" />
          </g>
        );
      })}
    </svg>
  );
}

/** "Fitoor ki Teeli": the sleeve over a drawer that slides out when opened. */
interface MatchboxProps {
  open: boolean;
  drawerRef?: React.Ref<HTMLDivElement>;
}

export function Matchbox({ open, drawerRef }: MatchboxProps) {
  return (
    <div className="relative aspect-[300/190] w-full">
      <div
        ref={drawerRef}
        className="absolute inset-y-[7%] left-[3%] w-[94%] transition-transform duration-700 ease-[cubic-bezier(0.2,0.9,0.3,1.15)] motion-reduce:transition-none"
        style={{ transform: open ? "translateX(46%)" : "translateX(0)" }}
      >
        <DrawerSticks />
      </div>
      <svg viewBox="0 0 300 190" className="relative h-auto w-full drop-shadow-[0_14px_0_rgba(28,4,7,0.45)]">
        <defs>
          <pattern id="striker-grain" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="#8a4a2a" />
            <circle cx="5" cy="5" r="0.8" fill="#2c0a0d" />
          </pattern>
        </defs>
        <rect x="1" y="1" width="298" height="188" rx="8" fill="#f2c94c" stroke="#4a1017" strokeWidth="3" />
        <rect x="10" y="10" width="280" height="150" rx="5" fill="none" stroke="#c8203f" strokeWidth="2" strokeDasharray="5 4" />
        {/* Striker strip along the bottom */}
        <rect x="2" y="166" width="296" height="22" fill="#5a2a1a" />
        <rect x="2" y="166" width="296" height="22" fill="url(#striker-grain)" />

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
    </div>
  );
}

/** Length of the struck match in px; its head is at the right end. */
export const TEELI_LENGTH = 112;

/** The struck match, drawn horizontally with its head on the right. */
export function Teeli({ lit }: { lit: boolean }) {
  return (
    <div className="relative h-2.5" style={{ width: TEELI_LENGTH }}>
      <div className="absolute inset-y-0 right-3 left-0 rounded-sm bg-[#f1d6a2] shadow-[0_2px_0_rgba(28,4,7,0.4)]" />
      <div
        className={`absolute top-1/2 right-0 h-4 w-5 -translate-y-1/2 rounded-full transition-colors duration-300 ${
          lit ? "bg-[#2c0a0d]" : "bg-rose-ink"
        }`}
      />
      {lit && (
        <div className="absolute right-[-6px] bottom-[2px] h-12 w-8 origin-bottom animate-[flame-flicker_0.18s_ease-in-out_infinite_alternate] rounded-[50%_50%_45%_45%/65%_65%_35%_35%] bg-[radial-gradient(ellipse_at_50%_80%,#fff7d6_0%,#ffd45a_30%,#ff8a1f_62%,rgba(255,79,31,0)_75%)] motion-reduce:animate-none" />
      )}
    </div>
  );
}
