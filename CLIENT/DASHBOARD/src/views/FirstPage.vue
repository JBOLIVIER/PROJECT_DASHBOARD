<script setup>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import MAP from '../components/leafletMap.vue'
import Graphs from '../components/Graphs.vue'

// Exemple de JSON avec des données pour plusieurs capteurs et des timestamps
const jsonData = {
  id: 30,
  unit: {
    temperature: "°C",
    pressure: "hPa",
    humidity: "%",
  },
  data: {
    "2025-02-24T12:24:40.000Z": {
      temperature: 9.99,
      pressure: 994.96,
      humidity: 50,
    },
    "2025-02-24T12:25:00.000Z": {
      temperature: 10.01,
      pressure: 995.01,
      humidity: 51,
    },
    "2025-02-24T12:25:20.000Z": {
      temperature: 10.05,
      pressure: 995.05,
      humidity: 52,
    }
  }
}
</script>

<template>
  <header>
    <Header />
  </header>
  <!-- <map>
    <MAP />
  </map> -->
  <graph>
    <!-- Utilisation du nouveau composant Graphs avec le JSON fourni -->
    <Graphs :graphsJson="jsonData"/>
  </graph>
  <footer>
    <Footer />
  </footer>
</template>
