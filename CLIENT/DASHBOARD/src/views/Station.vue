<template>
    <div class="dashboard">
      <h1>Dashboard Météo</h1>
      <div class="cases-row">
        <Case
          v-if="data.temperature !== undefined"
          title="Temperature"
          :data="data.temperature"
          :unite="unit.temperature"
        />
        <Case
          v-if="data.pressure !== undefined"
          title="Pressure"
          :data="data.pressure"
          :unite="unit.pressure"
        />
        <Case
          v-if="data.humidity !== undefined"
          title="Humidity"
          :data="data.humidity"
          :unite="unit.humidity"
        />
        <Case
          v-if="data.luminosity !== undefined"
          title="Luminosity"
          :data="data.luminosity"
          :unite="unit.luminosity"
        />
        <Case
          v-if="data.wind_heading !== undefined"
          title="Wind Heading"
          :data="data.wind_heading"
          :unite="unit.wind_heading"
        />
        <Case
          v-if="data.wind_speed_avg !== undefined"
          title="Wind Speed"
          :data="data.wind_speed_avg"
          :unite="unit.wind_speed_avg"
        />
        <Case
          v-if="data.lat !== undefined"
          title="Latitude"
          :data="data.lat"
          :unite="unit.lat"
        />
        <Case
          v-if="data.lon !== undefined"
          title="Longitude"
          :data="data.lon"
          :unite="unit.lon"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Case from '../components/Case.vue';
  
  const data = ref({});
  const unit = ref({});
  
  const fetchData = async () => {
    try {
      // Si vous avez configuré un proxy dans vite.config.js
      // pour pointer vers http://localhost:3000
      const response = await fetch('/live');
      const json = await response.json();
      data.value = json.data;
      unit.value = json.unit;
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };
  
  onMounted(() => {
    fetchData();
  });
  </script>
  
  <style scoped>
  .dashboard {
    text-align: center;
    margin: 1rem;
  }
  
  /* Affiche toutes les cases sur une seule ligne,
     avec éventuellement un scroll horizontal si ça ne rentre pas. */
  .cases-row {
    display: flex;
    flex-wrap: nowrap;
    gap: 1rem;
    overflow-x: auto;
    margin: 1rem auto;
    padding: 0 1rem; /* pour un peu d'espace sur les bords */
  }
  </style>
  