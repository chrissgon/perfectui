/**
 * Fallback for CSS anchor positioning (ARCHITECTURE.md §8).
 *
 * Places an open popover next to the element that opened it. The anchor is
 * found from the native attributes that already point at the popover, so this
 * module needs no state shared with the other fallbacks and no attribute of
 * its own.
 *
 * The side comes from the same classes the CSS uses — `pui-top`, `pui-bottom`,
 * `pui-start`, `pui-end` — falling back to the default of each component: a
 * tooltip sits above its anchor, a menu below it. Either flips to the opposite
 * side when the preferred one does not fit, which is what
 * position-try-fallbacks does natively.
 */

type Side = "top" | "bottom" | "start" | "end";
type Align = "start" | "center" | "end";

const GAP = 4;

const SIDES: Side[] = ["top", "bottom", "start", "end"];

const ALIGNMENTS: Align[] = ["start", "center", "end"];

const OPPOSITE: Record<Side, Side> = {
  top: "bottom",
  bottom: "top",
  start: "end",
  end: "start"
};

let open: HTMLElement | null = null;

function anchorOf(popover: HTMLElement): HTMLElement | null {
  const id = popover.id;
  if (!id) return null;

  const escaped = CSS.escape(id);
  return document.querySelector<HTMLElement>(
    `[popovertarget="${escaped}"], [interestfor="${escaped}"], [commandfor="${escaped}"]`
  );
}

function sideOf(popover: HTMLElement, isHint: boolean): Side {
  for (const side of SIDES) {
    if (popover.classList.contains(`pui-${side}`)) return side;
  }
  return isHint ? "top" : "bottom";
}

/** A tooltip is centered on its trigger by default, a menu starts with it. */
function alignOf(popover: HTMLElement, isHint: boolean): Align {
  for (const align of ALIGNMENTS) {
    if (popover.classList.contains(`pui-align-${align}`)) return align;
  }
  return isHint ? "center" : "start";
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function place(popover: HTMLElement): void {
  const anchor = anchorOf(popover);
  if (!anchor) return;

  const a = anchor.getBoundingClientRect();
  const p = popover.getBoundingClientRect();
  const isHint = popover.getAttribute("popover") === "hint";
  const rtl = getComputedStyle(popover).direction === "rtl";

  const room: Record<Side, number> = {
    top: a.top,
    bottom: window.innerHeight - a.bottom,
    start: rtl ? window.innerWidth - a.right : a.left,
    end: rtl ? a.left : window.innerWidth - a.right
  };
  const needed: Record<Side, number> = {
    top: p.height,
    bottom: p.height,
    start: p.width,
    end: p.width
  };

  let side = sideOf(popover, isHint);
  const other = OPPOSITE[side];
  if (room[side] < needed[side] + GAP && room[other] >= needed[other] + GAP) {
    side = other;
  }

  let top: number;
  let left: number;

  if (side === "top" || side === "bottom") {
    top = side === "top" ? a.top - p.height - GAP : a.bottom + GAP;

    const align = alignOf(popover, isHint);
    const atEnd = (align === "end") !== rtl;
    left =
      align === "center"
        ? a.left + (a.width - p.width) / 2
        : atEnd
          ? a.right - p.width
          : a.left;
  } else {
    // "start" is the left side in a left-to-right page and the right side in a
    // right-to-left one.
    const toTheLeft = (side === "start") !== rtl;
    left = toTheLeft ? a.left - p.width - GAP : a.right + GAP;
    top = a.top + (a.height - p.height) / 2;
  }

  popover.style.position = "fixed";
  popover.style.margin = "0";
  popover.style.top = `${clamp(top, GAP, window.innerHeight - p.height - GAP)}px`;
  popover.style.left = `${clamp(left, GAP, window.innerWidth - p.width - GAP)}px`;
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
if (typeof document !== "undefined") {
  document.addEventListener("toggle", onToggle, true);
  window.addEventListener("resize", reposition);
  window.addEventListener("scroll", reposition, true);
}

/** Side-effect module: this marks the file as ESM so nothing leaks to global scope. */
export {};
