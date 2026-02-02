<template>
  <div id="operation-view" class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm no-print">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-900">Op Fun - Math Practice</h1>
        <p class="text-gray-600 mt-1">Practice {{ operationName }} with smart problem sequences</p>
      </div>
    </header>

    <!-- Tab Navigation -->
    <div class="container mx-auto px-4 py-4">
      <TabNavigation
        v-if="config"
        :operation="config.operation"
        :focus="config.focus"
        :seed="config.seedNumber"
        :allowNegatives="config.allowNegatives"
      />
    </div>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <ConfigPanel
        v-if="config"
        :config="config"
        :currentUrl="currentUrl"
        @url-changed="handleUrlChange"
      />

      <ProblemGrid
        v-if="problems.length > 0"
        :problems="problems"
        :operation="config.operation"
        @update-problem="updateProblem"
      />

      <div v-else class="text-center py-12">
        <p class="text-gray-500 text-lg">Loading problems...</p>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t mt-12 py-6 no-print">
      <div class="container mx-auto px-4 text-center text-sm text-gray-600">
        <p>Op Fun - Focused math practice with progressive learning</p>
        <p class="mt-1">Share your practice set: <code class="bg-gray-100 px-2 py-1 rounded">{{ currentUrl }}</code></p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TabNavigation from '../components/TabNavigation.vue';
import ConfigPanel from '../components/ConfigPanel.vue';
import ProblemGrid from '../components/ProblemGrid.vue';
import { decodeUrl } from '../utils/focusEncoder.js';
import { generateSumProblems } from '../modules/sum.js';
import { generateSubtractionProblems } from '../modules/subtraction.js';

const route = useRoute();
const router = useRouter();

const config = ref(null);
const problems = ref([]);

// Computed current URL
const currentUrl = computed(() => {
  if (!config.value) return '';
  const { operation, focus, seedNumber, allowNegatives } = config.value;
  const negPart = (operation === 'sub' && allowNegatives) ? '/neg' : '';
  return `/${operation}/${focus}/${seedNumber}${negPart}`;
});

// Computed operation name
const operationName = computed(() => {
  if (!config.value) return '';
  return config.value.operation === 'sum' ? 'addition' : 'subtraction';
});

// Load problems from route
function loadFromRoute() {
  const decoded = decodeUrl(
    route.params.operation,
    route.params.focus,
    route.params.seed,
    route.params.negative
  );
  
  if (!decoded) {
    console.error('Invalid route parameters');
    // Redirect to default
    router.push('/sum/10/1');
    return;
  }
  
  config.value = decoded;
  
  // Generate problems based on operation type
  if (decoded.operation === 'sum') {
    problems.value = generateSumProblems(decoded);
  } else if (decoded.operation === 'sub') {
    problems.value = generateSubtractionProblems(decoded);
  }
}

// Handle URL change from config panel
function handleUrlChange(newPath) {
  router.push(newPath);
}

// Update problem data
function updateProblem({ problemId, answer, isCorrect }) {
  const problem = problems.value.find(p => p.id === problemId);
  if (problem) {
    if (answer !== undefined) {
      problem.userAnswer = answer;
    }
    if (isCorrect !== undefined) {
      problem.isCorrect = isCorrect;
    }
  }
}

// Watch route changes
watch(() => route.params, () => {
  loadFromRoute();
}, { immediate: true, deep: true });
</script>

<style>
.container {
  max-width: 1400px;
}

@media print {
  .container {
    max-width: 100%;
  }
}
</style>
