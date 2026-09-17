/**
 * Fallback for `interestfor` (ARCHITECTURE.md §8).
 *
 * Shows the target when the user shows interest in the trigger: hovering it,
 * focusing it with the keyboard, or pressing and holding on a touch screen.
 * That last path is why v0's tooltip did not work on mobile.
 *
 * Positioning is not this module's job — the anchor-positioning fallback
 * handles it when the browser lacks CSS anchor positioning too.
 */

/** Name used to wire the anchor by hand. One tooltip is open at a time. */
const ANCHOR = "--pui-interest-anchor";

const SHOW_DELAY = 300;
const HIDE_DELAY = 150;
const LONG_PRESS = 500;

let timer: ReturnType<typeof setTimeout> | undefined;
let open: HTMLElement | null = null;
let openTrigger: HTMLElement | null = null;
let installed = false;

/** The trigger has to travel with the target: see show(). */
function triggerOf(node: EventTarget | null): HTMLElement | null {
  return node instanceof Element
    ? node.closest<HTMLElement>("[interestfor]")
    : null;
}

function targetOf(node: EventTarget | null): HTMLElement | null {
  const id = triggerOf(node)?.getAttribute("interestfor");
  return id ? document.getElementById(id) : null;
}

function schedule(run: () => void, delay: number): void {
  clearTimeout(timer);
  timer = setTimeout(run, delay);
}

/**
 * A popover shown from script has no invoker, so it has no anchor either, and
 * the CSS placement in tooltip.css has nothing to work against. A test caught
 * this: the tooltip appeared, in the wrong place.
 *
 * `showPopover({ source })` fixes it where it exists. Where it does not — a
 * browser that has anchor positioning but not interestfor, which is WebKit
 * today — the anchor is wired by hand instead. Browsers with neither are served
 * by the anchor-positioning fallback, which finds this trigger through its
 * `interestfor` attribute.
 */
function show(target: HTMLElement, trigger: HTMLElement): void {
  if (open === target) return;
  hide();
  open = target;
  openTrigger = trigger;

  if (CSS.supports("anchor-name: --a")) {
    trigger.style.setProperty("anchor-name", ANCHOR);
    target.style.setProperty("position-anchor", ANCHOR);
  }

  const show = target.showPopover as
    | ((options?: { source?: HTMLElement }) => void)
    | undefined;

  try {
    show?.call(target, { source: trigger });
  } catch {
    show?.call(target);
  }
}

function hide(): void {
  open?.hidePopover?.();
  open?.style.removeProperty("position-anchor");
  openTrigger?.style.removeProperty("anchor-name");
  open = null;
  openTrigger = null;
}

function onPointerOver(event: PointerEvent): void {
  const trigger = triggerOf(event.target);
  const target = targetOf(event.target);
  if (trigger && target) schedule(() => show(target, trigger), SHOW_DELAY);
}

function onPointerOut(event: PointerEvent): void {
  if (targetOf(event.target)) schedule(hide, HIDE_DELAY);
}

/** Press and hold, the touch equivalent of hovering. */
function onPointerDown(event: PointerEvent): void {
  if (event.pointerType !== "touch") return;
  const trigger = triggerOf(event.target);
  const target = targetOf(event.target);
  if (trigger && target) schedule(() => show(target, trigger), LONG_PRESS);
}

function onPointerUp(): void {
  clearTimeout(timer);
}

function onFocusIn(event: FocusEvent): void {
  const trigger = triggerOf(event.target);
  const target = targetOf(event.target);
  if (trigger && target) show(target, trigger);
}

function onFocusOut(event: FocusEvent): void {
  if (targetOf(event.target)) schedule(hide, HIDE_DELAY);
}

function onKeyDown(event: KeyboardEvent): void {
  if (event.key === "Escape") hide();
}

if (typeof document !== "undefined" && !installed) {
  installed = true;
  document.addEventListener("pointerover", onPointerOver);
  document.addEventListener("pointerout", onPointerOut);
  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("pointerup", onPointerUp);
  document.addEventListener("pointercancel", onPointerUp);
  document.addEventListener("focusin", onFocusIn);
  document.addEventListener("focusout", onFocusOut);
  document.addEventListener("keydown", onKeyDown);
}

/** Side-effect module: this marks the file as ESM so nothing leaks to global scope. */
export {};
