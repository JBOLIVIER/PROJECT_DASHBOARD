<script setup>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import MAP from '../components/leafletMap.vue'
import GRAPH from '../components/graphique.vue'

const jsonData = {
  data: {
    "2025-02-24T12:24:40.000Z": { temperature: 9.99 },
    "2025-02-24T12:25:00.000Z": { temperature: 9.99 },
    "2025-02-24T12:25:20.000Z": { temperature: 9.99 },
    "2025-02-24T12:25:40.000Z": { temperature: 9.99 },
    "2025-02-24T12:26:00.000Z": { temperature: 9.99 },
    "2025-02-24T12:26:20.000Z": { temperature: 9.99 },
    "2025-02-24T12:26:40.000Z": { temperature: 9.99 },
    "2025-02-24T12:27:00.000Z": { temperature: 9.99 },
    "2025-02-24T12:27:20.000Z": { temperature: 9.99 },
    "2025-02-24T12:27:40.000Z": { temperature: 9.99 },
    "2025-02-24T12:28:00.000Z": { temperature: 9.99 },
    "2025-02-24T12:28:20.000Z": { temperature: 9.99 },
  }
}
</script>

<template>
  <header>
    <Header />
  </header>
  <map>
    <MAP />
  </map>
  <graph>
    <GRAPH :graphData="jsonData"/>
  </graph>
  <footer>
    <Footer />
  </footer>
</template>
