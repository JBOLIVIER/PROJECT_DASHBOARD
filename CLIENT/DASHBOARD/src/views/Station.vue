<template>
      <header>
        <Header />
    </header>
    <div class="dashboard">
      <h1>Dashboard Météo</h1>

      <div class="station-selector">
      <h2>Sélection de la station</h2>
      <div class="station-list">
        <label v-for="station in availableStationsForStations" :key="station">
          <input 
            type="checkbox"
            :value="station"
            :checked="selectedStation === station"
            @change="handleStationChange(station, $event)"
          />
          {{ station }}
        </label>
      </div>
    </div>

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
    <footer>
    <Footer />
  </footer>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import CaseRow from '../components/CaseRow.vue';
  import Footer from '../components/Footer.vue'
  import Header from '../components/Header.vue'
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

  const availableStationsForStations = [
    "piensg027",
    "piensg028",
    "piensg030",
    "piensg031",
    "piensg032",
  ];

  // Station sélectionnée (par défaut "piensg030")
  const selectedStation = ref("piensg030");

  const handleStationChange = (station, event) => {
    // Pour simuler un comportement de bouton radio avec des checkboxes :
    if (selectedStation.value !== station) {
      selectedStation.value = station;
    } else {
      // Si l'utilisateur tente de décocher la station déjà sélectionnée, on empêche l'action
      event.preventDefault();
    }
  };

  
  /**
   * Fonction de fetch
   * Construit l'URL en fonction des capteurs sélectionnés :
   *   - Si aucun capteur n'est sélectionné : "/live"
   *   - Si un ou plusieurs capteurs sont sélectionnés : "/live/sensor1-sensor2-..."
   */
  const fetchData = async () => {
    let route = "http://" + selectedStation.value + ".ensg.eu:3000/live";    
    try {
      if (selectedSensors.value.length === 1) {
        route += "/" + selectedSensors.value[0];
      } else if (selectedSensors.value.length > 0) {
        route += "/" + selectedSensors.value.join("-");
      } else {
        route += "/temperature-pressure-humidity-rain-luminosity-wind_heading-wind_speed_avg";
      }
      console.log("Fetching data from", route);
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
  
  watch([selectedSensors, selectedStation], () => {
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

    /* Section station */
    .station-selector {
      margin-top: 2rem;
      margin-bottom: 1rem;
      height: auto;
    }
    .station-list {
      display: flex;
      flex-wrap: nowrap;
      gap: 0.5rem;
      justify-content: center;
      overflow-x: auto;
      white-space: nowrap;
    }
    .station-list label {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0.5rem;
      padding: 0;
      vertical-align: middle;
    }
    .station-list input[type="checkbox"] {
      width: 25px;
      height: 25px;
      margin: 0;
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
  