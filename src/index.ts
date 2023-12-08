import pkg from "../package.json";

import { IThemeColor } from "./interfaces";
import { ACCORDION_ITEM } from "./constants";

function Accordion() {
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

function setThemeColor(colors: IThemeColor): void {
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

function setTheme(theme: "system" | "dark" | "light" = "system"): void {
  const systemIsDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  if ((theme === "system" && systemIsDark) || theme === "dark") {
    document.querySelector("html")?.classList.add("dark");
    return;
  }

  document.querySelector("html")?.classList.remove("dark");
}

function loadFunctions(): void {
  Accordion();
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
  const fns = { setTheme, setThemeColor, Accordion, loadFunctions };
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

export { setTheme, setThemeColor, Accordion };
