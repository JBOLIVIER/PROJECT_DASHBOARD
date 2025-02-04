const { InfluxDB, Point } = require('@influxdata/influxdb-client');

// Configuration
const INFLUX_URL = 'http://localhost:8086';  // Adresse du conteneur InfluxDB
const INFLUX_TOKEN = 'ensg2025';  // Mot de passe défini dans docker-compose
const INFLUX_ORG = 'ign';
const INFLUX_BUCKET = 'meteo';

// Initialisation du client InfluxDB
const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
const queryApi = influxDB.getQueryApi(INFLUX_ORG);

const getLiveData = async () => {
    const fluxQuery = `
        from(bucket: "${INFLUX_BUCKET}")
        |> range(start: 0)
        |> last()
    `;
    const result = [];

    return new Promise((resolve, reject) => {
        queryApi.queryRows(fluxQuery, {
            next(row, tableMeta) {
                const obj = tableMeta.toObject(row);
                result.push(obj);
            },
            error(error) {
                console.error('Erreur InfluxDB:', error);
                reject(error);
            },
            complete() {
                resolve(result);
            }
        });
    });
};


const getLiveDataBySensor = async () => {
    const filterMeasurements = capteurs.map(capteur => `r._measurement == "${capteur}"`).join(" or ");

    const fluxQuery = `
        from(bucket: "${INFLUX_BUCKET}")
        |> range(start: 0)
        |> filter(fn: (r) => ${filterMeasurements})
        |> last()
    `;
    const result = [];

    return new Promise((resolve, reject) => {
        queryApi.queryRows(fluxQuery, {
            next(row, tableMeta) {
                const obj = tableMeta.toObject(row);
                result.push(obj);
            },
            error(error) {
                console.error('Erreur InfluxDB:', error);
                reject(error);
            },
            complete() {
                resolve(result);
            }
        });
    });
};

const getSampleData = async (start, stop) => {
    const fluxQuery = ``;
    const result = [];

    return new Promise((resolve, reject) => {
        queryApi.queryRows(fluxQuery, {
            next(row, tableMeta) {
                const obj = tableMeta.toObject(row);
                result.push(obj);
            },
            error(error) {
                console.error('Erreur InfluxDB:', error);
                reject(error);
            },
            complete() {
                resolve(result);
            }
        });
    });
};

const getSampleDataBySensor = async (start, stop) => {
    const fluxQuery = ``;
    const result = [];

    return new Promise((resolve, reject) => {
        queryApi.queryRows(fluxQuery, {
            next(row, tableMeta) {
                const obj = tableMeta.toObject(row);
                result.push(obj);
            },
            error(error) {
                console.error('Erreur InfluxDB:', error);
                reject(error);
            },
            complete() {
                resolve(result);
            }
        });
    });
};

module.exports = { getLiveData, getLiveDataBySensor, getSampleData, getSampleDataBySensor };
