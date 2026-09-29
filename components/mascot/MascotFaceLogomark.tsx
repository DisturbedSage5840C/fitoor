import Image from "next/image";
import { cn } from "@/lib/utils";

interface MascotFaceLogomarkProps {
  size?: number;
  className?: string;
  /** Decorative by default; pass a label when the mascot stands alone. */
  label?: string;
}

/** Fitoor's mascot, the goggle-wearing girl from the brand guide (retro colourway). */
export function MascotFaceLogomark({
  size = 40,
  className,
  label,
}: MascotFaceLogomarkProps) {
  return (
    <Image
      src="/brand/mascot-logomark-retro.png"
      alt={label ?? ""}
      width={size}
      height={size}
      className={cn("object-contain", className)}
    />
  );
}
