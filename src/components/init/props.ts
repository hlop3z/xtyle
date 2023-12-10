type Props = (
  app: Function,
  renderTo: HTMLElement | string,
  routerOptions: {
    history?: boolean;
    baseURL?: string;
    routes?: any;
    page404?: Function | boolean;
    before?: (data: any) => void;
    after?: (data: any) => void;
  }
) => void;

export default Props;

/*
type Props = {
  app: any;
  renderTo: any;
  options: any;
};
*/
