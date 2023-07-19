declare const theme: any;
declare const preact: any;
declare const h: any;
declare const Fragment: any;
declare const xtyle: {
  element: (props: {
    attrs?: object;
    class?: string | string[] | object;
    style?: string | string[] | object;
    "x-init"?: (method: function) => object;
    "x-click"?: (method: function) => void;
    "x-click-outside"?: (method: function) => void;
    "x-hover"?: (method: function) => void;
    "x-resize"?: (method: function) => void;
    "x-scroll"?: (method: function) => void;
    "x-swipe"?: (method: function) => void;
    "x-ripple"?:
      | boolean
      | {
          center?: boolean;
          circle?: boolean;
          color?: string;
          class?: string;
        };
  }) => void;
  inject: (code: string, id?: string) => void;
  props: (props: object) => object;
  class: (css: string | string[] | object) => string;
  style: (css: string | string[] | object) => string;
  camel: (text: string) => string;
  slugify: (text: string) => string;
  self: any;
  slots: (props: object) => object;
  event: (
    component: any,
    event: string,
    handler: function,
    watch?: any[]
  ) => void;
  router: any;
  useSignal: (value: any) => object;
  signal: (value: any) => object;
  directives: (value: any) => object;
  layout: (value: any) => object;
  tabs: (value: any) => object;
  createApp: (config: {
    router: {
      history: boolean;
      routes: {
        name?: string;
        path: string;
        view: () => any;
      }[];
      before?: (any) => void;
      after?: (any) => void;
    };
    layout?: {
      header: string;
      footer: string;
      right: string;
      left: string;
      leftMini: string;
      rightMini: string;
      headerLayer: number;
      footerLayer: number;
      leftLayer: number;
      rightLayer: number;
    };
    directives?: object;
  }) => object;
  window: any;
};
