# Slot **Return(s)** | Component

```js
xtyle.dom({
  // slot ...
  default() {
    return null;
  },
});
```

---

## Nothing **`null`**

```js
return null;
```

## **H**yper-**S**cript **`Array`**

```js
return ["h3", {}, "Hello World"];
```

## HTML **`Element`**

```js
const element = document.createElement("div");
element.innerText = "Hello World";
return element;
```

---

## Another **`Component`** | **Props**

> Rendered with **`props`**

```js
return myComponent({
  /* Props */
})(this);
```

## Another **`Component`** | **No-Props**

> **Not** yet rendered | **Without `props`**

```js
return myComponent;
```

---

## **`$use`** to Merge | **Components**

> Creates a **`fragment`**

```js
return this.$use(...components);
```

### Example

```js
return this.$use(search, list);
```
