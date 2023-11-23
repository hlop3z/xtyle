import { findDirectives } from "../base/element/utils";

export default function Slots(props) {
  return findDirectives(props)("slot-");
}
