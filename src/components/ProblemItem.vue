<template>
  <div class="problem-item flex items-center py-3">
    <span class="problem-operation text-xl font-medium">{{ problem.operand1 }} {{ operationSymbol }} {{ problem.operand2 }}</span>
    <span class="text-xl font-medium mx-3">=</span>
    <input
      type="number"
      v-model.number="localAnswer"
      @input="handleInput"
      :class="getInputClass()"
      :disabled="isChecked"
      min="0"
      step="1"
    />
    <span v-if="showCorrectAnswer && !problem.isCorrect && localAnswer !== null" class="text-base text-gray-600 ml-3">
      ({{ problem.answer }})
    </span>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  problem: {
    type: Object,
    required: true
  },
  isChecked: {
    type: Boolean,
    default: false
  },
  showCorrectAnswer: {
    type: Boolean,
    default: false
  },
  operation: {
    type: String,
    default: 'sum'
  }
});

// Use problem-specific operation if available, otherwise use the prop
const operationSymbol = (props.problem.operation === 'sum' || (props.problem.operation !== 'sub' && props.operation === 'sum')) ? '+' : '-';

const emit = defineEmits(['answer-changed']);

const localAnswer = ref(props.problem.userAnswer);

watch(() => props.problem.userAnswer, (newVal) => {
  localAnswer.value = newVal;
});

function handleInput() {
  emit('answer-changed', {
    problemId: props.problem.id,
    answer: localAnswer.value
  });
}

function getInputClass() {
  if (!props.isChecked || localAnswer.value === null) {
    return '';
  }
  return props.problem.isCorrect ? 'correct' : 'incorrect';
}
</script>
