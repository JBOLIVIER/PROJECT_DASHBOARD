const chokidar = require('chokidar');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const insertWeatherData = require('./Writer');
const { processSensorData } = require('./DataVisitor');
const { processNmeaData } = require('./DataVisitor');
const { processTphData } = require('./DataVisitor');

const SENSORfilePath = '/dev/shm/sensors';
const TPHfilePath = '/dev/shm/tph.log';
const NMEAfilePath = '/dev/shm/gpsNmea';
const RAINfilePath = '/dev/shm/rainCounter.log';

async function dataINIT() {
    let data = await processSensorData(SENSORfilePath);

    data.measures.push({
        name: "hygro",
        value: 0
    });
    data.measures.push({
        name: "press",
        value: 0
    });

    const [lat, lon] = await processNmeaData(NMEAfilePath);

    data.measures.push({
        name: "lat",
        value: lat / 1000
    });
    data.measures.push({
        name: "lon",
        value: lon / 1000
    });

    data.measures.push({
        name: "rain",
        value: 0
    });

    return data;
};

// PERIODIC WATCHER
async function initDataPeriodically() {
    let data = await dataINIT();
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

    setInterval(async () => {
        insertWeatherData(data);
        console.log("data sended");


        data = await dataINIT();
    }, 20000); // Writing timer : 20sec

}

initDataPeriodically();

console.log(`Surveillance des fichiers démarrée...`);
let datamaj;
async function SensorDataUpdate(data) {
    datamaj = await processSensorData(SENSORfilePath);
    console.log("datamaj : ", datamaj)
    if (datamaj) {
        datamaj.measures.forEach(newmeasure => {
            let M_name = newmeasure.name;

            let measureTochange = data.measures.find(measure => measure.name === M_name);

            if (measureTochange) {
                measureTochange.value = (Number(measureTochange.value) + Number(newmeasure.value)) / 2;
            }
        });
    }

}