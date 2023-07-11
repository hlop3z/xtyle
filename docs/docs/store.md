!!! info "Signals"

    A Preact **`signals`** wrapper that simplifies updating Array or Object structures by providing a streamlined approach. It offers an intuitive way to manage and modify complex data structures.

    The wrapper seamlessly integrates with Preact's Computed and Effect functionality, eliminating the need to remember which hook to use (**`useComputed`** or **`computed`**) or which effect to employ (**`useSignalEffect`** or **`effect`**). The wrapper automatically handles the appropriate selection based on whether the state is local or global.

    This seamless integration enhances the developer experience by reducing cognitive load and ensuring consistent usage of computed values and effects. It eliminates the need to track and differentiate between similar but context-specific functions, resulting in cleaner and more maintainable code

## Value (setup)

| Key             | Usage  | Description                                 |
| --------------- | ------ | ------------------------------------------- |
| **`useSignal`** | Local  | To be used **inside a component**.          |
| **`signal`**    | Global | To be used globally in the **application**. |

### **Single** (Value)

```js
const myState = xtyle.signal("Hello World!");
```

### **Object** (Value)

```js
const myState = xtyle.signal({
  title: "Hello World",
  status: "open",
});
```

## Methods

| Key            | Description                                                                               |
| -------------- | ----------------------------------------------------------------------------------------- |
| **`update`**   | You can use it to **update** a **value**. But the **benefit** is when using **Object(s)** |
| **`computed`** | **IF** is "**Local**" uses **`useComputed`** else it uses **`computed`**                  |
| **`effect`**   | **IF** is "**Local**" uses **`useSignalEffect`** else it uses **`effect`**                |
| **`reset`**    | You can use this method to **reset** the state to it's **original value**                 |

### **Single** (Update)

```js
myState.value = "New Value!";
// OR
myState.update("New Value!");
```

### **Object** (Update)

```js
myState.update((draft) => (draft.status = "close"));
```

### Computed

```js
const keys = myState.computed(() => Object.keys(myState.value));
```

### Effect

```js
myState.effect(() => console.log(myState.value));
```
