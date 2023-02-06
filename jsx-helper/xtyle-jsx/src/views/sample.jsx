export default {
  slot: {
    default() {
      const { $router } = this;
      const { pageName, xButton } = this.$gui;
      return (
        <template>
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
        </template>
      );
    },
  },
};
