import Home from "./home.tsx";
import About from "./about.tsx";

const Routes = [
  // Home Page
  {
    path: "/",
    name: "home",
    view: Home,
  },
  // About Page
  {
    path: "/{view}",
    name: "custom",
    view: About,
  },
];

export default Routes;
