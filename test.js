/* @ Demo Component
----------------------------------------
*/

const tableComponent = {
  data: {
    title: "WASAAP",
  },
  props: {
    class: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    console.log(this.title);
  },
  unmounted() {
    console.log(this.title);
  },
  methods: {
    print() {
      this.title = "Page " + Date.now();
    },
  },
  view() {
    return [
      "div",
      {
        id: "myDiv",
        ":class": "container",
        "@click": () => {
          this.title = "Home Page";
          GO("/about");
        },
        "@mounted": () => console.log("clicked"),
        "@unmounted": () => console.log("clicked"),
        "x-resize": "print",
      },
      [
        "Welcome To " + this.title,
        "\n ",
        ["h1", {}, "Hello, world!"],
        "\n ",
        ["p", {}, ["This is a simple example."]],
        "\n",
      ],
    ];
  },
};

const PageHome = Core.default.component(tableComponent);
// PageHome.mount("#app");

setInterval(() => {
  PageHome.$dict.set("title", Date.now());
}, 1000);

/*
 @ ROUTER
*/
const router = Core.default.router("#app", {
  "/": PageHome,
  "/about": PageHome,
});
