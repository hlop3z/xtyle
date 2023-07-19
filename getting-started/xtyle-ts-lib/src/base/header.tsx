/**
 * Header.
 */
export default function Component(props: any) {
  /* Menu */
  const menu: any = {
    home: () => xtyle.router.go({ path: "/" }),
    about: () => xtyle.router.go({ name: "custom", args: { view: "about" } }),
  };
  return (
    <Fragment>
      <button onClick={menu.home}>Home</button>
      <button onClick={menu.about}>About</button>
      <nav>
        <ul class="menu">
          {["left", "left-mini", "right", "right-mini"].map((item) => (
            <li onClick={() => props.toggle(item)}>Toggle ({item})</li>
          ))}
        </ul>
      </nav>
    </Fragment>
  );
}
