/**
 * Hello World (Custom Component).
 * @param {any} props - The props of the component.
 */
export default function Component(props: any) {
  return (
    <xtyle.element x-demo={"Test (Demo) Directive"}>
      <h2>{props.title}</h2>
    </xtyle.element>
  );
}
