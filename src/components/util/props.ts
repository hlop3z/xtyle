type Props = {
  inject: (code: string, id?: string) => void;
  form: (obj: { [key: string]: any }) => object;
  // Preact plugins
  class: (input: any) => string;
  style: (input: any) => string;
  props: (kwargs: any) => object;
  slots: (
    props: { children?: any },
    key: string
  ) => {
    [key: string]: any;
    $: (slot: string) => any;
    $all: any[];
    $keys: string[];
  };
  events: object;
  event: (args: {
    el: any;
    event: string;
    handler: (event: Event) => void;
    cleanup: any[];
    config: any;
  }) => any;
  timer: (args: {
    years?: number;
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }) => number;
};

export default Props;
