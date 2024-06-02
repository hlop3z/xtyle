# Theme Colors

Theme colors refer to a predefined set of colors used to ensure visual consistency across a digital interface, such as a website or application. These colors are typically chosen to align with a brand's identity and to create a cohesive and aesthetically pleasing user experience.

## Set Colors

```js
const Theme = {
  theme: {
    success: "#4CAF50",
    danger: "#F44336",
    warning: "#ff9800",
    info: "#2196F3",
  },
  light: {
    danger: "#FFEBEE",
  },
  dark: {
    danger: "#B71C1C",
  },
  disable: [
    // "text", "color", "border", "table"
  ],
};

xtyle.theme.set(Theme);
```

## Usage

```html
<!-- Background -->
<div x-html theme-color="success"></div>

<!-- Text -->
<div x-html theme-text="success"></div>

<!-- Border -->
<div x-html theme-border="success"></div>

<!-- Table -->
<div x-html theme-table="success"></div>
```

## Color Types

- Background => **`bg`**
- Text => **`tx`**
- Border => **`br`**
- Table => **`tb`**

```html
<!-- Background -->
<div class="color-bg-<themeColor>"></div>

<!-- Text -->
<div class="color-bg-<themeColor>"></div>

<!-- Border -->
<div class="color-br-<themeColor>"></div>

<!-- Table -->
<div class="color-tb-<themeColor>"></div>
```

## Light | Dark

```html
<!-- Light -->
<div class="color-bg-<themeColor>-light"></div>

<!-- Dark -->
<div class="color-bg-<themeColor>-dark"></div>
```
