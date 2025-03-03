<template>
  <header>
    <Header />
  </header>

  <div class="dashboard">
    <h1>Période</h1>

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

    <!-- Cases Start et Stop -->
    <div class="start-stop">
      <DatePicker v-model="startValue" label="Start Date" id="startDate" />
      <div class="stop-date">
        <DatePicker
          v-model="stopValue"
          label="Stop Date"
          id="stopDate"
          :disabled="useNow"
        />
        <label class="now-checkbox">
          <input type="checkbox" v-model="useNow" />
          Now
        </label>
      </div>
    </div>

    <Graphs :graphsJson="fetchedData" />
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
import DatePicker from '../components/DatePicker.vue';

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
  "lat",
  "lon",
];

const selectedSensors = ref([]);

const availableStationsForStations = [
  "piensg027",
  "piensg028",
  "piensg030",
  "piensg031",
  "piensg032",
];

const selectedStation = ref("piensg030");

const startValue = ref("");
const stopValue = ref("");

const useNow = ref(false);

const handleStationChange = (station, event) => {
  if (selectedStation.value !== station) {
    selectedStation.value = station;
  } else {
    event.preventDefault();
  }
};

watch(useNow, (newVal) => {
  if (newVal) {
    stopValue.value = new Date().toISOString();
  }
});

const fetchData = async () => {
  let route =
    "http://" +
    selectedStation.value +
    ".ensg.eu:3000/sample/" +
    startValue.value +
    "/" +
    stopValue.value;

  try {
    if (selectedSensors.value.length === 1) {
      route += "/" + selectedSensors.value[0];
    } else if (selectedSensors.value.length > 0) {
      route += "/" + selectedSensors.value.join("-");
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

watch([selectedSensors, selectedStation, startValue, stopValue], () => {
  fetchData();
});
</script>

<style scoped>
  /* Global Styles */
  .dashboard {
    margin: 2rem;
    padding: 1.5rem;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #34495e;
  }

  h2 {
    font-size: 1.5rem;
    margin: 20px 0;
    color: #34495e;
  }

  /* Section Station */
  .station-selector {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .station-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .station-list label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .station-list input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin: 0;
    accent-color: #28a745;
  }

  /* Section Capteurs */
  .sensor-selector {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .sensor-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    overflow-x: auto;
  }

  .sensor-list label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .sensor-list input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin: 0;
    accent-color: #28a745;
  }

  /* Hover Effects */
  .station-list input[type="checkbox"]:hover,
  .sensor-list input[type="checkbox"]:hover {
    transform: scale(1.1);
    transition: 0.2s ease-in-out;
  }

  .station-list label:hover,
  .sensor-list label:hover {
    color: #fff;
  }

  /* Section Start-Stop */
  .start-stop {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stop-date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .now-checkbox {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
</style>

