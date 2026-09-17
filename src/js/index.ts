/**
 * Fallback loader. The only JS that runs eagerly.
 * Detects native support and dynamically imports only the missing fallbacks.
 * See ARCHITECTURE.md §8.
 */

export interface Feature {
  /** Must match the file name in ./fallbacks */
  name: string;
  /** Returns true when the browser supports the feature natively. */
  supported: () => boolean;
  /** Imports the fallback module. Never called when supported() is true. */
  load: () => Promise<unknown>;
}

/** Registry. Entries are added in Phase 5. */
export const features: Feature[] = [];

export function loadFallbacks(list: Feature[] = features): void {
  if (typeof document === "undefined") return;
  for (const feature of list) {
    if (!feature.supported()) void feature.load();
  }
}

loadFallbacks();
