<script setup>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import MAP from '../components/leafletMap.vue'
import Graphique from '../components/graphique.vue'

// Exemple de données pour le graphique
const timestamps = [
  "2025-02-24T12:24:40.000Z",
  "2025-02-24T12:25:00.000Z",
  "2025-02-24T12:25:20.000Z",
  "2025-02-24T12:25:40.000Z",
  "2025-02-24T12:26:00.000Z",
  "2025-02-24T12:26:20.000Z",
];

const values = [
  9.99,
  10.01,
  10.05,
  10.02,
  10.00,
  10.03,
];

// Nom du capteur et unité
const sensorName = "Temperature";
const unit = "°C";
</script>

<template>
  <header>
    <Header />
  </header>
  <map>
    <MAP />
  </map>
  <div class="chart-page">
    <Graphique 
      :title="sensorName" 
      :unit="unit" 
      :timestamps="timestamps" 
      :values="values" 
    />
  </div>
  <footer>
    <Footer />
  </footer>
</template>
