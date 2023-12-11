import { findDirectives } from "../base/element/utils";
import { camelToTitleCase } from "../stringTo";
// import { camelProps } from "../util";

function slotProps(expectedSlots, parentProps) {
  const slots = findDirectives(parentProps)("slot-");
  const outschema = {};
  expectedSlots.forEach((key) => {
    const found = slots[key];
    if (!found) {
      slots[key] = () => "";
    }
    outschema[camelToTitleCase(key)] = (slot) => {
      let slotMethod: any = (props) => slot.render(parentProps, props);
      return slots[key]({
        Slot: slotMethod,
        info: slot,
      });
    };
  });
  return outschema;
}

export default slotProps;
