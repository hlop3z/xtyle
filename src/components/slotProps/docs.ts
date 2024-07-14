/**
 * Utility function to create pre-defined child elements for specified slots within a component.
 *
 * @param {object} props - The parent properties to be passed to the slot elements.
 * @param {string[]} slots - An array of slot names to be created.
 * @returns {object} - An object containing the properties for the specified slots.
 *
 * @example
 * const defineSlots = (props: any) =>
 *   xtyle.slotProps(props, ["header", "main", "footer"]);
 *
 * export default function Component(props) {
 *   const slots = defineSlots(props);
 *
 *   return (
 *     <div>
 *       {slots.Header(TheSlot)}
 *       {slots.Main(TheSlot)}
 *       {slots.Footer(TheSlot)}
 *     </div>
 *   );
 * }
 *
 * const TheSlot = xtyle.slot({}, (props) => {
 *   return (
 *     <div x-html class={[props.class]}>
 *       {props.children}
 *     </div>
 *   );
 * });
 */
