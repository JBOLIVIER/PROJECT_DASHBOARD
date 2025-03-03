<template>
  <div class="graphs-container" v-if="graphsJson && graphsJson.data && Object.keys(graphsJson.data).length">
    <div class="graphs">
      <div
        v-for="(sensorValues, sensorName) in sensorsData"
        :key="sensorName"
        class="graph-wrapper"
      >
        <Graphique
          :title="sensorName"
          :unit="graphsJson.unit[sensorName] || ''"
          :timestamps="timestamps"
          :values="sensorValues"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading graphs…</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Graphique from './graphique.vue';

const props = defineProps({
  graphsJson: {
    type: Object,
    required: true,
  },
});

const timestamps = computed(() => {
  if (!props.graphsJson.data) return [];
  const times = Object.keys(props.graphsJson.data);
  times.sort((a, b) => new Date(a) - new Date(b));
  return times;
});

const sensorKeys = computed(() => {
  if (!props.graphsJson.data) return [];
  const times = timestamps.value;
  if (times.length === 0) return [];
  return Object.keys(props.graphsJson.data[times[0]] || {});
});

const sensorsData = computed(() => {
  const result = {};
  const times = timestamps.value;
  sensorKeys.value.forEach(sensor => {
    result[sensor] = times.map(time => props.graphsJson.data[time][sensor]);
  });
  return result;
});
</script>

<style scoped>
.graphs-container {
  overflow-y: auto;
  padding: 1rem;
  max-height: 80vh;
}

.graphs {
  display: grid;
  grid-template-columns: repeat(2, 600px);
  grid-auto-rows: 400px;
  gap: 1rem;
  justify-content: center;
}

.graph-wrapper {
  width: 600px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  background-color: #f9f9f9;
  box-sizing: border-box;
}
</style>

