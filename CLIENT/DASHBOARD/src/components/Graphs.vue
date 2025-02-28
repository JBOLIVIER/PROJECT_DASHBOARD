<template>
    <div class="graphs">
      <!-- Pour chaque capteur présent dans les données, on affiche un graphique -->
      <div
        v-for="(values, sensor) in sensorsData"
        :key="sensor"
        class="graph-wrapper"
        v-if="values && values.length"
      >
        <Graphique 
          :title="sensor" 
          :unit="graphsJson.unit[sensor] || ''" 
          :timestamps="timestamps" 
          :values="values" 
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import Graphique from './graphique.vue'; // Assurez-vous que ce composant existe
  
  // Le JSON complet est passé en prop
  const props = defineProps({
    graphsJson: {
      type: Object,
      required: true,
    },
  });
  
  // Calculer la liste des timestamps triés (les clés de graphsJson.data)
  const timestamps = computed(() => {
    const times = Object.keys(props.graphsJson.data);
    times.sort((a, b) => new Date(a) - new Date(b));
    return times;
  });
  
  // Déterminer les capteurs présents à partir du premier enregistrement (si disponible)
  const sensorKeys = computed(() => {
    const times = timestamps.value;
    if (times.length === 0) return [];
    // On récupère toutes les clés du premier objet de data
    return Object.keys(props.graphsJson.data[times[0]]);
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
  