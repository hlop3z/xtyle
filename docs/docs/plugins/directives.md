# Directives

Directives are special attributes that interact with the DOM, enabling you to apply side effects or modifications to elements. They provide a powerful way to extend the functionality of your components by encapsulating reusable behaviors.

## Custom Directives

Custom **`directives`** start with the prefix **`x-`**. For example, the **`extraclass`** directive can be declared and used to add additional classes to an element.

### Declaring a Custom Directive

Custom directives are defined within the **`self.directives.custom`** object. Here is how you can declare the **`extraclass`** directive:

```js
/* Plugin Install */
export function install(self, option) {
  return {
    // ...
    directives: {
      extraclass(self, props) {
        const { extraclass } = self.directives.custom;
        props.class = [props.class, extraclass];
      },
    },
    // ...
  };
}
```

### Using a Custom Directive

Once declared, you can use your custom directive in your components by adding the **`x-`** prefix to the directive name. Here’s an example of using the **`extraclass`** directive:

```html
<div x-extraclass="directive" class="regular"></div>
```

In this example, the **`extraclass`** directive adds additional classes to the element based on the logic defined in the directive.

## Example Explanation

- **Declaration**: The directive is defined within the `directives` object in the `install` function.
- **Usage**: The directive is applied to an element using the `x-extraclass` attribute.

This setup allows you to encapsulate and reuse custom behaviors across your application, enhancing modularity and maintainability.
