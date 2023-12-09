import pkg from "../package.json";

import { IThemeColor } from "./interfaces";
import {
  ACCORDION_ITEM,
  CHECKBOX_INDETERMINATE,
  TOOLTIP_ELEMENT,
  TOOLTIP_TARGET,
} from "./constants";

export function Checkbox(): void {
  const items = document.querySelectorAll(
    CHECKBOX_INDETERMINATE
  ) as NodeListOf<HTMLElement>;

  for (const item of items) {
    if (!item) return;
    // @ts-ignore
    item.indeterminate = true;
    item.addEventListener("click", () => {
      item.removeAttribute("indeterminate");
    });
  }
}

export function Accordion(): void {
  const items = document.querySelectorAll(
    ACCORDION_ITEM
  ) as NodeListOf<HTMLElement>;

  for (const item of items) {
    item.onclick = () => {
      if (!item) return;
      if (!item.parentElement) return;

      const itemsByAccordion =
        item.parentElement.querySelectorAll(ACCORDION_ITEM);

      for (const itemAccordion of itemsByAccordion) {
        if (itemAccordion === item) continue;

        itemAccordion.removeAttribute("open");
      }
    };
  }
}

export function Tooltip() {
  const items = document.querySelectorAll(
    TOOLTIP_TARGET
  ) as NodeListOf<HTMLElement>;

  for (const item of items) {
    item.onmouseenter = ({ target }: any) => {
      const { top: scrollTop, left: scrollLeft } =
        document.body.getBoundingClientRect();
      const { top: topTarget, left: leftTarget } = item.getBoundingClientRect();

      const div = document.createElement("div");

      div.innerHTML = target.getAttribute("tooltip");
      div.classList.add("tooltip");

      if (target.hasAttribute("black")) {
        div.classList.add("tooltip-black");
      }

      document.body.append(div);

      const left = leftTarget - scrollLeft;
      div.style.setProperty("left", `${left}px`);

      const divHeight = div.offsetHeight;
      const top = topTarget - scrollTop - divHeight - 5;
      div.style.setProperty("top", `${top}px`);
    };
    item.onmouseleave = () => {
      document.querySelector(TOOLTIP_ELEMENT)?.remove();
    };
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
      if (color.length > 3)
        throw new Error(
          "setThemeColor: invalid rgb format. Expect [R, G, B] array"
        );

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

export function setTheme(theme: "system" | "dark" | "light" = "system"): void {
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
  Tooltip();
}

function loadFunctionsByDebounce(): void {
  let debounce = false;
  const enableDebounce = () => (debounce = true);
  const disableDebounce = () => (debounce = false);

  document.addEventListener("mousemove", () => {
    if (debounce) return;
    enableDebounce();
    setTimeout(disableDebounce, 2000);

    loadFunctions();
  });
  document.addEventListener("click", () => {
    loadFunctions();
  });
}

function addFunctionsGlobally(): void {
  const fns = {
    setTheme,
    setThemeColor,
    Accordion,
    Checkbox,
    Tooltip,
    loadFunctions,
  };
  Object.assign(window, { perfectui: fns });
  Object.assign(document, { perfectui: fns });
}

(function init() {
  if (window && document) {
    console.log(`🎨 ${pkg.displayName} - ${pkg.version}`);

    addFunctionsGlobally();
    loadFunctionsByDebounce();

    return;
  }

  setTimeout(init, 1000);
})();
