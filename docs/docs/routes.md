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

!!! info "Controller"

    You can **access** the current **`router`** via the **`this.$router`** inside your components.

!!! info "View"

    You can **access** the current **`route`** via the **`this.$route`** inside your components.

```js
const myComponent = {
  mounted() {
    const { $router } = this;
    console.log($router);
  },
  slot: {
    default() {
      const { $route } = this;
      return $route;
    },
  },
};
```

!!! example "$router"

    You should see . . .

    - **`go`** to change routes.
    - **`route`**
    - **`path`**
    - **`args`** your pre-defined arguments
    - **`query`** any paramater in the query **`?key1=val1&key2=val2`**

### Example **`$router`**

```json
{
  "go": "function",
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
