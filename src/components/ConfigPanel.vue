<template>
  <div class="config-panel bg-white shadow-lg rounded-lg p-6 mb-8 no-print">
    <div class="mb-4">
      <h2 class="text-2xl font-bold text-gray-800">Math Practice Configuration</h2>
    </div>

    <div class="space-y-4">

      <!-- Configuration Form -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Focus Number -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Focus Number (1-100)
          </label>
          <input
            v-model.number="selectedFocus"
            type="number"
            min="1"
            max="100"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p class="text-xs text-gray-600 mt-1">
            Practice will focus on operations with {{ selectedFocus }}
          </p>
        </div>

        <!-- Seed Number -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Seed Number (1-9999)
          </label>
          <div class="flex gap-2">
            <input
              v-model.number="selectedSeed"
              type="number"
              min="1"
              max="9999"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              @click="randomizeSeed"
              class="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              title="Randomize seed"
            >
              🎲
            </button>
          </div>
          <p class="text-xs text-gray-600 mt-1">
            Different seeds generate different problem sets
          </p>
        </div>
      </div>

      <!-- Allow Negatives Toggle (Subtraction only) -->
      <div v-if="config.operation === 'sub'" class="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <input
          id="allow-negatives"
          type="checkbox"
          v-model="selectedAllowNegatives"
          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <label for="allow-negatives" class="text-sm font-medium text-gray-700 cursor-pointer">
          Allow negative results (e.g., 3 - 5 = -2)
        </label>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 flex-wrap">
        <button
          @click="generateNew"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Generate Practice
        </button>
        
        <button
          @click="copyUrl"
          class="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          {{ copyButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import {
  encodeUrl,
  generateRandomUrl
} from '../utils/focusEncoder.js';

const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  currentUrl: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['url-changed']);

const copyButtonText = ref('Copy URL');

const selectedFocus = ref(props.config.focus);
const selectedSeed = ref(props.config.seedNumber);
const selectedAllowNegatives = ref(props.config.allowNegatives || false);

const operationSymbol = computed(() => props.config.operation === 'sum' ? '+' : '-');
const largestResult = computed(() => {
  if (props.config.operation === 'sum') {
    return props.config.focus * 2;
  } else {
    return 0; // focus - focus = 0
  }
});

// Watch for config changes from outside
watch(() => props.config, (newConfig) => {
  selectedFocus.value = newConfig.focus;
  selectedSeed.value = newConfig.seedNumber;
  selectedAllowNegatives.value = newConfig.allowNegatives || false;
}, { deep: true });

function generateNew() {
  const newUrl = encodeUrl(
    props.config.operation,
    selectedFocus.value,
    selectedSeed.value,
    selectedAllowNegatives.value
  );
  
  if (newUrl) {
    emit('url-changed', newUrl);
  }
}

function randomizeSeed() {
  selectedSeed.value = Math.floor(Math.random() * 9999) + 1;
}

function copyUrl() {
  const fullUrl = `${window.location.origin}${props.currentUrl}`;
  navigator.clipboard.writeText(fullUrl).then(() => {
    copyButtonText.value = 'Copied!';
    setTimeout(() => {
      copyButtonText.value = 'Copy URL';
    }, 2000);
  });
}
</script>
