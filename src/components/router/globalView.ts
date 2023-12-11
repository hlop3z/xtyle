const { signal } = preact;

export const CURRENT_VIEW = signal({});

export function setNextGlobalView(routerAPI, props) {
  const { view } = props.next;
  if (typeof view === "function") {
    CURRENT_VIEW.value = view({
      ...props.next,
      last: props.prev,
      ctx: routerAPI.ctx,
      router: routerAPI,
    });
  } else {
    CURRENT_VIEW.value = routerAPI.page404({
      ...props.next,
      last: props.prev,
      ctx: routerAPI.ctx,
      router: routerAPI,
    });
  }
}

export default setNextGlobalView;
