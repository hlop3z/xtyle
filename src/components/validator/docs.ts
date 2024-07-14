/**
 * Validates a value using an array of validation functions.
 *
 * This function takes a value and an array of validation functions,
 * applies each validation function to the value, and returns the results.
 *
 * @example
 * const value = null;
 * const validators = [
 *   (v) => !!v || "Required Field"
 * ];
 * const validationResult = xtyle.validator(value, validators);
 * // validationResult will contain an array of validation results
 *
 * @returns {Array} - An array of found errors.
 */
