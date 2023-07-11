const style = `.lm.lc-t,.lm.lc-t.lc-b{margin-top:var(--app-header)}.lb,.ll,.lr,.lt{position:fixed}.lt{height:var(--app-header);top:0;z-index:var(--app-header-layer)}.lb{bottom:0;height:var(--app-footer);z-index:var(--app-footer-layer)}.lb,.lm,.lt{left:0;right:0}.lm{height:100vh;transition-duration:.2s;transition-property:margin-left,margin-right;transition-timing-function:linear}.ll,.lm,.lr{bottom:0;top:0}.ll{left:0;width:var(--app-left);z-index:var(--app-left-layer)}.lr{right:0;width:var(--app-right);z-index:var(--app-right-layer)}.ll.mini{left:0;width:var(--app-left-mini)}.lr.mini{right:0;width:var(--app-right-mini)}.ld{-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-property:-webkit-transform;transition-property:transform;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1);will-change:transform}.ld.ll{-webkit-transform:translateX(-100vw);-ms-transform:translateX(-100vw);transform:translateX(-100vw)}.ld.lr{-webkit-transform:translateX(100vw);-ms-transform:translateX(100vw);transform:translateX(100vw)}.ld.open{-webkit-transform:translateX(0)!important;-ms-transform:translateX(0)!important;transform:translateX(0)!important}.lc-l{margin-left:var(--app-left)}.lc-r{margin-right:var(--app-right)}.lc-t{top:var(--app-header)}.lc-b{bottom:var(--app-footer)}.lm.lc-t{height:calc(100vh - var(--app-header))}.lm.lc-b{height:calc(100vh - var(--app-footer))}.lm.lc-t.lc-b{height:calc(100vh - var(--app-header) - var(--app-footer))}`;
const conf = (
  header,
  footer,
  right,
  left,
  leftMini,
  rightMini,
  headerLayer,
  footerLayer,
  leftLayer,
  rightLayer
) =>
  `:root{--app-header:${header};--app-footer:${footer};--app-left:${left};--app-right:${right};--app-left-mini:${leftMini};--app-right-mini:${rightMini};--app-header-layer:${headerLayer};--app-footer-layer:${footerLayer};--app-left-layer:${leftLayer};--app-right-layer:${rightLayer}}`;

const createLayout = ({
  header = "50px",
  footer = "50px",
  right = "185px",
  left = "185px",
  leftMini = "60px",
  rightMini = "60px",
  headerLayer = 2,
  footerLayer = 2,
  leftLayer = 1,
  rightLayer = 1,
} = {}) =>
  conf(
    header,
    footer,
    right,
    left,
    leftMini,
    rightMini,
    headerLayer,
    footerLayer,
    leftLayer,
    rightLayer
  );

// Inject Stylesheet
export default function LayoutCss(util) {
  util.inject(style, "app-layout-core");
  return (config = {}) =>
    util.inject(createLayout(config), "app-layout-config");
}
