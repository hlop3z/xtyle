type Props = {
  elements?: Record<string, any>;
  directives?: Record<string, any>;
  globals?: Record<string, any>;
  store?: Record<string, any>;
  init?: { before?: Function[]; after?: Function[] };
  router?: { before?: (data: any) => void; after?: (data: any) => void };
  models?: Record<string, any>;
  actions?: Record<string, any>;
};

export default Props;
