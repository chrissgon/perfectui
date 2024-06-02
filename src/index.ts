import pkg from "../package.json";

import "./index.scss";

import {
  ACCORDION_ITEM,
  ACCORDION_PARENT,
  CHECKBOX_INDETERMINATE,
  DROPDOWN,
  DROPDOWN_TRIGGER
} from "./constants";

export interface IThemeColor {
  50: number[] | string;
  100: number[] | string;
  200: number[] | string;
  300: number[] | string;
  400: number[] | string;
  500: number[] | string;
  600: number[] | string;
  700: number[] | string;
  800: number[] | string;
  900: number[] | string;
  950: number[] | string;
}

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

export function hideDropdowns({ dropdown }): void {
  const dropdowns = document.querySelectorAll(
    DROPDOWN
  ) as NodeListOf<HTMLElement>;

  for (const d of dropdowns) {
    if (dropdown === d) continue;
    d.classList.remove("visible");
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

    if (typeof color !== "string" && !Array.isArray(color)) {
      throw new Error("setThemeColor: invalid type");
    }

    if (Array.isArray(color)) {
      if (color.length != 3) {
        throw new Error(
          "setThemeColor: invalid rgb format. Expect [R, G, B] array"
        );
      }

      rgb = color.join(",");
    }

    if (typeof color === "string") {
      const matchRGB = /^\d{1,3}, \d{1,3}, \d{1,3}$/.test(color);

      if (!matchRGB)
        throw new Error(
          "setThemeColor: invalid rgb format. Expect 'R, G, B' string"
        );

      rgb = color;
    }

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

export function loadFunctions(): void {
  Accordion();
  Checkbox();
  Dropdown();
}

function loadFunctionsByDebounce(): void {
  let debounce = false;
  const enableDebounce = () => (debounce = true);
  const disableDebounce = () => (debounce = false);

  new MutationObserver(function () {
    if (debounce) return;
    enableDebounce();
    setTimeout(disableDebounce, 2000);

    loadFunctions();
  }).observe(document.body, { childList: true, subtree: true });
}

function addFunctionsGlobally(): void {
  const fns = {
    setMode,
    setThemeColor,
    Accordion,
    Checkbox,
    Dropdown,
    loadFunctions
  };
  Object.assign(window, { perfectui: fns });
  Object.assign(document, { perfectui: fns });
}

(function init() {
  console.log(`🎨 ${pkg.displayName} - ${pkg.version}`);

  try {
    addFunctionsGlobally();
    loadFunctionsByDebounce();
  } catch {
    // @ts-expect-error SSR verification
    if (process && process.server) return;

    setTimeout(init, 1000);
  }
})();
