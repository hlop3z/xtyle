/**
 * Generates all unique combinations of items in an array.
 * @param {T[]} items - The array of items to generate combinations from.
 * @returns {T[][]} An array of arrays representing all unique combinations of items.
 * The outer array contains each combination, and the inner arrays represent individual combinations.
 */
export default function getCombinations<T>(items: T[]): T[][] {
  const results: T[][] = [];

  /**
   * Recursively generates combinations of items.
   * @param {T[]} combination - The current combination being generated.
   * @param {T[]} remainingItems - The remaining items to generate combinations from.
   */
  function generateCombination(combination: T[], remainingItems: T[]): void {
    if (remainingItems.length === 0) {
      results.push(combination);
      return;
    }

    // Generate combinations with current item
    generateCombination(
      [...combination, remainingItems[0]],
      remainingItems.slice(1)
    );

    // Generate combinations without current item
    while (remainingItems[1] === remainingItems[0]) {
      remainingItems = remainingItems.slice(1);
    }
    generateCombination(combination, remainingItems.slice(1));
  }

  generateCombination([], items.slice().sort());

  // Sort the combinations based on length (shortest to longest)
  return results.sort((a, b) => a.length - b.length);
}
