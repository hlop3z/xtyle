# Slots

The **`slots`** module provides a flexible mechanism for defining and utilizing component slots within your application. **Slots** are placeholders within a component where content can be dynamically injected.

## Key Features

- **Kebab-Case to PascalCase Conversion**: Slot names are declared in kebab-case and automatically converted to PascalCase to maintain consistency and readability in code.
- **Dynamic Slot Content**: Allows for dynamic content to be injected into pre-defined slots, enabling flexible and reusable component design.
- **Customizable Slot Components**: Pre-built slot components can be further customized to meet specific application needs.

## Declaring Expected Slots in a Component

Slots must be declared in kebab-case and will be converted to PascalCase.

```js
// Define Slots
const defineSlots = (props: any) =>
  xtyle.slotProps(props, ["header", "main", "footer"]);

// Example Sub-Component
const SlotComponent = xtyle.slot({}, (props) => {
  console.log("Slot Props", props);
  console.log("Parent Props", props.$root);
  return (
    <div>
      Children Slot
      {props.children}
    </div>
  );
});

// Component with Slots (Sub-Components)
export default function App(props) {
  const slots = defineSlots(props);
  return (
    <div>
      {slots.Header(SlotComponent, { extra: "args" } /* args */)}
      {slots.Main(SlotComponent)}
      {slots.Footer(SlotComponent)}
    </div>
  );
}
```

## Using the Component with Slots

The `Slot` is a pre-built sub-component, which can be further customized.

```js
<App
  slot-header={({ Slot, parent, args }) => {
    console.log(parent, args); // args => { extra: "args" }
    return <Slot my-var="value"></Slot>;
  }}
  slot-main={({ Slot }) => {
    return <Slot my-var="mainValue"></Slot>;
  }}
  slot-footer={({ Slot }) => {
    return <Slot my-var="footerValue"></Slot>;
  }}
></App>
```

## Benefits

- **Enhanced Readability**: Consistent naming conventions improve code readability and maintainability.
- **Reusability**: Dynamic slot content allows for creating highly reusable and customizable components.
- **Flexibility**: Easily customize pre-built slot components to fit specific use cases.
