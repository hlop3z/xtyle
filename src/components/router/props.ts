type Props = {
  go: (path: string | null, query?: object) => void;
  computed: (props: any) => any;
  effect: (props: any) => void;
  find: (query: string) => any;
  current: any;
  baseURL: any;
  history: any;
  views: any;
  redirect: (
    path?: string,
    openName?: string | boolean,
    query?: object | any
  ) => void;
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
