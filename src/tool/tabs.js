export default function (util) {
  function Tabs(props) {
    // Init
    preact.useEffect(() => {
      if (props.name) {
        util.tabs.store.update(
          (draft) =>
            (draft[props.name] = props.active
              ? Array.isArray(props.active)
                ? props.active
                : [props.active]
              : [])
        );
      }
    }, []);
    // Tabs
    const activeTabs = util.tabs.store.computed(() =>
      (util.tabs.store.value[props.name] || []).map((item) => util.camel(item))
    );
    // Init Slots
    const childSlot = util.slots(props);
    // Real Slots
    const items = [];
    childSlot.$keys.forEach((key) => {
      if (activeTabs.value.includes(key)) items.push(childSlot.$(key));
    });
    // View
    return h(Fragment, {}, items);
  }
  return Tabs;
}
