/* Library */
import * as Components from "./components";
import Directives from "./directives.ts";

export const plugin = {
  //@ts-ignore
  elements: xtyle.build(Components, packageName),
  directives: Directives,
};
