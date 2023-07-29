// @ts-nocheck

import PathDict from "./path-dict";

const BACKEND_SCHEMA = {
  // app.model
  app: {
    model: "Bonjour!",
  },
  frontend: {
    // Set
    project: {
      create(form = {}) {
        console.log("create");
        console.log(form);
      },
      read(id = 0) {
        console.log(`read: ${id}`);
      },
      update(id = 0, form = {}) {
        console.log(`update: ${id}`);
        console.log(form);
      },
      delete(id) {
        console.log(`delete: ${id}`);
      },
      // Array(s)
      list: {
        filter({
          query = {},
          page = { page: 1, pages: 1, limit: 25, sort: "-id" },
          all = false,
        } = {}) {
          console.log("list || filter");
          console.log(query);
          console.log(page);
          console.log(all);
        },
        read({
          query = {},
          page = { page: 1, pages: 1, limit: 25, sort: "-id" },
          all = false,
        } = {}) {
          console.log("list || filter");
          console.log(query);
          console.log(page);
          console.log(all);
        },
        create(formArray = []) {
          console.log("create");
          console.log(formArray);
        },
        update(query = {}, form = {}) {
          console.log("update");
          console.log(query);
          console.log(form);
        },
        delete(query = {}) {
          console.log("delete");
          console.log(query);
        },
      },
    },
  },
};

/** @AdminBackend */
const API = PathDict(BACKEND_SCHEMA);

API.get("frontend.project.list.filter")();

API.set("app.model", {
  create() {
    console.log("app.model");
  },
});

console.log(API.get("app.model"));
