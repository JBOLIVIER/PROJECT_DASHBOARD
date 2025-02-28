<template>
    <!-- On n'affiche le container que si graphsJson.data est défini et non vide -->
    <div class="graphs" v-if="graphsJson && graphsJson.data && Object.keys(graphsJson.data).length">
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
  
  // Calculer la liste des timestamps triés à partir de graphsJson.data
  const timestamps = computed(() => {
    if (!props.graphsJson.data) return [];
    const times = Object.keys(props.graphsJson.data);
    times.sort((a, b) => new Date(a) - new Date(b));
    return times;
  });
  
  // Déterminer les capteurs présents en utilisant le premier enregistrement (si disponible)
  const sensorKeys = computed(() => {
    if (!props.graphsJson.data) return [];
    const times = timestamps.value;
    if (times.length === 0) return [];
    return Object.keys(props.graphsJson.data[times[0]] || {});
  });
  
  // Construire un objet sensorsData qui associe à chaque capteur la liste de ses valeurs sur l'ensemble des timestamps
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
  .graphs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .graph-wrapper {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 1rem;
  }
  </style>
  