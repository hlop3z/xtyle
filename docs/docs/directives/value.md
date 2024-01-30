# **x-value** and **x-value-clean**

!!! tip "x-value"

        It efficiently updates the value of the specified Preact **`signal`** based on the provided element's **input-type**. When used with input elements (**`input`,`textarea`, `select`, `progress`**), **`x-value`** allows **seamless synchronization** between the element's value and the corresponding **`signal`**, ensuring your application stays in sync with user input. Simplify state management and enhance data flow with the **`x-value`** function.

!!! tip "x-value-clean"

        You can **clean/filter** the value **before updating** the state and element's value.

!!! tip "x-value-validators"

        You can **validate** the value after you filter it.

!!! tip "x-input"

        Useful for **extending** an **input** component.

        - Get the **current `value`**
        - Submit if the value **is `valid`**
        - Present **`errors`** to the client

```js
function Component(props) {
  const text = preact.useSignal("");
  return (
    <input
      x-html
      x-input={({ value, valid, errors }) =>
        console.log({ value, valid, errors })
      }
      x-value={text}
      x-value-clean={(value) => value.toLowerCase()}
      x-value-validators={[
        (v) => !!v || "Required Field!",
        (v) => v.length >= 8 || "At least 8 characters long",
      ]}
    />
  );
}
```
