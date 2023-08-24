export default function Component(options) {
  return (name: string, args: any): any => {
    if (options[name]) {
      options[name](args);
    } else {
      console.error(`Method { ${name} } Not Found`);
    }
  };
}
