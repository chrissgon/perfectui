import type { setMode, getMode } from "../src/js/mode";

declare global {
  interface Window {
    pui: { setMode: typeof setMode; getMode: typeof getMode };
  }
}

export {};
