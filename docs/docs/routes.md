# **Xtyle** | Routes

!!! tip

    You can define **route**(s) like this **`some-{key1}-{key2}/{key3}`**

```js
export default {
  routes: {
    "/mypath/some-{key1}-{key2}/{key3}": pageComponent,
  },
};
```

!!! info "Access"

    You can **access** the current **`route`** via the **`$ui.router`**

```js
export default {
  mounted: () => {
    console.log(this.$ui.router.current);
  },
  view: () => ["div", {}, ["Hello World"]],
};
```

!!! example "Return"

    You should see . . .

    - **`route`**
    - **`path`**
    - **`args`** your pre-defined arguments
    - **`query`** any paramater in the query **`?key1=val1&key2=val2`**

### Example Output

```json
{
  "route": "/mypath/some-{key1}-{key2}/{key3}",
  "path": "/mypath/some-val1-val2/val3",
  "args": {
    "key1": "val1",
    "key2": "val2",
    "key3": "val3"
  },
  "query": {
    "key": "val"
  }
}
```
