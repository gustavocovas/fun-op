/**
 * Simple seeded random number generator (Mulberry32 algorithm)
 * @param {string} seed - String seed to initialize the generator
 * @returns {function} Random number generator function
 */
export function createSeededRandom(seed) {
  // Convert string seed to number
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }

  // Mulberry32 generator
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

/**
 * Create a seeded random float generator (0-1)
 * @param {string} seed - String seed
 * @returns {function} Returns floats between 0 and 1
 */
export function createSeededRandomFloat(seed) {
  const rng = createSeededRandom(seed);
  return function () {
    return rng() / 4294967296; // 2^32
  };
}

/**
 * Create a seeded random integer generator
 * @param {string} seed - String seed
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {function} Returns integers between min and max
 */
export function createSeededRandomInt(seed, min, max) {
  const rng = createSeededRandomFloat(seed);
  return function () {
    return Math.floor(rng() * (max - min + 1)) + min;
  };
}

/**
 * Shuffle an array using seeded randomness
 * @param {Array} array - Array to shuffle
 * @param {string} seed - String seed
 * @returns {Array} Shuffled copy of array
 */
export function seededShuffle(array, seed) {
  const result = [...array];
  const rng = createSeededRandomFloat(seed);

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
