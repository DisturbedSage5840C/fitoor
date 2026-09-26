import { MascotFaceLogomark } from "@/components/mascot/MascotFaceLogomark";
import { cn } from "@/lib/utils";

interface MascotStampProps {
  text?: string;
  className?: string;
}

/**
 * The mascot sitting inside a slowly spinning ring of type — a sticker/seal
 * rather than a character, so it can be dropped onto artwork.
 */
export function MascotStamp({
  text = "young · dumb · desi · fitoor 2026 · ",
  className,
}: MascotStampProps) {
  return (
    <div className={cn("relative aspect-square w-36", className)}>
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 size-full animate-spin-slow"
        aria-hidden
      >
        <defs>
          <path
            id="mascot-ring"
            d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
          />
        </defs>
        <circle cx="100" cy="100" r="98" fill="var(--maroon-deepest)" />
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1"
        />
        <circle
          cx="100"
          cy="100"
          r="64"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1"
          opacity="0.5"
        />
        <text
          fill="var(--gold)"
          fontSize="16"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          {/* Stretch one pass of the text to exactly the ring's circumference (2π·78). */}
          <textPath href="#mascot-ring" textLength={488} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[22%] overflow-hidden rounded-full bg-cream">
        <MascotFaceLogomark
          size={120}
          className="size-full scale-110"
          label="Fitoor mascot"
        />
      </div>
    </div>
  );
}
