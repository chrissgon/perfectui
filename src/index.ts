import pkg from "../package.json";

console.log(`🎨 ${pkg.displayName} - ${pkg.version}`);

import { IThemeColor } from "./interfaces";

function setThemeColor(colors: IThemeColor): void {
  for (const tone in colors) {
    const hex = colors[tone];
    document.documentElement.style.setProperty(`--theme${tone}`, hex);
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

(function init() {
  if (window && document) {
    return;
  }

  setTimeout(init, 1000);
})();

export { setTheme, setThemeColor };
