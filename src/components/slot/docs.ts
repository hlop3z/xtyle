/**
 * Utility function for creating pre-built slots.
 *
 * @param {object} expectedProps - The expected properties for the slot.
 * @param {function} component - The component function to render the slot.
 * @returns {object} - A pre-built slot component.
 *
 * @example
 * const MyProps = {
 *   fieldYesReq: { type: [String, Number], default: "one" },
 *   $fieldNotReq: { type: [Boolean], default: false }, // add "$" to make it NOT required
 * };
 *
 * const MyComponent = (props) => {
 *   return (
 *     <div x-html class={[props.class]}>
 *       {props.children}
 *     </div>
 *   );
 * };
 *
 * const TheSlot = xtyle.slot(MyProps, MyComponent);
 *
 * export default TheSlot;
 */
