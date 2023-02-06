## JavaScript

### **`$use`** | **Fragment**

```js
// xtyle.dom
export default {
  slot: {
    default() {
      // Attaching (this) as the parent component { is not required }.
      const list = listComponent({
        /* Props */
      })(this);

      const search = SearchComponent({
        update(value) {
          // Update List
          list.state = (draft) => (draft.search = value);
        },
      })(); // Not Attached

      // Merged with ($use)
      return this.$use(search, list);
    },
  },
};

const listComponent = xtyle.dom({
  tag: "ul",
  props: {
    search: null,
    items: [
      { text: "Apple" },
      { text: "Blueberry" },
      { text: "Banana" },
      { text: "Orange" },
      { text: "Mango" },
      { text: "Avocado" },
      { text: "Lychee" },
      { text: "Pineapple" },
    ],
  },
  slot: {
    default() {
      const { items, search } = this.state;
      let filtered = items;
      if (search) {
        filtered = items.filter((item) => {
          const text = item.text.toLowerCase();
          const query = search.toLowerCase();
          return text.includes(query);
        });
      }
      return filtered.map((item) => [
        "li",
        {
          "x-on:dblclick": () => console.log(item.text),
        },
        item.text,
      ]);
    },
  },
});

const SearchComponent = xtyle.dom({
  props: {
    update: () => {},
  },
  slot: {
    default() {
      return [
        "input",
        {
          placeholder: "Search",
          "x-on:input": (event) => this.state.update(event.target.value),
        },
      ];
    },
  },
});
```

### **`HyperScript`** | **Component**

```js
// xtyle.dom
export default {
  slot: {
    default() {
      const list = listComponent({})(this);

      const search = SearchComponent({
        update(value) {
          // Update List
          list.state = (draft) => (draft.search = value);
        },
      })(this);

      // Element
      return ["div", {}, [search, list]];
    },
  },
};

// etc ...
```

---

## JavaScript ( **XML** )

### **`JSX`** | **Fragment**

```js
// xtyle.dom
export default {
  slot: {
    default() {
      const list = listComponent({})(this);

      const search = SearchComponent({
        update(value) {
          // Update List
          list.state = (draft) => (draft.search = value);
        },
      })(this);

      // Merged Internally
      return (
        <template>
          {search}
          {list}
        </template>
      );
    },
  },
};

// etc ...
```

### **`JSX`** | **Component**

```js
// xtyle.dom
export default {
  slot: {
    default() {
      const list = listComponent({})(this);

      const search = SearchComponent({
        update(value) {
          // Update List
          list.state = (draft) => (draft.search = value);
        },
      })(this);

      // Element
      return (
        <div>
          {search}
          {list}
        </div>
      );
    },
  },
};

// etc ...
```
