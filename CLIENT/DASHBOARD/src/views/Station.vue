<!-- src/views/Station.vue -->
<template>
    <div class="dashboard">
      <h1>Dashboard Météo</h1>
      <div class="cases">
        <!-- On utilise le component Case pour chaque donnée du JSON -->
        <Case v-if="data.temperature !== undefined" :data="data.temperature" :unite="unit.temperature" />
        <Case v-if="data.pressure !== undefined" :data="data.pressure" :unite="unit.pressure" />
        <Case v-if="data.humidity !== undefined" :data="data.humidity" :unite="unit.humidity" />
        <Case v-if="data.luminosity !== undefined" :data="data.luminosity" :unite="unit.luminosity" />
        <Case v-if="data.wind_heading !== undefined" :data="data.wind_heading" :unite="unit.wind_heading" />
        <Case v-if="data.wind_speed_avg !== undefined" :data="data.wind_speed_avg" :unite="unit.wind_speed_avg" />
        <Case v-if="data.lat !== undefined" :data="data.lat" :unite="unit.lat" />
        <Case v-if="data.lon !== undefined" :data="data.lon" :unite="unit.lon" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Case from '../components/Case.vue'; // ajustez le chemin si nécessaire
  
  // Références pour stocker les données et les unités
  const data = ref({});
  const unit = ref({});
  
  // Fonction pour récupérer les données depuis l'API
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/live");
      const json = await response.json();
      // On récupère la partie "data" et "unit" du JSON
      data.value = json.data;
      unit.value = json.unit;
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
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
  
  .cases {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  </style>
  