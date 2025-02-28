<template>
  <!-- Si des données existent, on affiche le conteneur scrollable -->
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

// Calculer la liste des timestamps triés à partir de graphsJson.data
const timestamps = computed(() => {
  if (!props.graphsJson.data) return [];
  const times = Object.keys(props.graphsJson.data);
  times.sort((a, b) => new Date(a) - new Date(b));
  return times;
});

// Déterminer la liste des capteurs présents à partir du premier enregistrement
const sensorKeys = computed(() => {
  if (!props.graphsJson.data) return [];
  const times = timestamps.value;
  if (times.length === 0) return [];
  return Object.keys(props.graphsJson.data[times[0]] || {});
});

// Pour chaque capteur, construire le tableau de valeurs sur l'ensemble des timestamps
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
/* Conteneur scrollable pour l'ensemble des graphiques */
.graphs-container {
  overflow-y: auto;
  padding: 1rem;
  max-height: 80vh; /* Vous pouvez ajuster cette hauteur si nécessaire */
}

/* Grille à 2 colonnes avec des dimensions fixes pour chaque graphique */
.graphs {
  display: grid;
  grid-template-columns: repeat(2, 600px); /* Augmenté de 400px à 600px */
  grid-auto-rows: 400px; /* Augmenté de 300px à 400px */
  gap: 1rem;
  justify-content: center;
}

/* Style de chaque wrapper de graphique */
.graph-wrapper {
  width: 600px; /* Même largeur que la colonne */
  height: 300px; /* Même hauteur que la ligne */
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  background-color: #f9f9f9;
  box-sizing: border-box;
}
</style>

