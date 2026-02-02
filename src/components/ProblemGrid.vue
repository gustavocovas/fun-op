<template>
  <div class="problem-grid-container">
    <!-- Problems Section - Single Column on Screen -->
    <div class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 no-print">Practice Problems:</h2>
      <div class="problem-grid-screen">
        <ProblemItem
          v-for="problem in problems"
          :key="problem.id"
          :problem="problem"
          :operation="operation"
          :isChecked="isChecked"
          :showCorrectAnswer="isChecked"
          @answer-changed="handleAnswerChanged"
        />
      </div>
    </div>

    <!-- Actions -->
    <div class="actions mt-8 flex gap-4 no-print">
      <button
        @click="checkAnswers"
        :disabled="!hasAnswers || isChecked"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {{ isChecked ? 'Answers Checked' : 'Check Answers' }}
      </button>
      
      <button
        @click="printPage"
        class="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
      >
        Print Worksheet
      </button>

      <button
        v-if="isChecked"
        @click="resetAnswers"
        class="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
      >
        Try Again
      </button>
    </div>

    <!-- Results Summary -->
    <div v-if="isChecked" class="results mt-6 p-4 bg-gray-50 rounded-lg no-print">
      <h3 class="text-lg font-semibold mb-2">Results:</h3>
      <p class="text-gray-700">
        <span class="text-green-600 font-bold">{{ correctCount }}</span> correct out of 
        <span class="font-bold">{{ answeredCount }}</span> answered
        <span v-if="answeredCount < problems.length" class="text-gray-500">
          ({{ problems.length - answeredCount }} unanswered)
        </span>
      </p>
      <div class="mt-2">
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div
            class="bg-green-500 h-3 rounded-full transition-all duration-500"
            :style="{ width: `${(correctCount / problems.length) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProblemItem from './ProblemItem.vue';
import { checkAnswer as checkSumAnswer } from '../modules/sum.js';
import { checkAnswer as checkSubAnswer } from '../modules/subtraction.js';

const props = defineProps({
  problems: {
    type: Array,
    required: true
  },
  operation: {
    type: String,
    default: 'sum'
  }
});

const emit = defineEmits(['update-problem']);

const isChecked = ref(false);

const hasAnswers = computed(() => {
  return props.problems.some(p => p.userAnswer !== null && p.userAnswer !== '');
});

const answeredCount = computed(() => {
  return props.problems.filter(p => p.userAnswer !== null && p.userAnswer !== '').length;
});

const correctCount = computed(() => {
  return props.problems.filter(p => p.isCorrect === true).length;
});

function handleAnswerChanged({ problemId, answer }) {
  emit('update-problem', { problemId, answer });
}

function checkAnswers() {
  const checkFn = props.operation === 'sum' ? checkSumAnswer : checkSubAnswer;
  
  props.problems.forEach(problem => {
    if (problem.userAnswer !== null && problem.userAnswer !== '') {
      const isCorrect = checkFn(problem, problem.userAnswer);
      emit('update-problem', {
        problemId: problem.id,
        isCorrect
      });
    }
  });
  isChecked.value = true;
}

function resetAnswers() {
  props.problems.forEach(problem => {
    emit('update-problem', {
      problemId: problem.id,
      answer: null,
      isCorrect: null
    });
  });
  isChecked.value = false;
}

function printPage() {
  window.print();
}
</script>
