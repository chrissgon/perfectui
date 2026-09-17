#### Getting Started

# TypeScript

Perfect UI ships its own type declarations. There is nothing to install.

### Color mode

```ts
import { setMode, getMode, type Mode } from "@chrissgon/perfectui/mode";

const mode: Mode = getMode(); // "system" | "light" | "dark"

setMode("dark");
setMode(); // back to the system preference
```

### The fallback loader

Importing the loader for its side effect is all most projects need:

```ts
import "@chrissgon/perfectui";
```

The registry is exported if you want to inspect what your browser is missing, or to drive the loading yourself:

```ts
import { features, loadFallbacks, type Feature } from "@chrissgon/perfectui";

for (const feature of features) {
  console.log(feature.name, feature.supported());
}

// Force every fallback, which is useful when testing the non-native path.
loadFallbacks(
  features.map((feature) => ({ ...feature, supported: () => false }))
);
```

A single fallback can also be imported directly, if you know you need it:

```ts
import "@chrissgon/perfectui/fallbacks/interest-for";
```
