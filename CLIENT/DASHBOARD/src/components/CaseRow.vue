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
  flex-wrap: nowrap;        /* Ne pas passer à la ligne suivante */
  justify-content: center;  /* Centre horizontalement les éléments */
  align-items: center;      /* Centre verticalement si besoin */
  gap: 1rem;                /* Espace entre chaque case */
  margin: 1rem auto;        /* Espace autour + centrage dans le parent */
  padding: 0 1rem;
  overflow-x: auto;         /* Barre de défilement horizontale si trop d'éléments */
  white-space: nowrap;      /* Évite les retours à la ligne dans le flux */
  height: auto;
}

</style>
