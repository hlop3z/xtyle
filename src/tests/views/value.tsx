export default function Component() {
  const text = preact.useSignal("");
  return (
    <div>
      Hello World
      <br />
      <br />
      <input
        x-html
        x-input={(data) => console.log(data)}
        x-value={text}
        x-value-validators={[
          (v) => v.length >= 8 || "At least 8 characters long",
          (v) => /[A-Z]/.test(v) || "At least one uppercase letter",
          (v) => /[a-z]/.test(v) || "At least one lowercase letter",
          (v) => /\d/.test(v) || "At least one digit",
          (v) => /[!@#$%^&*]/.test(v) || "At least one special character",
        ]}
      />
    </div>
  );
}
