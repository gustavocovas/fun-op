/**
 * Subtraction module - Generates subtraction problems focused on a target number
 * Includes 10% sum problems for review/reinforcement
 */

import { createSeededRandomInt, seededShuffle } from "../utils/seededRandom.js";

/**
 * Generate subtraction problems based on focus number
 * Includes 10% sum problems for review/reinforcement
 * @param {object} config - Configuration object with focus number and allowNegatives
 * @returns {Array} Array of problem objects
 */
export function generateSubtractionProblems(config) {
  const { focus, nOps, seed, allowNegatives } = config;

  // Calculate split: 10% sum (review), 90% subtraction
  const sumCount = Math.floor(nOps * 0.1); // 10% sum problems
  const subtractionCount = nOps - sumCount; // 90% subtraction problems

  // Of the subtraction problems: 60% focus, 40% review
  const focusCount = Math.floor(subtractionCount * 0.6);
  const reviewCount = subtractionCount - focusCount;

  // Generate sum problems for review (simpler problems)
  const sumProblems = generateSumReviewProblems(focus, sumCount, seed + "-sum-review");

  // Generate focus subtraction problems (involving the focus number)
  const focusProblems = generateFocusProblems(
    focus,
    focusCount,
    seed,
    allowNegatives,
  );

  // Generate review subtraction problems (numbers below focus)
  const reviewProblems = generateReviewProblems(
    focus,
    reviewCount,
    seed + "-review",
    allowNegatives,
  );

  // Interleave all three types for variety
  const combined = interleaveAllProblems(focusProblems, reviewProblems, sumProblems, seed);

  // Add metadata to each problem
  return combined.map((prob, index) => ({
    id: index,
    operand1: prob.a,
    operand2: prob.b,
    answer: prob.operation === "sum" ? prob.a + prob.b : prob.a - prob.b,
    operation: prob.operation || "sub",
    isSolved: false,
    userAnswer: null,
    isCorrect: null,
  }));
}

/**
 * Generate sum problems for review (10% of total)
 * These are simpler addition problems to reinforce previous learning
 */
function generateSumReviewProblems(focus, count, seed) {
  const problems = [];
  const maxNumber = Math.min(focus, 10); // Keep sum problems simpler

  const rngA = createSeededRandomInt(seed + "-a", 1, maxNumber);
  const rngB = createSeededRandomInt(seed + "-b", 1, maxNumber);

  for (let i = 0; i < count; i++) {
    problems.push({
      a: rngA(),
      b: rngB(),
      operation: "sum", // Mark as sum problem
    });
  }

  return problems;
}

/**
 * Generate problems focusing on the target number
 * Creates bidirectional problems: focus-1, 1-focus, focus-2, 2-focus, etc.
 * Filters based on allowNegatives flag
 */
function generateFocusProblems(focus, count, seed, allowNegatives) {
  const problems = [];
  const maxChunkSize = 6;
  const minChunkSize = 5;

  // Generate all possible combinations with focus number (bidirectional)
  const focusCombinations = [];
  for (let i = 1; i <= focus; i++) {
    focusCombinations.push({ a: focus, b: i }); // focus - i (always positive)
    focusCombinations.push({ a: i, b: focus }); // i - focus (can be negative)
  }

  // Filter based on allowNegatives flag
  let filteredCombinations = focusCombinations;
  if (!allowNegatives) {
    filteredCombinations = focusCombinations.filter((p) => p.a >= p.b);
  }

  // If we don't have enough after filtering, need to generate more
  if (filteredCombinations.length < count) {
    // Add more focus - i combinations with larger numbers
    for (
      let i = focus + 1;
      i <= focus * 2 && filteredCombinations.length < count * 2;
      i++
    ) {
      filteredCombinations.push({ a: i, b: focus });
    }
  }

  // Shuffle the combinations pool
  const shuffledPool = seededShuffle(filteredCombinations, seed + "-pool");

  // Generate in small sequential chunks
  let poolIndex = 0;
  while (problems.length < count) {
    // Random chunk size between 5-6
    const chunkSize = minChunkSize + (problems.length % 2);
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
 * Uses bidirectional subtraction
 */
function generateReviewProblems(focus, count, seed, allowNegatives) {
  if (focus <= 1) {
    // If focus is 1, generate simple 1-1 problems
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

    for (let i = 0; i < chunkSize && problems.length + chunk.length < count; i++) {
      const a = shuffledReview[rngA() % shuffledReview.length];
      const b = shuffledReview[rngB() % shuffledReview.length];

      // Filter based on allowNegatives
      if (allowNegatives || a >= b) {
        chunk.push({ a, b });
      } else {
        // Swap to make positive
        chunk.push({ a: b, b: a });
      }
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
 * Interleave focus, review, and sum problems
 * Pattern: ~3-4 subtraction focus, ~2-3 subtraction review, ~1 sum, repeat
 */
function interleaveAllProblems(focusProblems, reviewProblems, sumProblems, seed) {
  const result = [];
  let focusIndex = 0;
  let reviewIndex = 0;
  let sumIndex = 0;

  while (
    focusIndex < focusProblems.length ||
    reviewIndex < reviewProblems.length ||
    sumIndex < sumProblems.length
  ) {
    // Add 3-4 focus subtraction problems
    const focusBurst = 3 + (result.length % 2);
    for (let i = 0; i < focusBurst && focusIndex < focusProblems.length; i++) {
      result.push({ ...focusProblems[focusIndex++], operation: "sub" });
    }

    // Add 2-3 review subtraction problems
    const reviewBurst = 2 + (result.length % 2);
    for (let i = 0; i < reviewBurst && reviewIndex < reviewProblems.length; i++) {
      result.push({ ...reviewProblems[reviewIndex++], operation: "sub" });
    }

    // Add 1 sum problem for review
    if (sumIndex < sumProblems.length) {
      result.push(sumProblems[sumIndex++]);
    }
  }

  return result;
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
