import { test } from "node:test";
import assert from "node:assert/strict";
import { CANONICAL_SITE_URL, resolveBaseUrl } from "./site.ts";

test("the canonical site is the custom domain, never a vercel.app host", () => {
  assert.equal(CANONICAL_SITE_URL, "https://fitoor.atplaksha.in");
});

test("production builds use the custom domain even when Vercel injects its own URLs", () => {
  const url = resolveBaseUrl({
    NODE_ENV: "production",
    VERCEL_URL: "fitor-abc123.vercel.app",
    VERCEL_PROJECT_PRODUCTION_URL: "fitoor-plaksha.vercel.app",
  });
  assert.equal(url, "https://fitoor.atplaksha.in");
});

test("preview deployments still point canonicals at the custom domain", () => {
  const url = resolveBaseUrl({ NODE_ENV: "production", VERCEL_ENV: "preview" });
  assert.equal(url, "https://fitoor.atplaksha.in");
});

test("local development keeps using localhost", () => {
  assert.equal(resolveBaseUrl({ NODE_ENV: "development" }), "http://localhost:3000");
});

test("NEXT_PUBLIC_SITE_URL overrides the default and loses any trailing slash or path", () => {
  const url = resolveBaseUrl({
    NODE_ENV: "production",
    NEXT_PUBLIC_SITE_URL: "https://staging.example.com/some/path/",
  });
  assert.equal(url, "https://staging.example.com");
});

test("an invalid NEXT_PUBLIC_SITE_URL fails fast instead of emitting broken canonicals", () => {
  assert.throws(
    () => resolveBaseUrl({ NODE_ENV: "production", NEXT_PUBLIC_SITE_URL: "not a url" }),
    /NEXT_PUBLIC_SITE_URL/,
  );
});
