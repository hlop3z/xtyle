import util from "@tool/index";

export default function (props) {
  const [value, setValue] = preact.useState(0);
  const increment = preact.useCallback(() => setValue(value + 1), [value]);
  const slots = util.slots(props);
  return (
    <util.element {...props}>
      <h1>{props.title}</h1>
      <p>{slots.$("title")}</p>
      {slots.$("demo")}
      <br />
      <br />
      <div>
        Counter: {value}
        <br />
        <button onClick={increment}>Increment</button>
      </div>
      <p>{props.text}</p>
    </util.element>
  );
}
