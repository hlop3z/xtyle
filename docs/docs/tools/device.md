# Device

The **Device** section provides utilities for accessing the dimensions of the window, allowing you to dynamically respond to changes in window size within your application.

## Window Width (**`X`**)

Access the current width of the window.

```js
xtyle.device.x;
```

## Window Height (**`Y`**)

Access the current height of the window.

```js
xtyle.device.y;
```

## Size Classification (**`size`**)

The current size classification of the window ('xs', 'sm', 'md', 'lg', 'xl').

```js
xtyle.device.size;
```

## Is Mobile (**`mobile`**)

Indicates if the device is considered mobile based on the width.
If the classification includes ('xs', 'sm', 'md')

```js
xtyle.device.mobile;
```

## Is Specified Classification (**`is`**)

A function to check if the current size matches the specified classification.
Takes a size classification ('xs', 'sm', 'md', 'lg', 'xl') as an argument.

```js
xtyle.device.is("xs", "sm") ? "yes" : "no";
```

## Update Classifications

Pass an object with updated values.

```js
xtyle.device.config({ xs: 100, sm: 300 });
```
