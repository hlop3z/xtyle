Here you will learn how to use this library with **`JSX`** and **`Vite`**.

[**Click Here**](https://github.com/hlop3z/xtyle/releases/download/jsx-template/xtyle-jsx.zip) to Download the template.

Is just a simple **`vite`** template with the configurations to transform **`JSX`** into **`Xtyle` Code**

**After downloading** and **`unzipping`** just run the following code inside the folder:

## Installation

```sh
npm install
npm run dev
```

![Xtyle App](demo.png)

## Demo | **Components**

!!! note

        It comes with two (2) components.

### Button

```js
export default xtyle.h({
  props: {
    text: {
      type: String,
      default: "Count is",
    },
  },
  data: {
    count: 0,
  },
  methods: {
    toggle() {
      this.count += 1;
    },
  },
  view() {
    return (
      <button x-on:click={this.toggle}>
        {this.text} {this.count.toString()}
      </button>
    );
  },
});
```

### Hello World

```js
export default xtyle.h({
  view() {
    return (
      <div>
        <h1>Xtyle | App</h1>
        {Button()}
      </div>
    );
  },
});
```
