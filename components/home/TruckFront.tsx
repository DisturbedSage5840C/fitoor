"use client";

import { useState } from "react";
import { playHorn } from "@/lib/sound";
import { cn } from "@/lib/utils";

/** Drawing size of the truck, in SVG units. The number-plate button is
 *  placed over the drawing with percentages of this box. */
const W = 300;
const H = 380;
const PLATE = { x: 100, y: 291, w: 100, h: 30 };

const INK = "#1c0407";
const GOLD = "#e8c77e";
const CHROME = "#efe4cf";
const RED = "#c8203f";
const ROSE = "#ff4f6d";
const PLUM = "#4a1a6b";
const EMERALD = "#1f9d6a";
const SAFFRON = "#e8a33d";
const NAZAR = "#2f6fd0";

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/** The "taj": the crown panel above the cab, painted and studded with mirrors. */
function Taj() {
  const mirrors = [62, 96, 204, 238];
  return (
    <g>
      <path
        d="M30 98V62q8-22 40-24q18-26 50-16q30-26 60 0q32-10 50 16q32 2 40 24v36z"
        fill={RED}
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M42 90V66q8-14 32-15q16-22 44-12q32-24 64 0q28-10 44 12q24 1 32 15v24z" fill={PLUM} />
      <path d="M44 88h212" stroke={GOLD} strokeWidth="3" strokeDasharray="1 6" strokeLinecap="round" />
      {/* Peacock-eye medallion at the peak, with a fan of gold petals behind it. */}
      {Array.from({ length: 5 }, (_, i) => (
        <ellipse
          key={i}
          cx="150"
          cy="30"
          rx="3.5"
          ry="7"
          fill={GOLD}
          stroke={INK}
          strokeWidth="1.5"
          transform={`rotate(${(i - 2) * 30} 150 52)`}
        />
      ))}
      <circle cx="150" cy="52" r="17" fill={SAFFRON} stroke={INK} strokeWidth="3" />
      <circle cx="150" cy="52" r="10" fill={EMERALD} />
      <circle cx="150" cy="52" r="5" fill={NAZAR} />
      {mirrors.map((x) => (
        <g key={x}>
          <circle cx={x} cy="70" r="8" fill={CHROME} stroke={INK} strokeWidth="2.5" />
          <path d={`M${x - 3} 67l3-2`} stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      {/* Painted chevrons between the mirrors. */}
      <path d="M112 80l8-9 8 9M172 80l8-9 8 9" fill="none" stroke={ROSE} strokeWidth="3" strokeLinejoin="round" />
    </g>
  );
}

/** Windshield split by a pillar, with the nazar charm and two tassels hanging inside. */
function Windshield() {
  return (
    <g>
      <rect x="34" y="96" width="232" height="12" fill={GOLD} stroke={INK} strokeWidth="3" />
      <path d="M50 110h200l-10 80H60z" fill={INK} stroke={GOLD} strokeWidth="4" strokeLinejoin="round" />
      <path d="M150 110v80" stroke={GOLD} strokeWidth="4" />
      <path
        d="M70 124l30-6M72 140l22-4M176 122l40-8"
        stroke={CHROME}
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".3"
      />
      {/* Nazar battu on a thread. */}
      <path d="M150 112v20" stroke={CHROME} strokeWidth="1.5" />
      <circle cx="150" cy="140" r="9" fill={NAZAR} stroke={INK} strokeWidth="1.5" />
      <circle cx="150" cy="140" r="5.5" fill={CHROME} />
      <circle cx="150" cy="140" r="3.2" fill="#8cc4ff" />
      <circle cx="150" cy="140" r="1.6" fill={INK} />
      {[72, 228].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 112v18`} stroke={i ? ROSE : SAFFRON} strokeWidth="2" />
          <path d={`M${x - 5} 128h10l-2 16h-6z`} fill={i ? ROSE : SAFFRON} stroke={INK} strokeWidth="1.5" />
        </g>
      ))}
    </g>
  );
}

/** One round headlight with a ring of painted petals. */
function Headlight({ cx }: { cx: number }) {
  return (
    <g>
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={i}
          cx={cx}
          cy="200"
          rx="4.5"
          ry="7"
          fill={i % 2 ? ROSE : SAFFRON}
          stroke={INK}
          strokeWidth="1.5"
          transform={`rotate(${i * 30} ${cx} 228)`}
        />
      ))}
      <circle cx={cx} cy="228" r="22" fill={CHROME} stroke={INK} strokeWidth="3" />
      <circle cx={cx} cy="228" r="15" fill="#f4d896" stroke={INK} strokeWidth="2" />
      <path d={`M${cx - 8} 222a9 9 0 0 1 8-6`} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

/** Chrome grille, bumper and the painted "HORN OK PLEASE" band. */
function Front() {
  return (
    <g>
      <rect x="34" y="190" width="232" height="72" fill={RED} stroke={INK} strokeWidth="4" />
      <rect x="112" y="200" width="76" height="56" rx="4" fill={INK} stroke={CHROME} strokeWidth="3" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={118 + i * 8.6} y="205" width="3.4" height="46" rx="1.5" fill={CHROME} />
      ))}
      <Headlight cx={74} />
      <Headlight cx={226} />
      <rect x="30" y="260" width="240" height="28" fill={CHROME} stroke={INK} strokeWidth="3" />
      <text
        x="150"
        y="280"
        textAnchor="middle"
        fontFamily="var(--font-display), Impact, sans-serif"
        fontSize="17"
        letterSpacing="2.5"
        fill={RED}
      >
        HORN OK PLEASE
      </text>
      <rect x="22" y="286" width="256" height="40" rx="6" fill={GOLD} stroke={INK} strokeWidth="4" />
      <path d="M30 298h62M208 298h62M30 312h62M208 312h62" stroke={INK} strokeWidth="2" opacity=".35" />
      {/* Number plate: drawn here, pressed through the button laid over it. */}
      <rect
        x={PLATE.x}
        y={PLATE.y}
        width={PLATE.w}
        height={PLATE.h}
        rx="4"
        fill="#f7ecd9"
        stroke={INK}
        strokeWidth="3"
      />
      <text
        x="150"
        y="311"
        textAnchor="middle"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="13"
        fontWeight="800"
        letterSpacing="1"
        fill={INK}
      >
        PB 65 FT 26
      </text>
    </g>
  );
}

/** Wheels, mud flaps and the jhalar: the bead-and-bell fringe under the bumper. */
function Undercarriage() {
  const bells = Array.from({ length: 16 }, (_, i) => 34 + i * 15.5);
  const bellColours = [ROSE, SAFFRON, EMERALD];
  return (
    <g>
      {[44, 216].map((x) => (
        <rect key={x} x={x} y="318" width="40" height="54" rx="8" fill={INK} />
      ))}
      {[36, 212].map((x, i) => (
        <g key={x}>
          <rect x={x} y="334" width="52" height="40" rx="3" fill={i ? EMERALD : PLUM} stroke={INK} strokeWidth="3" />
          <circle cx={x + 26} cy="352" r="8" fill={CHROME} stroke={INK} strokeWidth="2" />
          <circle cx={x + 26} cy="352" r="3.5" fill={INK} />
          <path d={`M${x + 4} 369h44`} stroke={GOLD} strokeWidth="3" strokeDasharray="2 4" />
        </g>
      ))}
      {bells.map((x, i) => (
        <g key={x}>
          <path d={`M${x} 326v6`} stroke={GOLD} strokeWidth="1.5" />
          <path
            d={`M${x - 4} 338a4 4 0 0 1 8 0z`}
            fill={bellColours[i % bellColours.length]}
            stroke={INK}
            strokeWidth="1.5"
          />
          <circle cx={x} cy="340" r="1.4" fill={GOLD} />
        </g>
      ))}
    </g>
  );
}

interface TruckFrontProps {
  className?: string;
}

/** A painted goods-carrier truck, head on. The number plate is a real button:
 *  each press blows a different pressure horn and rattles the truck. */
export function TruckFront({ className }: TruckFrontProps) {
  const [honks, setHonks] = useState(0);

  const honk = () => {
    playHorn();
    setHonks((n) => n + 1);
  };

  return (
    <figure className={cn("relative", className)}>
      <div className="relative">
        {/* Re-keying restarts the rattle on every press. */}
        <div key={honks} className={honks > 0 ? "truck-rattle" : undefined}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label="A hand-painted truck seen head on, with a crown panel, a nazar charm and HORN OK PLEASE on the bumper"
            className="h-auto w-full drop-shadow-[6px_8px_0_rgb(0_0_0/0.4)]"
          >
            <Taj />
            <Windshield />
            <Front />
            <Undercarriage />
          </svg>
        </div>
        <button
          type="button"
          onClick={honk}
          aria-label="Honk the horn"
          title="Honk the horn"
          className="absolute cursor-pointer rounded-sm transition-colors hover:bg-gold/25 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-rose active:bg-rose/30"
          style={{
            left: pct(PLATE.x, W),
            top: pct(PLATE.y, H),
            width: pct(PLATE.w, W),
            height: pct(PLATE.h, H),
          }}
        />
      </div>
      <figcaption className="font-script mt-3 text-center text-xl text-gold/85">press the number plate</figcaption>
    </figure>
  );
}
