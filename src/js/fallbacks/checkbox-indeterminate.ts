/**
 * Fallback for the `indeterminate` attribute on a checkbox
 * (ARCHITECTURE.md §8.4).
 *
 * There is no native attribute for this — `indeterminate` is a property only —
 * so this module always loads. It is the single exception to the rule that a
 * fallback reads native attributes only.
 *
 * No MutationObserver (ARCHITECTURE.md rule 9): the attribute is applied at
 * load, when a `.pui-checkbox` carrying it renders (the stylesheet gives it a
 * zero-length animation, whose `animationstart` bubbles to `document`), and on
 * the next interaction, which covers pages that disable animations (ADR-0001).
 */

const SELECTOR = "input[type=checkbox][indeterminate]";

function apply(): void {
  for (const input of document.querySelectorAll<HTMLInputElement>(SELECTOR)) {
    if (!input.indeterminate) input.indeterminate = true;
  }
}

function onAnimationStart(event: AnimationEvent): void {
  const input = event.target;
  if (
    event.animationName === "pui-indeterminate" &&
    input instanceof HTMLInputElement &&
    !input.indeterminate
  ) {
    input.indeterminate = true;
  }
}

/** Once the user acts on the checkbox, the attribute has served its purpose. */
function onChange(event: Event): void {
  const input = event.target;
  if (input instanceof HTMLInputElement && input.matches(SELECTOR)) {
    input.removeAttribute("indeterminate");
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("change", onChange, true);
  document.addEventListener("animationstart", onAnimationStart, true);
  document.addEventListener("pointerdown", apply, true);
  document.addEventListener("focusin", apply, true);
  apply();
}

/** Side-effect module: this marks the file as ESM so nothing leaks to global scope. */
export {};
