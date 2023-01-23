import Element from "./element.js";

function parseHTML(htmlID) {
  const html = document.querySelector(`#${htmlID}`).innerHTML;
  function HyperScript(tag, attrs, children) {
    // console.log([tag, attrs, children]);
    return [tag, attrs, children];
  }
  function minifyHTML(code) {
    return code
      .replace(/\s+/g, " ") // Replaces multiple spaces with single space
      .replace(/<!--[\s\S]*?-->/g, "") // Removes HTML comments
      .replace(/\s*(<\/?[a-z][^>]*>)\s*/g, "$1"); // Removes whitespace before and after tags
  }

  // Parser
  let parser = new DOMParser();
  let doc = parser.parseFromString(minifyHTML(html), "text/html");

  // Traverse the DOM and convert each element to a HyperScript component
  function convertNodeToHyperScript(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      let children = Array.from(node.childNodes).map(convertNodeToHyperScript);
      let attrs = Object.assign(
        {},
        Array.from(node.attributes).reduce((attrs, attr) => {
          attrs[attr.name] = attr.value;
          return attrs;
        }, {})
      );
      const tag = node.tagName.toLowerCase();
      return HyperScript(tag, attrs, children);
    } else if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
  }

  return Array.from(doc.body.childNodes).map(convertNodeToHyperScript);
}

function buildNodes(html) {
  const code = parseHTML(html);
  console.log(Element(...code));
  return code;
}
export default buildNodes;
