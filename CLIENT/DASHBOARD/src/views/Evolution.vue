<template>
    <header>
      <Header />
    </header>
    
    <div class="dashboard">
      <h1>Dashboard Météo</h1>
      
      <!-- Sélection de la station -->
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
      
      <!-- Sélection des capteurs -->
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
      
      <!-- Cases start et stop -->
      <div class="start-stop">
        <label>
          Start:
          <input type="text" v-model="startValue" placeholder="start" />
        </label>
        <label>
          Stop:
          <input type="text" v-model="stopValue" placeholder="stop" />
        </label>
      </div>
      
      <!-- Graphs (affichage des données) -->
      <Graphs :sensorJson="fetchedData" />
    </div>
    
    <footer>
      <Footer />
    </footer>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import Graphs from '../components/Graphs.vue';
  import Footer from '../components/Footer.vue';
  import Header from '../components/Header.vue';
  
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
  
  // Valeurs start et stop (par défaut, à adapter)
  const startValue = ref("start");
  const stopValue = ref("stop");
  
  const handleStationChange = (station, event) => {
    // Simule un comportement de bouton radio avec des checkboxes :
    if (selectedStation.value !== station) {
      selectedStation.value = station;
    } else {
      // Empêche la désélection de la station déjà sélectionnée
      event.preventDefault();
    }
  };
  
  /**
   * Fonction de fetch.
   * Construit l'URL en fonction de :
   * - La station sélectionnée,
   * - Les capteurs sélectionnés (ou une valeur par défaut),
   * - Les valeurs start et stop.
   */
   const fetchData = async () => {
    // Construire l'URL de base avec la station, start et stop
    let route = "http://" + selectedStation.value + ".ensg.eu:3000/sample/" + startValue.value + "/" + stopValue.value;
    
    // Ajouter la partie capteurs
    if (selectedSensors.value.length === 1) {
        route += "/" + selectedSensors.value[0];
    } else if (selectedSensors.value.length > 0) {
        route += "/" + selectedSensors.value.join("-");
    } else {
        route += "/temperature-pressure-humidity-rain-luminosity-wind_heading-wind_speed_avg";
    }
    
    console.log("Fetching data from", route);
    try {
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
  
  // Relance le fetch dès qu'une sélection change (station, capteurs, start ou stop)
  watch([selectedSensors, selectedStation, startValue, stopValue], () => {
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
  
  /* Section capteurs */
  .sensor-selector {
    margin-top: 2rem;
    margin-bottom: 2rem;
    height: auto;
  }
  .sensor-list {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
    justify-content: center;
    overflow-x: auto;
    white-space: nowrap;
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
  
  /* Section start-stop */
  .start-stop {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .start-stop label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  .start-stop input {
    width: 100px;
    padding: 0.5rem;
    text-align: center;
  }
  </style>
  