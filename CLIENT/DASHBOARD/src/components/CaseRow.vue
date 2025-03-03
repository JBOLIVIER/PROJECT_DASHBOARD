<template>
  <div class="cases-row">
    <Case
      v-for="(value, key) in sensorJson.data"
      :key="key"
      :title="capitalize(key)"
      :data="value"
      :unite="sensorJson.unit[key] || ''"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Case from '../components/Case.vue';

const props = defineProps({
  sensorJson: {
    type: Object,
    required: true,
  },
});

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
</script>

<style scoped>
.cases-row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem auto;
  padding: 0 1rem;
  overflow-x: auto;
  white-space: nowrap;
  height: auto;
}

</style>
