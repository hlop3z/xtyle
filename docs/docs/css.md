# Reactive **CSS**

!!! tip "Reactive CSS"

    A powerful **CSS solution** that dynamically applies styles **based on the state of an element `(is)`**, distinguishing between **`(on)` active** and **`(off)` inactive** control conditions. The advantage lies in its ability to update styles **without** requiring a full **re-rendering** of the element. This approach provides a **seamless and efficient** way to manage element styles based on user interactions or changing states, resulting in a more responsive and interactive user experience.

| Directive   | Description                                                         |
| ----------- | ------------------------------------------------------------------- |
| css-**is**  | Specifies the CSS class to apply when the condition is **`true`**.  |
| css-**on**  | Specifies the CSS classes to add when the condition is **`true`**.  |
| css-**off** | Specifies the CSS classes to add when the condition is **`false`**. |

Example:

```js
function Component(props) {
  const status = preact.useSignal(false);
  return (
    <div x-html css-is={status.value} css-on="active" css-off="inactive">
      Content goes here...
    </div>
  );
}
```
