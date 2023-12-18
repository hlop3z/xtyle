const { signal } = preact;

export const CURRENT_VIEW = signal({});

export async function setNextGlobalView(routerAPI, props) {
  const { view } = props.next;
  const setView = (nextView, config) =>
    (CURRENT_VIEW.value = () => nextView(config));
  const reqConfig = {
    ...props.next,
    last: props.prev,
    ctx: routerAPI.ctx,
    router: routerAPI,
  };
  if (typeof view === "function") {
    setView(view, reqConfig);
  } else {
    setView(routerAPI.page404, reqConfig);
  }
}

export default setNextGlobalView;
