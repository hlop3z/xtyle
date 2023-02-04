import javascriptLogo from "./assets/logos/javascript.svg";
import xtyleLogo from "./assets/logos/xtyle.svg";

const title = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default {
  slot: {
    default() {
      const { $route, $router, $ui } = this;
      if ($router.route === "404") {
        return $route;
      }
      return (
        <div id="app">
          <h1>{title($ui.ctx.project.name)} | App</h1>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            target="_blank"
          >
            <img
              src={javascriptLogo}
              class="logo vanilla"
              alt="JavaScript logo"
            />
          </a>
          <a href="https://hlop3z.github.io/xtyle/" target="_blank">
            <img src={xtyleLogo} class="logo" alt="Xtyle logo" />
          </a>
          <br />
          <br />
          <button x-ripple={{ color: "red", circle: true, center: true }}>
            X-Ripple
          </button>
          <br />
          <br />
          {$route}
        </div>
      );
    },
  },
};
