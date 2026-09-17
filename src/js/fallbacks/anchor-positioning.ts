/**
 * Fallback for CSS anchor positioning (ARCHITECTURE.md §8).
 *
 * Places an open popover next to the element that opened it. The anchor is
 * found from the native attributes that already point at the popover, so this
 * module needs no state shared with the other fallbacks and no attribute of
 * its own.
 *
 * A popover with `popover="hint"` is a tooltip and prefers to sit above its
 * anchor; anything else is a menu and prefers to sit below. Either flips when
 * the preferred side does not fit, which is what position-try-fallbacks does
 * natively.
 */

const GAP = 4;

let installed = false;
let open: HTMLElement | null = null;

function anchorOf(popover: HTMLElement): HTMLElement | null {
  const id = popover.id;
  if (!id) return null;

  const escaped = CSS.escape(id);
  return document.querySelector<HTMLElement>(
    `[popovertarget="${escaped}"], [interestfor="${escaped}"], [commandfor="${escaped}"]`
  );
}

function place(popover: HTMLElement): void {
  const anchor = anchorOf(popover);
  if (!anchor) return;

  const a = anchor.getBoundingClientRect();
  const p = popover.getBoundingClientRect();
  const above = popover.getAttribute("popover") === "hint";

  const roomBelow = window.innerHeight - a.bottom;
  const roomAbove = a.top;
  const fitsBelow = roomBelow >= p.height + GAP;
  const fitsAbove = roomAbove >= p.height + GAP;
  const placeAbove = above ? fitsAbove || !fitsBelow : !fitsBelow && fitsAbove;

  const top = placeAbove ? a.top - p.height - GAP : a.bottom + GAP;
  const left = Math.min(
    Math.max(GAP, above ? a.left + (a.width - p.width) / 2 : a.left),
    window.innerWidth - p.width - GAP
  );

  popover.style.position = "fixed";
  popover.style.margin = "0";
  popover.style.top = `${Math.max(GAP, top)}px`;
  popover.style.left = `${left}px`;
}

function onToggle(event: Event): void {
  const popover = event.target;
  if (!(popover instanceof HTMLElement) || !popover.hasAttribute("popover")) {
    return;
  }

  if ((event as ToggleEvent).newState === "open") {
    open = popover;
    place(popover);
  } else if (open === popover) {
    open = null;
  }
}

function reposition(): void {
  if (open) place(open);
}

/** `toggle` does not bubble, so it is caught on the way down. */
if (typeof document !== "undefined" && !installed) {
  installed = true;
  document.addEventListener("toggle", onToggle, true);
  window.addEventListener("resize", reposition);
  window.addEventListener("scroll", reposition, true);
}

/** Side-effect module: this marks the file as ESM so nothing leaks to global scope. */
export {};
