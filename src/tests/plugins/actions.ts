// @ts-nocheck

/* @Actions */
const Plugin = {
  install() {
    return {
      actions: {
        method() {
          console.log(`Core Method`);
        },
        parent: {
          child: {
            grandchild: {
              method: function () {},
              anotherChild: {
                method: function () {},
              },
            },
          },
        },
      },
    };
  },
};

export default Plugin;
