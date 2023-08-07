type Props = {
  go: (path: string, query?: object) => void;
  computed: (props: any) => any;
  effect: (props: any) => void;
  find: (query: string) => any;
  current: any;
  baseURL: any;
  history: any;
};

export default Props;
/* 
type Props = {
  history?: boolean;
  baseURL?: string;
  routes?: any;
  callback: (next: any) => void;
};

  */
