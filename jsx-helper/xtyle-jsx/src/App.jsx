import javascriptLogo from "./assets/logos/javascript.svg";
import xtyleLogo from "./assets/logos/xtyle.svg";

export default {
  slot: {
    default() {
      const { $route, $router } = this;
      if ($router.route === "404") {
        return $route;
      }
      return (
        <div id="app">
          <h1>Xtyle | App</h1>
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
          {$route}
        </div>
      );
    },
  },
};
