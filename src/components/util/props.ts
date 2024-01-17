type Props = {
  inject: (code: string, id?: string) => void;
  form: (obj: { [key: string]: any }) => any;
  // Preact plugins
  class: (input: any) => string;
  style: (input: any) => string;
  props: (kwargs: any) => any;
  events: object;
  event: (args: {
    el: any;
    event: string;
    handler: (event: Event) => void;
    cleanup: any[];
    config: any;
  }) => any;
};

export default Props;
