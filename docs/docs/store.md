!!! info "Signals"

    Wrapper for preact's **`signals`**. The purpose is to provide a simpler way to update an **`Array`** or **`Object`**.
    Also, **Computed** and **Effect** are bind to each state, that way there is no need to worry about remembering if you need to use **`useComputed`** or **`computed`**, depending if is local or global it will use the correct one. Same goes for **`useSignalEffect`** or **`effect`**.

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
