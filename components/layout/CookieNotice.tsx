"use client";

import Link from "next/link";
import { useSyncExternalStore, useState } from "react";

const KEY = "fitoor-cookie-notice";

function read(): boolean {
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

const subscribe = () => () => {};

/** Says plainly what the site stores. Analytics here is cookieless, so this is a notice, not a gate. */
export function CookieNotice() {
  const seen = useSyncExternalStore(subscribe, read, () => true);
  const [closed, setClosed] = useState(false);
  if (seen || closed) return null;

  function dismiss() {
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {}
    setClosed(true);
  }

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-3 bottom-20 z-50 max-w-md rotate-[-0.6deg] border-2 border-dashed border-gold bg-maroon-deepest p-4 text-cream shadow-[5px_5px_0_var(--rose)] sm:bottom-4 sm:left-4 lg:bottom-4"
    >
      <p className="font-body text-sm leading-relaxed">
        No ad cookies here. We only count visits, without tracking you across
        sites.{" "}
        <Link
          href="/privacy"
          className="font-semibold text-gold underline underline-offset-2"
        >
          Privacy
        </Link>
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="font-body mt-3 min-h-11 bg-gold px-5 text-sm font-bold text-maroon-deepest transition-transform hover:-translate-y-0.5"
      >
        Got it
      </button>
    </div>
  );
}
