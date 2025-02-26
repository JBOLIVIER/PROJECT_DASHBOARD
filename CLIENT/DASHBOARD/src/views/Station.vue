<template>
    <div class="dashboard">
      <h1>Dashboard Météo</h1>
      <div class="sensor-selector">
        <h2>Sélection des capteurs</h2>
        <div class="sensor-list">
          <label v-for="sensor in availableSensors" :key="sensor">
            <input
              type="checkbox"
              :value="sensor"
              v-model="selectedSensors"
            />
            {{ sensor }}
          </label>
        </div>
      </div>
      <CaseRow :sensorJson="fetchedData" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import CaseRow from '../components/CaseRow.vue';
  
  const fetchedData = ref({
    data: {},
    unit: {},
  });
  
  const availableSensors = [
    "temperature",
    "pressure",
    "humidity",
    "rain",
    "luminosity",
    "wind_heading",
    "wind_speed_avg",
  ];
  
  const selectedSensors = ref([]);
  
  /**
   * Fonction de fetch
   * Construit l'URL en fonction des capteurs sélectionnés :
   *   - Si aucun capteur n'est sélectionné : "/live"
   *   - Si un ou plusieurs capteurs sont sélectionnés : "/live/sensor1-sensor2-..."
   */
  const fetchData = async () => {
    try {
      let route = "/live";
      if (selectedSensors.value.length === 1) {
        route += "/" + selectedSensors.value[0];
      } else if (selectedSensors.value.length > 0) {
        route += "/" + selectedSensors.value.join("-");
      } else {
        route += "/temperature-pressure-humidity-rain-luminosity-wind_heading-wind_speed_avg";
      }
      const response = await fetch(route);
      const json = await response.json();
      fetchedData.value = json;
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };
  
  onMounted(() => {
    fetchData();
  });
  
  watch(selectedSensors, () => {
    fetchData();
  });
  </script>
  
  <style scoped>
    h1 {
        margin: 5px;
    }
    h2 {
        margin: 10px;
    }

    .dashboard {
        text-align: center;
        /* Retirer la hauteur fixe : laissez le contenu déterminer la hauteur */
        margin: 1rem;
    }

    .sensor-selector {
        /* Retirer la hauteur fixe */
        margin-top: 2rem;
        margin-bottom: 2rem;
        height: auto;
    }

    /* Forcer les checkbox sur une seule ligne, 
    avec défilement horizontal si nécessaire */
    .sensor-list {
        display: flex;
        flex-wrap: nowrap;       /* Pas de retour à la ligne */
        gap: 0.5rem;            /* Espacement entre les labels */
        justify-content: center; /* Centre le contenu horizontalement */
        overflow-x: auto;        /* Barre de défilement si ça dépasse */
        white-space: nowrap;     /* Évite le passage à la ligne */
        height: auto;
    }

    .sensor-list label {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0.5rem;
        padding: 0;
        vertical-align: middle;
    }

    .sensor-list input[type="checkbox"] {
        vertical-align: middle;
        margin: 0;
        width: 25px;
        height: 25px;
    }

  </style>
  