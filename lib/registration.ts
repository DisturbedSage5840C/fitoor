export interface Registration {
  /** Unstop's deadline for every event, as an ISO timestamp with the IST offset. */
  closesAt: string;
  /** How the deadline reads on the site. */
  closesLabel: string;
  /** Set once the deadline has passed, so the built pages say "closed" with no JavaScript. */
  closed: boolean;
}

export const registration: Registration = {
  closesAt: "2026-11-12T23:59:00+05:30",
  closesLabel: "12 Nov, 11:59 PM",
  closed: true,
};

/** Open until Unstop's deadline, or until the closed flag is set by hand. */
export function isRegistrationOpen(now: Date, reg: Registration = registration): boolean {
  if (reg.closed) return false;
  return now.getTime() < new Date(reg.closesAt).getTime();
}
