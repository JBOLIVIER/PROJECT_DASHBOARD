<script setup>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import MAP from '../components/leafletMap.vue'
import GRAPH from '../components/graphique.vue'
</script>

<template>
  <header>
    <Header />
  </header>
  <map>
    <MAP />
  </map>
  <graph>
    <GRAPH />
  </graph>
  <footer>
    <Footer />
  </footer>
</template>
