"use client";

import { registerUrl } from "@/data/contacts";
import { useRegistrationOpen } from "@/components/shared/RegisterCta";

/** Mobile only: keeps the one thing we want people to do within thumb reach,
 *  and steps out of the way once Unstop registrations close. */
export function StickyRegister() {
  const open = useRegistrationOpen();
  if (!open) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <a
        href={registerUrl}
        target="_blank"
        rel="noreferrer"
        className="font-body pointer-events-auto flex min-h-12 items-center justify-center bg-gold text-base font-bold text-maroon-deepest shadow-[4px_4px_0_var(--rose)] transition-transform active:translate-y-0.5"
      >
        Register now
        <span className="sr-only"> (opens Unstop in a new tab)</span>
      </a>
    </div>
  );
}
