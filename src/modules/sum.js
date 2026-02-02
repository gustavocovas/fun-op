/**
 * Sum module - Generates addition problems focused on a target number
 */

import { createSeededRandomInt, seededShuffle } from "../utils/seededRandom.js";

/**
 * Generate sum problems based on focus number
 * @param {object} config - Configuration object with focus number
 * @returns {Array} Array of problem objects
 */
export function generateSumProblems(config) {
  const { focus, nOps, seed } = config;

  // Calculate split: 60% focus, 40% review
  const focusCount = Math.floor(nOps * 0.6);
  const reviewCount = nOps - focusCount;

  // Generate focus problems (involving the focus number)
  const focusProblems = generateFocusProblems(focus, focusCount, seed);

  // Generate review problems (numbers below focus for spaced repetition)
  const reviewProblems = generateReviewProblems(
    focus,
    reviewCount,
    seed + "-review",
  );

  // Interleave focus and review problems for variety
  const combined = interleaveProblems(focusProblems, reviewProblems, seed);

  // Add metadata to each problem
  return combined.map((prob, index) => ({
    id: index,
    operand1: prob.a,
    operand2: prob.b,
    answer: prob.a + prob.b,
    isSolved: false,
    userAnswer: null,
    isCorrect: null,
  }));
}

/**
 * Generate problems focusing on the target number
 * Creates problems like: focus+1, focus+2, 1+focus, 2+focus, etc.
 * In sequential chunks of 5-6 max, with some shuffling
 */
function generateFocusProblems(focus, count, seed) {
  const problems = [];
  const maxChunkSize = 6;
  const minChunkSize = 5;

  // Generate all possible combinations with focus number
  const focusCombinations = [];
  for (let i = 1; i <= focus; i++) {
    focusCombinations.push({ a: focus, b: i }); // focus + i
    if (i !== focus) {
      // Avoid duplicates like focus+focus
      focusCombinations.push({ a: i, b: focus }); // i + focus
    }
  }

  // Shuffle the combinations pool
  const shuffledPool = seededShuffle(focusCombinations, seed + "-pool");

  // Generate in small sequential chunks
  let poolIndex = 0;
  while (problems.length < count) {
    // Random chunk size between 5-6
    const chunkSize = minChunkSize + (problems.length % 2); // Alternates 5, 6, 5, 6...
    const chunk = [];

    // Fill chunk with sequential problems from pool
    for (
      let i = 0;
      i < chunkSize && problems.length + chunk.length < count;
      i++
    ) {
      chunk.push(shuffledPool[poolIndex % shuffledPool.length]);
      poolIndex++;
    }

    // 50% chance to shuffle the chunk
    if ((problems.length / chunkSize) % 2 === 0) {
      const shuffledChunk = seededShuffle(
        chunk,
        seed + "-chunk-" + problems.length,
      );
      problems.push(...shuffledChunk);
    } else {
      problems.push(...chunk);
    }
  }

  return problems.slice(0, count);
}

/**
 * Generate review problems from numbers below focus
 * Uses random selection for spaced repetition
 */
function generateReviewProblems(focus, count, seed) {
  if (focus <= 1) {
    // If focus is 1, generate simple 1+1 problems
    return Array(count).fill({ a: 1, b: 1 });
  }

  const problems = [];
  const reviewNumbers = [];

  // Build pool of review numbers (all numbers below focus)
  for (let i = 1; i < focus; i++) {
    reviewNumbers.push(i);
  }

  // Shuffle review numbers for random selection
  const shuffledReview = seededShuffle(reviewNumbers, seed);

  // Create random number generators
  const rngA = createSeededRandomInt(seed + "-a", 0, shuffledReview.length - 1);
  const rngB = createSeededRandomInt(seed + "-b", 0, shuffledReview.length - 1);

  // Generate review problems in small chunks
  const maxChunkSize = 6;
  const minChunkSize = 5;

  while (problems.length < count) {
    const chunkSize = minChunkSize + (problems.length % 2);
    const chunk = [];

    for (
      let i = 0;
      i < chunkSize && problems.length + chunk.length < count;
      i++
    ) {
      const a = shuffledReview[rngA() % shuffledReview.length];
      const b = shuffledReview[rngB() % shuffledReview.length];
      chunk.push({ a, b });
    }

    // Add chunk (with occasional shuffling)
    if ((problems.length / chunkSize) % 3 === 0) {
      const shuffledChunk = seededShuffle(
        chunk,
        seed + "-review-chunk-" + problems.length,
      );
      problems.push(...shuffledChunk);
    } else {
      problems.push(...chunk);
    }
  }

  return problems.slice(0, count);
}

/**
 * Interleave focus and review problems
 * Pattern: ~3-4 focus problems, then ~2-3 review problems, repeat
 */
function interleaveProblems(focusProblems, reviewProblems, seed) {
  const result = [];
  let focusIndex = 0;
  let reviewIndex = 0;

  while (
    focusIndex < focusProblems.length ||
    reviewIndex < reviewProblems.length
  ) {
    // Add 3-4 focus problems
    const focusBurst = 3 + (result.length % 2);
    for (let i = 0; i < focusBurst && focusIndex < focusProblems.length; i++) {
      result.push(focusProblems[focusIndex++]);
    }

    // Add 2-3 review problems
    const reviewBurst = 2 + (result.length % 2);
    for (
      let i = 0;
      i < reviewBurst && reviewIndex < reviewProblems.length;
      i++
    ) {
      result.push(reviewProblems[reviewIndex++]);
    }
  }

  return result;
}

/**
 * Generate solved examples (easy problems at the start)
 */
function generateExamples(focus, count) {
  const examples = [];
  const exampleFocus = Math.min(focus, 5); // Use smaller numbers for examples

  // Generate simple examples
  examples.push({ a: 1, b: 1 });
  examples.push({ a: 1, b: 2 });
  examples.push({ a: 2, b: 1 });
  examples.push({ a: 2, b: 2 });
  examples.push({ a: exampleFocus, b: 1 });

  return examples.slice(0, count);
}

/**
 * Check if user's answer is correct
 * @param {object} problem - Problem object
 * @param {number} userAnswer - User's answer
 * @returns {boolean} True if correct
 */
export function checkAnswer(problem, userAnswer) {
  return userAnswer === problem.answer;
}
