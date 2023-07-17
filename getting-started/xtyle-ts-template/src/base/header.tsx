/**
 * Header.
 */
export default function Component(props: any) {
  return (
    <Fragment>
      Header
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
