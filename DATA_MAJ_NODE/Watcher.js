const chokidar = require('chokidar');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const insertWeatherData = require('./Writer');

//sample of data
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

// istanciation of watcher
const filePath = '/home/formation/Documents/WEB/PROJECT_DASHBOARD/DB_AND_DATA_SAMPLE/shm/sensors';
const watcher = chokidar.watch(filePath, { });
watcher.on('change', path => console.log(`File ${path} has been changed`))
watcher.on('change', path => insertWeatherData(data))


console.log(`Surveillance du fichier ${filePath} démarrée...`);
