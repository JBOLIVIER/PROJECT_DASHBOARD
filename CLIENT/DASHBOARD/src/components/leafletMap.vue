<template>
    <div class="map-container" ref="map"></div>
  </template>
  
  <script>
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  
  export default {
    name: "LeafletMap",
    data() {
      return {
        map: null,
        center: [48.8566, 2.3522], // Paris
        zoom: 13,
      };
    },
    mounted() {
      this.map = L.map(this.$refs.map).setView(this.center, this.zoom);
  
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
  
      L.marker(this.center)
        .addTo(this.map)
        .bindPopup("Vous êtes ici !")
        .openPopup();
    },
  };
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: 400px;
  }
  </style>
  