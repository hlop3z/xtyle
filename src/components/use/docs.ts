/**
 * **Register `Xtyle` Plugin**
 *
 * @param {Record<string, any>} [elements] - Global components
 * @param {Record<string, any>} [directives] - Global component's directives.
 * @param {Record<string, any>} [globals] - Global variables.
 * @param {Record<string, any>} [store] - Global signal(s) variables(reactive).
 * @param {Object} [init] - Array of methods to run on initialization.
 * @param {any[]} [init.before] - Before Array.
 * @param {any[]} [init.after] - After Array.
 * @param {Object} [router] - Router Plugins.
 * @param {any[]} [router.before] - Run before the route changes.
 * @param {any[]} [router.after] - Run after the route changes.
 *
 * @example
 * // Usage Example
 * xtyle.use({
 *   elements: {},
 *   directives: {},
 *   globals: {},
 *   store: {},
 *   init: {
 *     before: [],
 *     after: [],
 *   },
 *   router: {
 *     before() {},
 *     after() {},
 *   },
 * });
 */
