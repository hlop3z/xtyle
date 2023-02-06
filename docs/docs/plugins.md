## Usage

```js
const app = xtyle.app({
  /* Setup */
});

app.use(pluginA);
app.use(pluginB);
```

## Plugin (**A**)

```js
const pluginA = {
  install(mixin) {
    mixin({
      directives: {
        css(vnode, value) {
          const self = vnode.vdom ? vnode.vdom : vnode;
          self.style.color = value.color;
        },
      },
    });
  },
};
```

## Plugin (**B**)

```js
const pluginB = {
  install(mixin) {
    mixin({
      directives: {
        extra: (vnode, value) => {
          const self = vnode.vdom ? vnode.vdom : vnode;
          self.style.backgroundColor = value.color;
        },
      },
    });
  },
};
```
