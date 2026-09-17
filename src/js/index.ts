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

/**
 * Registry. Order does not matter: each entry is checked and loaded on its own.
 *
 * The detection expressions were verified in Chrome 153 (September 2026).
 * Re-check them against MDN when touching this file: these property names are
 * young enough to still move.
 */
export const features: Feature[] = [
  {
    // Baseline newly since December 2025, so this only serves older versions.
    name: "command-for",
    supported: () => "commandForElement" in HTMLButtonElement.prototype,
    load: () => import("./fallbacks/command-for")
  },
  {
    // Missing in Safari.
    name: "dialog-closedby",
    supported: () => "closedBy" in HTMLDialogElement.prototype,
    load: () => import("./fallbacks/dialog-closedby")
  },
  {
    // Chromium only.
    name: "interest-for",
    supported: () => "interestForElement" in HTMLButtonElement.prototype,
    load: () => import("./fallbacks/interest-for")
  },
  {
    // Chromium only.
    name: "anchor-positioning",
    supported: () => CSS.supports("anchor-name: --a"),
    load: () => import("./fallbacks/anchor-positioning")
  },
  {
    // No native attribute exists, so this always loads. Replace the check if
    // one ever ships.
    name: "checkbox-indeterminate",
    supported: () => false,
    load: () => import("./fallbacks/checkbox-indeterminate")
  }
];

export function loadFallbacks(list: Feature[] = features): void {
  if (typeof document === "undefined") return;
  for (const feature of list) {
    if (!feature.supported()) void feature.load();
  }
}

loadFallbacks();
