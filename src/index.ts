import pkg from "../package.json";

import "./index.scss";

import {
  ACCORDION_ITEM,
  ACCORDION_PARENT,
  CHECKBOX_INDETERMINATE,
  DROPDOWN,
  DROPDOWN_TRIGGER,
  MODAL,
  MODAL_BACKDROP,
  MODAL_BUTTON,
  MODAL_OPENED,
  MODAL_TRIGGER
} from "./constants";

// interfaces
export interface IThemeColor {
  50: number[];
  100: number[];
  200: number[];
  300: number[];
  400: number[];
  500: number[];
  600: number[];
  700: number[];
  800: number[];
  900: number[];
  950: number[];
}

export interface IFunctions {
  Accordion: () => void;
  Checkbox: () => void;
  Dropdown: () => void;
  Modal: () => void;
  setMode: (theme?: "system" | "dark" | "light") => void;
  setThemeColor: (colors: IThemeColor) => void;
}

// methods
export function Checkbox(): void {
  const items = document.querySelectorAll(
    CHECKBOX_INDETERMINATE
  ) as NodeListOf<HTMLElement>;

  for (const item of items) {
    if (!item) return;
    // @ts-expect-error change custom prop "indeterminate"
    item.indeterminate = true;
    item.onclick = () => {
      item.removeAttribute("indeterminate");
    };
  }
}

export function Accordion(): void {
  const items = document.querySelectorAll(
    ACCORDION_ITEM
  ) as NodeListOf<HTMLElement>;

  for (const item of items) {
    item.onclick = (e: Event) => {
      if (!item) return;
      if (!e.target) return;

      const summary = e.target as HTMLElement;
      const parent = summary.closest(ACCORDION_PARENT) as HTMLElement;

      if (item.parentElement !== parent) return;

      const itemsByAccordion = parent.querySelectorAll(ACCORDION_ITEM);

      for (const itemAccordion of itemsByAccordion) {
        if (itemAccordion === item) continue;
        itemAccordion.removeAttribute("open");
      }
    };
  }
}

export function Dropdown(): void {
  const triggers = document.querySelectorAll(
    DROPDOWN_TRIGGER
  ) as NodeListOf<HTMLElement>;

  for (const trigger of triggers) {
    trigger.onclick = (e: Event) => {
      const target = e.target as HTMLElement;

      const ignoreClick =
        target.classList.contains("ignore") ||
        target.closest(".ignore") !== null;

      if (ignoreClick) return;

      const parent = e.currentTarget as HTMLElement;
      const dropdown = parent.querySelector(DROPDOWN) as HTMLElement;
      const isVisible = dropdown?.classList?.contains("visible");

      hideDropdowns({ dropdown });

      dropdown?.classList?.toggle("visible");

      if (isVisible) return;

      const fn = (e: Event) => {
        const target = e.target as HTMLElement;

        const ignoreClick =
          target.classList.contains("ignore") ||
          target.closest(".ignore") !== null;

        if (ignoreClick) {
          return;
        }

        dropdown?.classList?.remove("visible");
        document.body.removeEventListener("click", fn);
      };

      setTimeout(() => {
        document.body.addEventListener("click", fn);
      }, 0);
    };
  }
}

function hideDropdowns({ dropdown }): void {
  const dropdowns = document.querySelectorAll(
    DROPDOWN
  ) as NodeListOf<HTMLElement>;

  for (const d of dropdowns) {
    if (dropdown === d) continue;
    d.classList.remove("visible");
  }
}

function Modal(): void {
  const modals = document.querySelectorAll(
    MODAL_BACKDROP
  ) as NodeListOf<HTMLDialogElement>;
  const autocloses = document.querySelectorAll(
    MODAL_BUTTON
  ) as NodeListOf<HTMLElement>;
  const triggers = document.querySelectorAll(
    MODAL_TRIGGER
  ) as NodeListOf<HTMLElement>;

  for (const modal of modals) {
    modal.addEventListener("mousedown", (e: MouseEvent) => {
      const clickedOutside = e.target === modal;

      if (clickedOutside) {
        modal.close();
      }
    });
  }

  for (const button of autocloses) {
    button.addEventListener("click", (e: MouseEvent) => {
      if (!e.target) return;
      const modal = (e.target as HTMLElement).closest(
        MODAL
      ) as HTMLDialogElement;
      modal.close();
    });
  }

  for (const button of triggers) {
    button.addEventListener("click", (e: MouseEvent) => {
      if (!e.target) return;

      const openedModals = document.querySelectorAll(
        MODAL_OPENED
      ) as NodeListOf<HTMLDialogElement>;

      for (const modal of openedModals) {
        modal.close();
      }

      const modalID = (e.target as HTMLElement).getAttribute("data-modal");

      const modal = document.querySelector(`#${modalID}`) as HTMLDialogElement;

      modal?.show();
    });
  }
}

export function setThemeColor(colors: IThemeColor): void {
  if (Object.keys(colors).length < 11) {
    throw new Error(
      "setThemeColor: Insufficient tone range. Expect range 50 to 950"
    );
  }

  for (const tone in colors) {
    const color = colors[tone];
    let rgb: string = "";

    if (!Array.isArray(color)) {
      throw new Error("setThemeColor: invalid type");
    }

    if (color.length != 3) {
      throw new Error(
        "setThemeColor: invalid rgb format. Expect [R, G, B] array"
      );
    }

    rgb = color.join(",");

    document.documentElement.style.setProperty(`--theme${tone}`, rgb);
  }
}

export function setMode(theme: "system" | "dark" | "light" = "system"): void {
  const systemIsDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  if ((theme === "system" && systemIsDark) || theme === "dark") {
    document.querySelector("html")?.classList.add("dark");
    return;
  }

  document.querySelector("html")?.classList.remove("dark");
}

export function loadFunctions(): IFunctions {
  Accordion();
  Checkbox();
  Dropdown();
  Modal();

  return { Accordion, Checkbox, Dropdown, Modal, setMode, setThemeColor };
}

function loadFunctionsWithDebounce(): void {
  let debounce = false;
  function enableDebounce() {
    debounce = true;
  }
  function disableDebounce() {
    debounce = false;
  }

  new MutationObserver(function () {
    if (debounce) return;
    enableDebounce();
    setTimeout(disableDebounce, 1000);

    loadFunctions();
  }).observe(document.documentElement, { childList: true, subtree: true });
}

function addFunctionsGlobally(): void {
  const fns = loadFunctions();
  Object.assign(window, { perfectui: fns });
  Object.assign(document, { perfectui: fns });
}

// init
function init() {
  console.info(`🎨 ${pkg.displayName} - ${pkg.version}`);

  try {
    addFunctionsGlobally();
    loadFunctionsWithDebounce();
  } catch {
    console.info(
      `🎨 ${pkg.displayName} - ${pkg.version} SSR Identified, skiping init`
    );

    // @ts-expect-error SSR verification
    if ((process && process.server) || import.meta.server) return;

    setTimeout(init, 1000);
  }
}

init();
