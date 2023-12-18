// @ts-nocheck
export default {
  value: (self: any, props: any) => {
    const xTag = self.directives.custom["tag"];
    const state = self.directives.custom["value"];
    const filter = self.directives.custom["value-clean"];
    const validators = self.directives.custom["value-validators"];
    const xInput = self.directives.custom["input"];
    const disabled = self.directives.custom["value-disabled"];

    const { onInput } = props;
    if (["input", "textarea", "select", "progress"].includes(xTag)) {
      props.onInput = (event: any) => {
        let newValue = "";
        // Set New-Value
        if (disabled) {
          event.target.value = state.value;
        } else {
          // Clean Value
          if (filter && typeof filter === "function") {
            newValue = filter(event.target.value);
            event.target.value = newValue;
          } else {
            newValue = event.target.value;
          }
          state.value = newValue;
        }
        // Validators
        let isValid: any[] = [];
        if (validators && typeof Array.isArray(validators)) {
          isValid = validator(newValue, validators);
        }
        if (xInput && typeof xInput === "function") {
          xInput({
            value: newValue,
            valid: isValid.length === 0,
            errors: isValid,
            event: event,
          });
        }
        // On Input (Methods)
        if (onInput) {
          onInput(event);
        }
      };
      useEffect(() => {
        self.ref.current.value = state.value;
      }, [self.ref, state.value]);
    }
  },
};
