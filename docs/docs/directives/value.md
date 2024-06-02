# HTML **Input**

## Attributes

- **`x-input`**
- **`x-value`**
- **`x-value-clean`**
- **`x-value-disabled`**
- **`x-value-validators`**

## **x-value**

!!! tip "x-value"

    The **`x-value`** directive efficiently updates the value of a specified Preact **`signal`** based on the associated element's **input type**. When used with input elements (**`input`**, **`textarea`**, **`select`**, **`progress`**), **`x-value`** allows seamless synchronization between the element's value and the corresponding **`signal`**, ensuring your application remains in sync with user input. This simplifies state management and enhances data flow within your application.

```js
function Component(props) {
  const text = preact.useSignal("");
  return <input x-html x-value={text} />;
}
```

## **x-value-clean**

!!! tip "x-value-clean"

    The **`x-value-clean`** directive allows you to **clean** or **filter** the input value **before updating** the state and the element's value. This can be useful for normalizing input data, such as trimming whitespace or converting to a specific case.

```js
function Component(props) {
  const text = preact.useSignal("");
  return (
    <input
      x-html
      x-value={text}
      x-value-clean={(value) => value.toLowerCase()}
    />
  );
}
```

## **x-value-validators**

!!! tip "x-value-validators"

    The **`x-value-validators`** directive provides a way to **validate** the input value after it has been cleaned. You can define an array of validation functions that each return either `true` for a valid value or a string describing the validation error.

```js
function Component(props) {
  const text = preact.useSignal("");
  return (
    <input
      x-html
      x-value={text}
      x-value-validators={[
        (v) => !!v || "Required Field!",
        (v) => v.length >= 8 || "At least 8 characters long",
      ]}
    />
  );
}
```

## **x-value-disabled**

!!! tip "x-value-disabled"

    The **`x-value-disabled`** directive is useful for **disabling the input** from user interaction. This can be used to conditionally enable or disable input elements based on application state.

```js
function Component(props) {
  return <input x-html x-value-disabled />;
}
```

## **x-input**

!!! tip "x-input"

    The **`x-input`** directive is useful for **extending** an **input** component. It allows you to:

    - Get the **current `value`** of the input
    - Submit the input value if it **is `valid`**
    - Present **`errors`** to the client for invalid inputs

```js
function Component(props) {
  const text = preact.useSignal("");
  return (
    <input
      x-html
      x-input={({ value, valid, errors }) =>
        console.log({ value, valid, errors })
      }
    />
  );
}
```

## **Example**

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
