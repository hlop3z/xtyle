function deepMerge(target, ...sources) {
  sources.forEach((source) => {
    for (let key in source) {
      if (source[key] instanceof Object) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  });
  return target;
}

function mergeObjects(obj1, obj2, avoidModification = false) {
  if (avoidModification) {
    return deepMerge(Object.assign({}, obj1), obj2);
  } else {
    return deepMerge(obj1, obj2);
  }
}

function compare(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  )
    return false;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!compare(obj1[key], obj2[key])) return false;
  }
  return true;
}

function produce(current, method) {
  const draft = Object.assign({}, current);
  method(draft);
  const next = mergeObjects(current, draft, true);
  const update = compare(current, next);
  return { data: next, update: !update };
}

class Reactive {
  constructor(reactObject) {
    const defaultValue = { ...reactObject };
    this.original = defaultValue;
    this.current = defaultValue;
    this.vdom = null;
    this.redraw = false;
    this.$redraw = () =>
      window.$________________PRIVATEDICT________________$.redraw();
  }

  get state() {
    return this.current;
  }

  set state(method) {
    return this.update(method);
  }

  update(method) {
    const { data, update } = produce(this.current, method);
    if (update) {
      this.current = data;
      if (this.redraw) {
        this.$redraw();
      } else if (this.vdom) {
        if (this.vdom.view) {
          this.vdom.view();
        }
        if (this.vdom.self) {
          if (this.vdom.self.parent) {
            const vdom = this.vdom.self;
            const parent = this.vdom.self.parent;
            const watch = vdom.$watch;
            const watchKeys = Object.keys(watch);
            if (parent.$data && watchKeys.length > 0) {
              parent.$data.update((draft) => {
                watchKeys.forEach((key) => {
                  draft[watch[key]] = this.current[key];
                });
              });
            }
          }
        }
      }
    }
  }

  reset() {
    this.current = this.original;
  }
}

function reactive(originalData) {
  return new Reactive(originalData);
}

export default {
  model: reactive,
  produce,
  compare,
  merge: mergeObjects,
};

/* @ Demo

const reactiveData = reactive({
  name: "John Doe",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
  },
});

// DO Update
const update = reactiveData.update((draft) => {
  draft.name = "Jane Doe";
  draft.age = 25;
  draft.address.city = "New City";
});

// Log Update
console.log(update); // true
console.log(reactiveData.current);

// DO Reset
reactiveData.reset();

// Log Reset
console.log(reactiveData.current);
  -----------*/
