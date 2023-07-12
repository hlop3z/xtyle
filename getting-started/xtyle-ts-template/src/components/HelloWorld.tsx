/**
 * My Custom Component.
 * @param {any} props - The props of the component.
 */
export default function Component(props: any) {
  console.log(props);
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>Sample Content</h2>
    </div>
  );
}
