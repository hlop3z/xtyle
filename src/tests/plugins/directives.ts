// @ts-nocheck

const Plugin = {
  install() {
    return {
      // Directives
      directives: {
        demo: (self, props) => {
          preact.useEffect(() => {
            // Self
            self.ref.add("class-after-init");
            self.ref.remove("class-after-init");
            self.ref.toggle(["toggled-class"], true);
            self.ref.contains("toggled-class");
          }, []);
          // Demo
          console.log("Custom Directive");
          console.log(self.directives.custom["demo"]);
          console.log(props);
        },
      },
    };
  },
};

export default Plugin;
