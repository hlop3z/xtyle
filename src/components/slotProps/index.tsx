import { findDirectives } from "../base/element/utils";
import { kebabToTitleCase } from "../stringTo";
// import { camelProps } from "../util";

function slotProps(expectedSlots, parentProps) {
  const slots = findDirectives(parentProps)("slot-");
  const outschema = {};
  expectedSlots.forEach((key) => {
    const found = slots[key];
    if (!found) {
      slots[key] = () => "";
    }
    outschema[kebabToTitleCase(key)] = (slot, data) => {
      let slotMethod: any = (props) => slot.render(parentProps, props);
      return slots[key]({
        Slot: slotMethod,
        info: slot,
        data: data,
        self: parentProps,
      });
    };
  });
  return outschema;
}

export default slotProps;
