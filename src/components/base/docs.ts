/**
 * Component function that accepts various props for handling custom directives, event listeners, and control flow.
 *
 * @param {Props} props - The props object containing the following attributes:
 *
 * // React (Core Attrs)
 * @param {object} [props.attrs] - Custom attributes for the component.
 * @param {any} [props.class] - Class name or class object for styling the component.
 * @param {any} [props.style] - Inline style object for styling the component.
 * @param {any} [props.children] - The children elements of the component.
 *
 * // CSS
 * @param {boolean} [props['css-is']] - Custom CSS attribute for conditional styling.
 * @param {string[] | string} [props['css-on']] - CSS class(es) to apply when 'css-is' is true.
 * @param {string[] | string} [props['css-off']] - CSS class(es) to apply when 'css-is' is false.
 *
 * // Hooks
 * @param {(callback: Function) => void} [props['hook-created']] - Hook for the component creation.
 * @param {(callback: Function) => void} [props['hook-updated']] - Hook for the component update.
 * @param {(callback: Function) => void} [props['hook-removed']] - Hook for the component removal.
 *
 * // Custom Directives
 * @param {(callback: Function) => void} [props['x-click-outside']] - Custom directive to handle click events outside the element.
 * @param {(callback: Function) => void} [props['x-hover']] - Custom directive to handle hover events.
 * @param {(callback: Function) => void} [props['x-resize']] - Custom directive to handle resize events.
 * @param {(callback: Function) => void} [props['x-scroll']] - Custom directive to handle scroll events.
 * @param {(callback: Function) => void} [props['x-swipe']] - Custom directive to handle swipe events.
 *
 * // Control Flow
 * @param {(callback: Function) => void} [props['x-for']] - Custom directive for looping through an array and rendering elements for each item.
 * @param {Array<any> | number} [props['x-in']] - Array of items or a number for 'x-for' loop.
 * @param {boolean} [props['x-if']] - Conditional attribute for rendering content conditionally.
 * @param {boolean} [props['x-show']] - Conditional attribute for displaying content conditionally using CSS class manipulation.
 * @param {any} [props['x-live']] - Attribute for rendering a dynamic component based on the provided callback.
 * @param {any | HTMLElement} [props['x-portal']] - Attribute for portal rendering, allowing elements to be rendered outside the component's DOM.
 * @param {any | HTMLElement} [props['x-fallback']] - Attribute for fallback rendering when something goes wrong with the main component rendering.
 * @param {boolean} [props['x-fallback-is']] - Attribute for conditional fallback rendering.
 * @param {boolean} [props['x-switch']] - Attribute for conditionally rendering content based on a switch case.
 * @param {string} [props['x-case']] - Attribute for case value to match in the 'x-switch' block.
 * @param {string} [props['case']] - Alias for 'x-case'.
 *
 * // Ripple
 * @param {boolean | { center?: boolean, circle?: boolean, color?: string, class?: string }} [props['x-ripple']] - Attribute for adding a ripple effect to elements.
 *
 * // Utils (ON)
 * @param {(callback: Function) => void} [props['on-click']] - Event listener for click event.
 * @param {(callback: Function) => void} [props['on-dbl-click']] - Event listener for double-click event.
 * @param {(callback: Function) => void} [props['on-context-menu']] - Event listener for context menu event.
 * @param {(callback: Function) => void} [props['on-mouse-down']] - Event listener for mouse down event.
 * @param {(callback: Function) => void} [props['on-mouse-up']] - Event listener for mouse up event.
 * @param {(callback: Function) => void} [props['on-mouse-enter']] - Event listener for mouse enter event.
 * @param {(callback: Function) => void} [props['on-mouse-leave']] - Event listener for mouse leave event.
 * @param {(callback: Function) => void} [props['on-mouse-move']] - Event listener for mouse move event.
 * @param {(callback: Function) => void} [props['on-key-down']] - Event listener for key down event.
 * @param {(callback: Function) => void} [props['on-key-up']] - Event listener for key up event.
 * @param {(callback: Function) => void} [props['on-key-press']] - Event listener for key press event.
 * @param {(callback: Function) => void} [props['on-focus']] - Event listener for focus event.
 * @param {(callback: Function) => void} [props['on-blur']] - Event listener for blur event.
 * @param {(callback: Function) => void} [props['on-change']] - Event listener for change event.
 * @param {(callback: Function) => void} [props['on-input']] - Event listener for input event.
 * @param {(callback: Function) => void} [props['on-submit']] - Event listener for submit event.
 * @param {(callback: Function) => void} [props['on-touch-start']] - Event listener for touch start event.
 * @param {(callback: Function) => void} [props['on-touch-move']] - Event listener for touch move event.
 * @param {(callback: Function) => void} [props['on-touch-end']] - Event listener for touch end event.
 * @param {(callback: Function) => void} [props['on-touch-cancel']] - Event listener for touch cancel event.
 * @param {(callback: Function) => void} [props['on-wheel']] - Event listener for wheel event.
 * @param {(callback: Function) => void} [props['on-scroll']] - Event listener for scroll event.
 * @param {(callback: Function) => void} [props['on-copy']] - Event listener for copy event.
 * @param {(callback: Function) => void} [props['on-cut']] - Event listener for cut event.
 * @param {(callback: Function) => void} [props['on-paste']] - Event listener for paste event.
 * @param {(callback: Function) => void} [props['on-composition-start']] - Event listener for composition start event.
 * @param {(callback: Function) => void} [props['on-composition-update']] - Event listener for composition update event.
 * @param {(callback: Function) => void} [props['on-composition-end']] - Event listener for composition end event.
 * @param {(callback: Function) => void} [props['on-load']] - Event listener for load event.
 * @param {(callback: Function) => void} [props['on-error']] - Event listener for error event.
 * @param {(callback: Function) => void} [props['on-animation-start']] - Event listener for animation start event.
 * @param {(callback: Function) => void} [props['on-animation-end']] - Event listener for animation end event.
 * @param {(callback: Function) => void} [props['on-animation-iteration']] - Event listener for animation iteration event.
 * @param {(callback: Function) => void} [props['on-transition-end']] - Event listener for transition end event.
 *
 * @returns {any} - The component's return value.
 */
