/**
 * Import Core
 */
import { Directive, collectDirectives } from "./utils";
import createRefAdmin from "../../useRef";

/**
 * Import statements for required modules and functions.
 */
import Props from "../props";
import {
  isNotBlank,
  handleReactiveCSS,
  handleHooks,
  handleHTMLElement,
  handlePortal,
  handleForLoop,
  handleSwitchCase,
  handleShowCSS,
} from "./handlers";

/**
 * Component function to render different views based on directives.
 * @param {Props} props - The props passed to the component.
 * @returns {any} - The rendered JSX element based on the directives.
 */
export default function Component(props: Props = {}): any {
  // Initialization
  const selfRef: any = createRefAdmin();
  const directives: Directive = collectDirectives(props);
  const tagHTML: string | null = directives.custom["tag"] || null;

  // SELF
  const selfContext = { props, directives, ref: selfRef };

  if (isNotBlank(directives.custom["if"])) {
    if (directives.custom["if"] === false) {
      return null;
    }
  }

  if (directives.custom["live"]) {
    return directives.custom["live"](props);
  }

  if (
    directives.custom["fallback"] &&
    isNotBlank(directives.custom["fallback-is"])
  ) {
    if (directives.custom["fallback-is"] === true) {
      return directives.custom["fallback"];
    }
  }

  // Handle Hooks
  handleHooks(directives, selfContext);

  // Handle HTML (Element)
  if (tagHTML) {
    // Handle Reactive CSS
    handleReactiveCSS(directives, selfRef);

    // Handle Show CSS
    handleShowCSS(directives, selfRef);

    // Handle HTML-Element
    const htmlElement = handleHTMLElement(tagHTML, selfContext);
    return htmlElement;
  } else {
    // Handle Portal
    const elementQuery = directives.custom["portal"];
    if (elementQuery) {
      handlePortal(elementQuery, directives, props);
      return null;
    }

    // Handle For (Loop)
    const forLoopElement = handleForLoop(directives);
    if (forLoopElement) return forLoopElement;

    // Handle Switch (Case)
    const switchCaseElement = handleSwitchCase(directives, props);
    if (switchCaseElement) return switchCaseElement;
  }
  // <Fragment> Style
  return props.children;
}
