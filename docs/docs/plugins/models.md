# Models

Models can be declared in **two ways**: using an array of keys or using an object with key-value pairs to set default values.

The **`$root: true`** option creates models in the group without a namespace. By default, models are grouped into **namespaces** to organize them and avoid naming conflicts.

!!! tip "Fields"

    The fields you declare in the object are designed to be **reactive**. For example, you might declare fields such as **`["firstName", "lastName"]`** because they will receive input from the user. **You don't need to declare a field like `fullName`**, as it can be computed dynamically from **`firstName`** and **`lastName`**. This approach allows the constructor to identify which fields require input handling and ensures that only necessary fields are explicitly created for input operations.

```js
/* Plugin Install */
export function install(self, option) {
  return {
    // ...
    models: {
      // $root: true
      coreModels: {
        $root: true, // Makes it a root model, without a namespace.
        modelOne: ["fieldName"],
        modelTwo: ["fieldName"],
      },

      // namespaced models
      namespace: {
        modelOne: { fieldName: "value" },
        modelTwo: { fieldName: "value" },
      },

      // Database Real Names
      $ref: {
        modelOne: "database_table_one",
        "namespace.modelOne": "database_table_two",
      },
    },
    // ...
  };
}
```

!!! tip "$ref"

    To associate your model with the name of the **backend**, you can use the **`$ref`** attribute. This allows you to specify the backend reference for your model, ensuring that it correctly corresponds to the backend's data structure or endpoint.

## Get Model

```js
// $root: true
const coreModel = xtyle.models.get("modelOne");

// namespaced model
const namespaceModel = xtyle.models.get("namespace.modelOne");
```

## List All Models

```js
console.log(xtyle.models.keys());
```

## Model **`objects`**

```js
const { objects } = xtyle.models.get("namespace.modelOne");

console.log(objects.value);
```

## Loading Objects

```js
const { objects } = xtyle.models.get("namespace.modelOne");

// Load Data
objects.value = [{ id: 1, firstName: "john", lastName: "doe" }];
```

## Model **`instance`**

```js
const { instance } = xtyle.models.get("namespace.modelOne");

// Access a field in the instance
console.log(instance.fieldName.value);
```

### Core Utility Methods

| Key      | Description                                        |
| -------- | -------------------------------------------------- |
| `$set`   | Sets new values in the dictionary                  |
| `$reset` | Resets all values in the dictionary                |
| `$diff`  | Computes the difference between original & current |
| `$`      | Computed values                                    |

### Other Utility Methods

| Key         | Description                                  |
| ----------- | -------------------------------------------- |
| `$keys`     | Iterates over each key in the dictionary     |
| `$computed` | Uses a computed value based on context       |
| `$effect`   | Applies a side effect based on context       |
| `$get`      | Retrieves a value from the dictionary        |
| `$items`    | Gets all key-value pairs from the dictionary |
| `$for`      | Iterates over each item in the dictionary    |
| `$values`   | Iterates over each value in the dictionary   |

## Loading an Instance

This how you load the instance from the backend.

```js
const { instance } = xtyle.models.get("namespace.modelOne");

// Load Data
instance.$set({
  firstName: "john",
  lastName: "doe",
});
```

## Updating an Instance Locally

```js
const { instance } = xtyle.models.get("namespace.modelOne");

// Update a Field
instance.firstName.value = "katarina";
```

## Commit Instance Updates

The **`$diff`** will return only the fields that have changed.

```js
const { instance } = xtyle.models.get("namespace.modelOne");

// Get Difference and Saving Method
const { value, save } = instance.$diff();

// Backend Commit Updates
someBackendAPIUpdate(value).then(() => {
  // Save Updates Locally
  save();
});
```
