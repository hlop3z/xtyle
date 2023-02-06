# (**API**) Components

```js
const CONTROLLER = {
  get state() {}, // { Values } Self
  set state(method) {}, // { Values } Self
  $reset() {}, // { State } Reset
  ctx: {}, // Non-Reactive Local Data
  get $router() {}, // { router } App
  get $route() {}, // { route } App View
  get $gui() {}, // { components } App
  get $store() {}, // { val } App
  get $ctx() {}, // { ctx } App
  get $custom() {}, // { custom } App
  toggle(el, key, value = null) {}, // { Toggle } Children / Siblings
  $toggle(key, value = null) {}, // { Toggle } Parent / Self
  get $methods() {}, // { methods } App
  $emit(action, value = null) {}, // { Emit } from Child to Parent
  get $ui() {}, // { Globals }
  $use(...components) {}, // Merge Components
};
```

## State

| Key                          | Description                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| `get()` => **`state`**       | **`return`** current **values**                                                        |
| `set(method)` => **`state`** | **`update`** current **values**                                                        |
| **`$store`**                 | App **`val`(s)** **Values** aka `reactive` values. You can [Read More. . .](../store/) |

## Example (**Get**)

```js
const buttonComponent = xtyle.dom({
  tag: "button",
  data: {
    title: "Click Me",
  },
  slot: {
    default() {
      const { title } = this.state;
      return title;
    },
  },
});
```

## Example (**Set**)

```js
{ self || this }.state = (draft) => {
  draft.count += 1;
};
// attrs uses (`self`)
// slot uses (`this`)
```

```js
const maxCount = 5;
const buttonComponent = xtyle.dom({
  tag: "button",
  data: {
    count: 0,
  },
  attrs: {
    // Attrs uses (`self`)
    "x-on:click": (self) => {
      const { count } = self.state;
      const isMax = count > maxCount;
      if (!isMax) {
        /* [Update Current Values]
            @set(method) => state         
        */
        self.state = (draft) => {
          draft.count += 1;
        };
      } else {
        self.$reset();
      }
    },
  },
  slot: {
    // Slot(s) uses (`this`)
    default() {
      const { count } = this.state;
      return "Count is: " + count;
    },
  },
});
```

## Tools for (Slots and Self)

| Key            | Description                                                           |
| -------------- | --------------------------------------------------------------------- |
| **`$reset`**   | Reset **`current-state`** to the **`original-state`**                 |
| **`$toggle`**  | **`Self`** element toggle **`class`**(es)                             |
| **`$router`**  | App **`router` controller**                                           |
| **`$gui`**     | App **`components`**                                                  |
| **`$ctx`**     | App **`ctx`(s)** **Static** `non-reactive` values                     |
| **`$custom`**  | App **`custom`(s)** **Custom** Objects of **`Any`** Type              |
| **`$methods`** | App **`methods`**                                                     |
| **`$emit`**    | Emit a **`method`** with **`arguments`** from **Child** to **Parent** |
| **`$ui`**      | Application Configs                                                   |
| **`$use`**     | Merge **`components`** into a **`fragment`**                          |

## Tools for (Slots and Local)

| Key          | Description                                   |
| ------------ | --------------------------------------------- |
| **`toggle`** | **`Children`** element toggle **`class`**(es) |
| **`ctx`**    | **`Non-Reactive`** local variables            |

## $Emit

### Method

```js
$emit("parentMethod", { txt: "hello" });
```

### Update

```js
const parentKey = "title";
const value = "Welcome";
$emit(`update:${key}`, value);
```
