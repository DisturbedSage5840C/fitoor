import { registerUrl } from "@/data/contacts";

/** Mobile only: keeps the one thing we want people to do within thumb reach. */
export function StickyRegister() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <a
        href={registerUrl}
        target="_blank"
        rel="noreferrer"
        className="font-body pointer-events-auto flex min-h-12 items-center justify-center bg-gold text-base font-bold text-maroon-deepest shadow-[4px_4px_0_var(--rose)] transition-transform active:translate-y-0.5"
      >
        Register now
      </a>
    </div>
  );
}
