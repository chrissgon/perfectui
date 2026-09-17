/**
 * Color mode. Sets data-pui-mode on <html> and persists it in a cookie so the
 * server can render the attribute during SSR and avoid a flash.
 * See ARCHITECTURE.md §7.
 */

export type Mode = "system" | "light" | "dark";

const COOKIE = "pui-mode";
const ATTRIBUTE = "data-pui-mode";
const MAX_AGE = 31536000; // 1 year
const PATTERN = /(?:^|; )pui-mode=(light|dark)/;

/**
 * Applies a mode and persists it. "system" removes both the attribute and the
 * cookie, falling back to the user's OS preference. No-op during SSR.
 */
export function setMode(mode: Mode = "system"): void {
  if (typeof document === "undefined") return;

  if (mode === "system") {
    document.documentElement.removeAttribute(ATTRIBUTE);
    document.cookie = `${COOKIE}=; path=/; max-age=0; SameSite=Lax`;
    return;
  }

  document.documentElement.setAttribute(ATTRIBUTE, mode);
  document.cookie = `${COOKIE}=${mode}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}

/**
 * Reads the persisted mode. Returns "system" when nothing is stored, which
 * means the OS preference is in use. Returns "system" during SSR.
 */
export function getMode(): Mode {
  if (typeof document === "undefined") return "system";
  return (document.cookie.match(PATTERN)?.[1] as Mode) ?? "system";
}
