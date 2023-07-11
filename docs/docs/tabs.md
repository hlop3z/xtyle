!!! info "Description"

    The purpose of the **Tabs** component is to provide developers with an efficient way to handle client-side navigation within tabs, similar to the **Router**, but specifically designed for tab-based navigation. It allows developers to control tab navigation without tightly coupling the components and their controllers.

    With the Tabs component, developers can create modular and intuitive tabbed interfaces, promoting separation of concerns and code reusability. The component empowers developers to define and control tab navigation logic independently, offering customization and precise control over the user experience.

## Methods

| Key                     | Description                           |
| ----------------------- | ------------------------------------- |
| **`xtyle.tabs.view`**   | Display current **Tab(s)**.           |
| **`xtyle.tabs.toggle`** | Method to change routes (**Multi**).  |
| **`xtyle.tabs.active`** | Method to change routes (**Single**). |

## Usage

!!! tip

    Example of each util.

### View(s)

```html
<xtyle.tabs.view />
```

### Toggle

```js
xtyle.tabs.toggle("tabs-group-name", "tab-name");
```

### Active

```js
xtyle.tabs.active("tabs-group-name", "tab-name");
```
