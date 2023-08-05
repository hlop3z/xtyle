export default function Component(options) {
  return (key: string): any => {
    return key.split(".").reduce((o, i) => {
      if (o) return o[i];
    }, options);
  };
}
