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

const SHOW_DELAY = 300;
const HIDE_DELAY = 150;
const LONG_PRESS = 500;

let timer: ReturnType<typeof setTimeout> | undefined;
let open: HTMLElement | null = null;
let installed = false;

function targetOf(node: EventTarget | null): HTMLElement | null {
  if (!(node instanceof Element)) return null;
  const trigger = node.closest("[interestfor]");
  const id = trigger?.getAttribute("interestfor");
  return id ? document.getElementById(id) : null;
}

function schedule(run: () => void, delay: number): void {
  clearTimeout(timer);
  timer = setTimeout(run, delay);
}

function show(target: HTMLElement): void {
  if (open === target) return;
  hide();
  open = target;
  target.showPopover?.();
}

function hide(): void {
  open?.hidePopover?.();
  open = null;
}

function onPointerOver(event: PointerEvent): void {
  const target = targetOf(event.target);
  if (target) schedule(() => show(target), SHOW_DELAY);
}

function onPointerOut(event: PointerEvent): void {
  if (targetOf(event.target)) schedule(hide, HIDE_DELAY);
}

/** Press and hold, the touch equivalent of hovering. */
function onPointerDown(event: PointerEvent): void {
  if (event.pointerType !== "touch") return;
  const target = targetOf(event.target);
  if (target) schedule(() => show(target), LONG_PRESS);
}

function onPointerUp(): void {
  clearTimeout(timer);
}

function onFocusIn(event: FocusEvent): void {
  const target = targetOf(event.target);
  if (target) show(target);
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
