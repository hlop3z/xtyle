type Props = {
  elements?: Record<string, any>;
  directives?: Record<string, any>;
  globals?: Record<string, any>;
  store?: Record<string, any>;
  init?: { before?: any[]; after?: any[] };
  router?: { before?: (data: any) => void; after?: (data: any) => void };
};

export default Props;
