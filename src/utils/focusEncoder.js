/**
 * Focus-based URL encoding system with operation type support
 * Format: /operation/focus/seed or /operation/focus/seed/neg
 */

const N_OPS = 50; // Constant number of operations
const MIN_FOCUS = 1;
const MAX_FOCUS = 100;

/**
 * Decode URL parameters to configuration object
 * @param {string} operation - 'sum' or 'sub'
 * @param {string} focusStr - Focus number as string
 * @param {string} seedStr - Seed number as string
 * @param {string} negative - 'neg' if negatives allowed, undefined otherwise
 * @returns {object} Configuration object or null if invalid
 */
export function decodeUrl(operation, focusStr, seedStr, negative) {
  if (!operation || !focusStr || !seedStr) return null;

  // Validate operation
  if (operation !== "sum" && operation !== "sub") {
    return null;
  }

  const focus = parseInt(focusStr, 10);
  const seedNumber = parseInt(seedStr, 10);

  if (isNaN(focus) || isNaN(seedNumber)) {
    return null;
  }

  if (focus < MIN_FOCUS || focus > MAX_FOCUS) {
    return null;
  }

  if (seedNumber < 1 || seedNumber > 9999) {
    return null;
  }

  const allowNegatives = negative === "neg";

  return {
    operation,
    focus,
    seed: `${operation}-${focus}-${seedNumber}${allowNegatives ? "-neg" : ""}`,
    seedNumber,
    allowNegatives,
    nOps: N_OPS,
    maxOperand: focus, // Largest operation is focus + focus or focus - focus
  };
}

/**
 * Encode configuration to URL path
 * @param {string} operation - 'sum' or 'sub'
 * @param {number} focus - Focus number
 * @param {number} seed - Seed number
 * @param {boolean} allowNegatives - Whether to allow negative results
 * @returns {string} URL path
 */
export function encodeUrl(operation, focus, seed, allowNegatives = false) {
  if (focus < MIN_FOCUS || focus > MAX_FOCUS) {
    return null;
  }

  if (seed < 1 || seed > 9999) {
    return null;
  }

  if (operation !== "sum" && operation !== "sub") {
    return null;
  }

  const negPart = operation === "sub" && allowNegatives ? "/neg" : "";
  return `/${operation}/${focus}/${seed}${negPart}`;
}

/**
 * Generate a random URL path
 * @param {string} operation - 'sum' or 'sub', defaults to 'sum'
 * @returns {string} Random URL path
 */
export function generateRandomUrl(operation = "sum") {
  // Bias towards lower focus numbers (1-20) for beginners
  const randomFocus =
    Math.random() < 0.7
      ? Math.floor(Math.random() * 20) + 1 // 1-20 (70% chance)
      : Math.floor(Math.random() * 80) + 21; // 21-100 (30% chance)

  const randomSeed = Math.floor(Math.random() * 9999) + 1;

  return `/${operation}/${randomFocus}/${randomSeed}`;
}

export { N_OPS, MIN_FOCUS, MAX_FOCUS };
