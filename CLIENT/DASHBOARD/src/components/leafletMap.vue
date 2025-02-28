<template>
  <div id="map"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import "leaflet/dist/leaflet.css"
import * as L from 'leaflet'

const initialMap = ref(null);
let StationsLoc = {};
const availableStations = [
    "piensg027",
    "piensg028",
    "piensg030",
    "piensg031",
    "piensg032",
  ];

const promises = []
availableStations.forEach(station => {
  let route = "http://" + station + ".ensg.eu:3000/live/lat-lon";  
  promises.push(fetch(route) // On fait la requête à l'URL de la station
    .then(response => response.json()) // On convertit la réponse en JSON
    .catch(error => {
      console.error(`Erreur lors de la récupération des données pour la station ${station}:`, error);
    }));
});


onMounted(()=> {
  let map = L.map('map').setView([0,0], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  //console.log("stationsloc : ", StationsLoc);
  Promise.all(promises)
.then(results => {
  console.log("Données récupérées pour toutes les stations:", results);
  for (let i = 0; i<5; i++) {
    if (results[i]) {
      StationsLoc[availableStations[i]] = results[i];
    }
  }
  map.setView([StationsLoc["piensg028"]["data"]["lat"],StationsLoc["piensg028"]["data"]["lon"]], map.getZoom());
})
.then(() => {
  Object.keys(StationsLoc).forEach(function(key) {
    console.log(key);
   L.marker([StationsLoc[key]["data"]["lat"],StationsLoc[key]["data"]["lon"]]).bindPopup(key).openPopup().addTo(map);
  });

})
});
</script>

<style scoped>
  #map {
    height: 400px;
    width: 100%;
  }
</style>