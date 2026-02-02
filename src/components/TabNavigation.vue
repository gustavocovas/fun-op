<template>
  <div class="tabs-container no-print">
    <div class="tabs">
      <router-link 
        :to="`/sum/${focus}/${seed}`"
        class="tab"
        :class="{ active: operation === 'sum' }"
      >
        Sum
      </router-link>
      <router-link 
        :to="`/sub/${focus}/${seed}${allowNegatives ? '/neg' : ''}`"
        class="tab"
        :class="{ active: operation === 'sub' }"
      >
        Subtraction
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  operation: {
    type: String,
    required: true
  },
  focus: {
    type: Number,
    required: true
  },
  seed: {
    type: Number,
    required: true
  },
  allowNegatives: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.tabs-container {
  margin-bottom: 2rem;
}

.tabs {
  display: flex;
  gap: 0;
  border-bottom: 2px solid #e5e7eb;
}

.tab {
  padding: 0.75rem 2rem;
  font-weight: 500;
  color: #6b7280;
  text-decoration: none;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
  position: relative;
  top: 2px;
}

.tab:hover {
  color: #3b82f6;
  background-color: #f3f4f6;
}

.tab.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
  font-weight: 600;
}
</style>
