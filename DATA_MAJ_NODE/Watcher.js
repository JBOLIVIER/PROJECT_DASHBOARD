const chokidar = require('chokidar');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const insertWeatherData = require('./Writer');
const { processSensorData } = require('./DataVisitor');
const { processNmeaData } = require('./DataVisitor');
const { processTphData } = require('./DataVisitor');
// random sample of data
/*
const data = {
    timestamp: '2025-02-04T09:17:31.394Z', // Date du timestamp (ISO 8601)
    measures: [
        { name: "temperature", value: Math.random()*50},
        { name: "pressure", value: Math.random()*50 },
        { name: "humidity", value: Math.random()*50 },
        { name: "luminosity", value: Math.random()*50 },
        { name: "wind_heading", value: Math.random()*50},
        { name: "wind_speed_avg", value: Math.random()*50 },
        { name: "wind_speed_max", value: Math.random()*50 },
        { name: "wind_speed_min", value: Math.random()*50 }
    ]
};
*/
// filepath to change for raspeberry.pi

const SENSORfilePath = '/dev/shm/sensors';
const TPHfilePath = '/dev/shm/tph.log';
const NMEAfilePath = '/dev/shm/gpsNmea';
const RAINfilePath = '/dev/shm/rainCounter.log';



// data initialization
async function dataINIT() {
    let data = await processSensorData(SENSORfilePath); // Attend que processSensorData termine

    // Ajout des mesures initiales
    data.measures.push({
        name: "hygro",
        value: 0
    });
    data.measures.push({
        name: "press",
        value: 0
    });

    // Récupère lat et lon de manière asynchrone
    const [lat, lon] = await processNmeaData(NMEAfilePath);

    // Ajoute les mesures lat et lon
    data.measures.push({
        name: "lat",
        value: lat
    });
    data.measures.push({
        name: "lon",
        value: lon
    });

    // Ajout de la mesure de pluie
    data.measures.push({
        name: "rain",
        value: 0
    });

    return data;
};

// Fonction pour relancer l'initialisation des données toutes les secondes
async function initDataPeriodically() {
    // Récupère les données initiales
    let data = await dataINIT();
    // Instanciation des watchers
    const SENSORwatcher = chokidar.watch(SENSORfilePath, {});
    SENSORwatcher.on('change', () => { SensorDataUpdate(data); console.log('change happened'); });

    const TPHwatcher = chokidar.watch(TPHfilePath, {});
    TPHwatcher.on('change', () => {
        newTPHdata = processTphData(TPHfilePath, data.measures.hygro, data.measures.press);
        data.measures.hygro = newTPHdata[0];
        data.measures.press = newTPHdata[1];
    });

    const RAINwatcher = chokidar.watch(RAINfilePath, {});
    RAINwatcher.on('change', () => { data.measures.rain = Number(data.measures.rain) + 0.328; });

    // Envoi des données et relance l'initialisation toutes les secondes
    setInterval(async () => {
        insertWeatherData(data);
        console.log("data sended");


        // Récupère à nouveau les données après 20 seconde
        data = await dataINIT();
    }, 20000);

}

initDataPeriodically(); // Démarrer l'initialisation périodique des données

console.log(`Surveillance des fichiers démarrée...`);

// Fonction pour la mise à jour des données du capteur
async function SensorDataUpdate(data) {
    let datamaj = processSensorData(SENSORfilePath)
        .then(() => {
            datamaj.measures.forEach(newmeasure => {
                let M_name = newmeasure.name;
                let measureTochange = data.measures.find(measure => measure.name === M_name);
                if (measureTochange) {
                    measureTochange.value = (Number(measureTochange.value) + Number(newmeasure.value)) / 2;
                }
            });
        });
}