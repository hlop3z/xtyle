!!! tip "xtyle.table"

    Register tables that are reactivity powered by Preact's **`signal`**, **`effect`**, and **`computed`** methods. It offers a wide range of data operations, enabling efficient management and manipulation of records within the virtual database.

## Properties

- **info**: Provides information about the table.

| Key      | Description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| **mode** | Gets or sets the current mode of the table (e.g., "list", "edit", "create"). |
| **form** | Gets or sets the form data (editable record) for the table.                  |
| **list** | Gets or sets the list of records in the table.                               |

## **Reactive** Methods

| Key            | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| **computed**   | Creates a computed value based on the provided method.             |
| **effect**     | Adds an effect to be triggered when the table state changes.       |
| **updateList** | Updates the list of records using the provided method.             |
| **updateForm** | Updates the form data (editable record) using the provided method. |

## **Table** Methods

| Key           | Description                                                                         |
| ------------- | ----------------------------------------------------------------------------------- |
| **head**      | Returns the **first (N)** records from the table.                                   |
| **tail**      | Returns the **last (N)** records from the table.                                    |
| **by**        | Returns **records grouped** by the **specified column key**.                        |
| **sort**      | Sorts the records in ascending or descending order based on the provided column(s). |
| **groupBy**   | Groups records in the list based on the **specified column key**.                   |
| **find**      | Finds records in the list that match the **specified column and value**.            |
| **findNot**   | Finds records in the list that do not match the **specified column and value**.     |
| **search**    | Filters records that match the search value in the **specified column(s)**.         |
| **searchNot** | Filters records that do not match the search value in the **specified column(s)**.  |
| **dirtyList** | Returns records that have been updated compared to the current list.                |
| **dirtyForm** | Returns the updated values in the form compared to the current form.                |

---

## Example

This demo showcases the usage of the **xtyle.table** wrapper to manage a virtual database table.

### Table Creation and Setup

```js
// Create a new database table instance named "app.model"
const table = Database("app.model");
```

### Initial Data Setup

```js
// Set the initial list of records for the table
table.list = [
  { id: 1, text: "ITEM 1" },
  { id: 2, text: "ITEM 2" },
  { id: 3, text: "ITEM 3" },
  { id: 4, text: "ITEM 4" },
  { id: 5, text: "ITEM 5" },
];
```

### Asynchronous Updates

```js
// Define a computed value to search for records with "text" containing "item 5"
const demo = table.computed((self: any) => self.search("text", "item 5"));

// After 1 second, remove the last record from the table using `updateList` method
setTimeout(() => {
  table.updateList((items) => {
    items.pop();
  });

  // Update the form data by adding a new key "key" with the value "one"
  table.updateForm((form) => {
    form.key = "one";
  });

  // Update the form data again by deleting the key "key"
  table.updateForm((form) => {
    delete form.key;
  });
}, 1000);
```

### Effects

```js
// Add an effect to log the current mode and form data whenever they change
table.effect(() => {
  console.log(table.mode);
  console.log(table.form);
});

// Add an effect to log the current list and the computed result "demo.value"
table.effect(() => {
  console.log(table.list);
  console.log(demo.value);
});
```
