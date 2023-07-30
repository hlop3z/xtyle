type Props = {
  // React (Core Attrs)
  attrs?: object;
  class?: any;
  style?: any;
  children?: any;
  // CSS
  "css-is"?: boolean;
  "css-on"?: string[] | string;
  "css-off"?: string[] | string;
  // Hooks
  "hook-created"?: (callback: Function | any) => void;
  "hook-updated"?: (callback: Function | any) => void;
  "hook-removed"?: (callback: Function | any) => void;
  // Custom Directives
  "x-ref"?: (callback: Function | any) => void;
  "x-value"?: any;
  "x-hover"?: (callback: Function | any) => void;
  "x-scroll"?: (callback: Function | any) => void;
  "x-swipe"?: (callback: Function | any) => void;
  "x-resize"?: (callback: Function | any) => void;
  "x-click-outside"?: (callback: Function | any) => void;
  // Control Flow
  "x-for"?: (callback: Function | any) => void;
  "x-in"?: Array<any> | number;
  "x-if"?: boolean;
  "x-show"?: boolean;
  "x-live"?: any;
  "x-fragment"?: boolean;
  "x-portal"?: any | HTMLElement;
  "x-fallback"?: any | HTMLElement;
  "x-fallback:is"?: boolean;
  "x-switch"?: boolean;
  "x-case"?: string;
  case?: string;
  // Ripple
  "x-ripple"?:
    | boolean
    | {
        center?: boolean;
        circle?: boolean;
        color?: string;
        class?: string;
      };
  // Utils (ON)
  "on-click"?: (callback: Function | any) => void;
  "on-dbl-click"?: (callback: Function | any) => void;
  "on-context-menu"?: (callback: Function | any) => void;
  "on-mouse-down"?: (callback: Function | any) => void;
  "on-mouse-up"?: (callback: Function | any) => void;
  "on-mouse-enter"?: (callback: Function | any) => void;
  "on-mouse-leave"?: (callback: Function | any) => void;
  "on-mouse-move"?: (callback: Function | any) => void;
  "on-key-down"?: (callback: Function | any) => void;
  "on-key-up"?: (callback: Function | any) => void;
  "on-key-press"?: (callback: Function | any) => void;
  "on-focus"?: (callback: Function | any) => void;
  "on-blur"?: (callback: Function | any) => void;
  "on-change"?: (callback: Function | any) => void;
  "on-input"?: (callback: Function | any) => void;
  "on-submit"?: (callback: Function | any) => void;
  "on-touch-start"?: (callback: Function | any) => void;
  "on-touch-move"?: (callback: Function | any) => void;
  "on-touch-end"?: (callback: Function | any) => void;
  "on-touch-cancel"?: (callback: Function | any) => void;
  "on-wheel"?: (callback: Function | any) => void;
  "on-scroll"?: (callback: Function | any) => void;
  "on-copy"?: (callback: Function | any) => void;
  "on-cut"?: (callback: Function | any) => void;
  "on-paste"?: (callback: Function | any) => void;
  "on-composition-start"?: (callback: Function | any) => void;
  "on-composition-update"?: (callback: Function | any) => void;
  "on-composition-end"?: (callback: Function | any) => void;
  "on-load"?: (callback: Function | any) => void;
  "on-error"?: (callback: Function | any) => void;
  "on-animation-start"?: (callback: Function | any) => void;
  "on-animation-end"?: (callback: Function | any) => void;
  "on-animation-iteration"?: (callback: Function | any) => void;
  "on-transition-end"?: (callback: Function | any) => void;
};

export default Props;
/* 
  ---------------
  @ Cheat-Sheet
  ---------------
  void
  null
  bigint
  
  any
  boolean
  number
  string
  
  // Array<string>
  string[]          
  
  // tuple
  [string, number]
  
  // union
  string | null | undefined 
  */
