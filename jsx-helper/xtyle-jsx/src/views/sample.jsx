import components from "../components";

const { pageName, xButton } = components;

export default {
  tag: "div",
  slot: {
    default() {
      const { $router } = this;
      return (
        <div>
          {pageName()}
          <br />
          <button x-ripple x-on:click={() => $router.go("/")}>
            Go Home
          </button>
          <button x-on:click={() => $router.go("/2nd")}>Go Second</button>
          <button x-on:click={() => $router.go("/3rd")}>Go Third</button>
          <button
            x-on:click={() =>
              $router.go("/not/found/" + new Date().toISOString())
            }
          >
            Page Not Found
          </button>
          <br />
          <br />
          {xButton({ isGlobal: false })}
          {xButton({ isGlobal: true })}
        </div>
      );
    },
  },
};
