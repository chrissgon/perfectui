#### Customization

# Define your own color palette

Perfect UI allows you to define your own color palette, automatically adjusting all components to it.

### How it works

To better adapt to your visual identity, Perfect UI provides the `setThemeColor` method that allows you to define your color palette, setting it as the default for the entire application.

``` ts
import { setThemeColor } from "@chrissgon/perfectui"

const palette = {
  50: [240, 250, 255],
  100: [223, 244, 255],
  200: [184, 235, 255],
  300: [121, 220, 255],
  400: [52, 204, 254],
  500: [7, 182, 240],
  600: [0, 146, 205],
  700: [0, 116, 166],
  800: [3, 98, 137],
  900: [9, 81, 113],
  950: [6, 51, 75],
}

setThemeColor(palette)
```

The `setThemeColor` method expects to receive an object that satisfies the `IThemeColor` interface.

> ⚠️ Attention needed: 
> To satisfy the interface, you need to enter a shade from 50 to 950 in RGB!

``` ts
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
```