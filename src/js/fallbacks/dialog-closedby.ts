/**
 * Fallback for `<dialog closedby>` (ARCHITECTURE.md §8).
 *
 * "any" adds light dismiss, "none" takes the escape key away. "close-request"
 * is the browser default and needs nothing.
 */

function closedBy(dialog: HTMLDialogElement): string {
  return (dialog.getAttribute("closedby") ?? "").toLowerCase();
}

/**
 * A click on the backdrop reports the dialog itself as its target, because the
 * backdrop belongs to the dialog's box. Comparing the pointer against the
 * dialog's rectangle is what separates a backdrop click from a click on the
 * dialog's own padding.
 */
function onClick(event: MouseEvent): void {
  const dialog = event.target;
  if (!(dialog instanceof HTMLDialogElement)) return;
  if (!dialog.open || closedBy(dialog) !== "any") return;

  const rect = dialog.getBoundingClientRect();
  const inside =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!inside) dialog.close();
}

/** `cancel` does not bubble, so it is caught on the way down. */
function onCancel(event: Event): void {
  const dialog = event.target;
  if (dialog instanceof HTMLDialogElement && closedBy(dialog) === "none") {
    event.preventDefault();
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("click", onClick);
  document.addEventListener("cancel", onCancel, true);
}

/** Side-effect module: this marks the file as ESM so nothing leaks to global scope. */
export {};
