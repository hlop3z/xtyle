# **x-for** and **x-in**

!!! tip "x-for and x-in"

        Powerful utilities that **enable effortless looping** through an **array** or **range** to render elements **for each item**.

        With **`x-for`** and **`x-in`**, you can easily iterate over an array of items or a range defined by an integer number, rendering elements dynamically. Simplify repetitive rendering tasks and enhance code readability with the flexibility of **`x-for`** and **`x-in`**.

Example:

```js
<x-slot
  x-for={(item) => <li>{item}</li>}
  x-in={["one", "two", "three"]}
></x-slot>
```

Range Example:

```js
<x-slot x-for={(item) => <li>{item}</li>} x-in={3}></x-slot>
```
