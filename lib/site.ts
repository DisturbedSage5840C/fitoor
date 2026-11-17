/** The one public address of the fest site. Every canonical, sitemap and structured-data URL derives from it. */
export const CANONICAL_SITE_URL = "https://fitoor.atplaksha.in";

const LOCAL_SITE_URL = "http://localhost:3000";

interface SiteUrlEnv {
  readonly NODE_ENV?: string;
  readonly NEXT_PUBLIC_SITE_URL?: string;
  readonly [key: string]: string | undefined;
}

/**
 * Picks the origin used for SEO output.
 *
 * Vercel's own URL variables are deliberately ignored: they point at *.vercel.app hosts,
 * which would leak into canonicals and the sitemap and split ranking across two domains.
 * Preview deployments also canonicalise to the custom domain, so they never compete with it.
 */
export function resolveBaseUrl(env: SiteUrlEnv): string {
  const override = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (override) {
    try {
      return new URL(override).origin;
    } catch {
      throw new Error(`NEXT_PUBLIC_SITE_URL is not a valid absolute URL: "${override}"`);
    }
  }
  return env.NODE_ENV === "development" ? LOCAL_SITE_URL : CANONICAL_SITE_URL;
}

export const siteUrl = resolveBaseUrl(process.env);

/** Paste the token from Google Search Console (HTML tag method) into this env var. */
export const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
