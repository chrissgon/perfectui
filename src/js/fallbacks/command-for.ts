/**
 * Fallback for `commandfor` / `command` on a button (ARCHITECTURE.md §8).
 *
 * Reads only the native attributes, so the markup is identical to the one a
 * supporting browser handles on its own. Delegated on document, which is what
 * makes it work for elements React or Vue insert later.
 */

type Command = (target: HTMLElement) => void;

const COMMANDS: Record<string, Command> = {
  "show-modal": (target) => (target as HTMLDialogElement).showModal?.(),
  close: (target) => (target as HTMLDialogElement).close?.(),
  "request-close": (target) => {
    // requestClose is newer than the TypeScript DOM types.
    const dialog = target as HTMLDialogElement & { requestClose?: () => void };
    if (typeof dialog.requestClose === "function") dialog.requestClose();
    else dialog.close?.();
  },
  "show-popover": (target) => target.showPopover?.(),
  "hide-popover": (target) => target.hidePopover?.(),
  "toggle-popover": (target) => target.togglePopover?.()
};

let installed = false;

function onClick(event: MouseEvent): void {
  if (!(event.target instanceof Element)) return;

  // Native invoker commands only act on a <button>; matching anything else
  // would make the fallback more permissive than the feature it emulates.
  const source = event.target.closest<HTMLButtonElement>(
    "button[commandfor][command]"
  );
  if (!source || source.disabled) return;

  const id = source.getAttribute("commandfor");
  const command = source.getAttribute("command")?.toLowerCase();
  if (!id || !command) return;

  const target = document.getElementById(id);
  if (target) COMMANDS[command]?.(target);
}

if (typeof document !== "undefined" && !installed) {
  installed = true;
  document.addEventListener("click", onClick);
}

/** Side-effect module: this marks the file as ESM so nothing leaks to global scope. */
export {};
