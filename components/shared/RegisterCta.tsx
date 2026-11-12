"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { registerUrl } from "@/data/contacts";
import { isRegistrationOpen, registration } from "@/lib/registration";
import { cn } from "@/lib/utils";

/** setTimeout overflows past ~24.8 days, so further-off deadlines are left to the next visit. */
const MAX_TIMEOUT_MS = 2_147_483_647;
/** Flip a beat after the deadline, never a beat before. */
const FLIP_GRACE_MS = 1_000;

function subscribe(onChange: () => void): () => void {
  const msLeft = new Date(registration.closesAt).getTime() - Date.now();
  if (msLeft <= 0 || msLeft > MAX_TIMEOUT_MS) return () => {};
  const id = window.setTimeout(onChange, msLeft + FLIP_GRACE_MS);
  return () => window.clearTimeout(id);
}

/**
 * True until Unstop's deadline. The server snapshot is the build-time flag, so the
 * pre-rendered HTML hydrates cleanly; the browser then checks its own clock and flips
 * the moment registration closes, without waiting for a redeploy.
 */
export function useRegistrationOpen(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => isRegistrationOpen(new Date()),
    () => !registration.closed,
  );
}

interface RegisterLinkProps {
  className: string;
  /** Layout classes (margins, width) shared by the open and closed states. */
  layoutClassName?: string;
  children: ReactNode;
}

/** The Unstop button while registration is open; a quiet "closed" stamp afterwards. */
export function RegisterLink({ className, layoutClassName, children }: RegisterLinkProps) {
  const open = useRegistrationOpen();

  if (!open) {
    return (
      <span
        aria-disabled
        className={cn(
          "font-body inline-flex min-h-12 items-center justify-center rounded-sm border-2 border-dashed border-gold/50 px-5 font-bold text-gold/80",
          layoutClassName,
        )}
      >
        Registrations closed
      </span>
    );
  }

  return (
    <a href={registerUrl} target="_blank" rel="noreferrer" className={cn(className, layoutClassName)}>
      {children}
      <span className="sr-only"> (opens Unstop in a new tab)</span>
    </a>
  );
}

/** One line under the hero button: the deadline while open, a see-you note after. */
export function RegistrationNote({ className }: { className?: string }) {
  const open = useRegistrationOpen();
  return (
    <p className={cn("font-body text-sm font-semibold", open ? "text-rose" : "text-cream/80", className)}>
      {open
        ? `Registrations on Unstop close ${registration.closesLabel}.`
        : "Registrations are closed. See you at the fest!"}
    </p>
  );
}
