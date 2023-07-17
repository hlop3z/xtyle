export default function Component() {
  /* Menu */
  const menu: any = {
    home: () => xtyle.router.go({ path: "/" }),
    about: () => xtyle.router.go({ name: "custom", args: { view: "about" } }),
  };

  /* View */
  return (
    <Fragment>
      <div class="router-menu">
        <button onClick={menu.home}>Home</button>
        <button onClick={menu.about}>About</button>
      </div>
      {/* <!-- Router --> */}
      <xtyle.router.view />
    </Fragment>
  );
}
