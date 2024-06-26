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
  setMode: (theme?: "system" | "dark" | "light") => void;
  setThemeColor: (colors: IThemeColor) => void;
}
