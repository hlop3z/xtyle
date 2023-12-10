/**
 * Theme Admin
 *
 * @example
 * // Theme Color (INIT)
 * const Theme = {
 *     theme: {
 *       success: "#4CAF50",
 *       danger: "#F44336",
 *       warning: "#ff9800",
 *       info: "#2196F3",
 *     },
 *     light: {
 *       danger: "#FFEBEE",
 *     },
 *     dark: {
 *       danger: "#B71C1C",
 *     },
 *     disable: [
 *       // string: ("text", "color", "border", "table")
 *     ],
 *   };
 *
 *   xtyle.theme(Theme);
 *
 * @example
 * <!-- theme-(text, color, border) -->
 * <div x-html theme-text="danger-dark">
 *      Text-Color
 * </div>
 * <br />
 * <div x-html theme-color="danger-light">
 *      Background-Color
 * </div>
 * <br />
 * <div x-html theme-border="danger" style="border: 6px solid;">
 *      Border-Color
 * </div>
 *
 * @example
 * <!-- theme-table -->
 * <table x-html theme-table="danger-dark">
 *      <thead>Headers</thead>
 *      <tbody>Rows</tbody>
 * </table>
 */
