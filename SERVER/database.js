const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const { UNITS, VALID_CAPTEURS }= require('./data.js');

// Configuration
const INFLUX_URL = 'http://localhost:8086';
const INFLUX_TOKEN = 'iKSFUC_DBgwRMwhGD3lOf_eY0aFhW3DwCcuAZbeUfHx1U-cnmfVURW5SF2Ch-YvpV_py9MQMH_8kNdiJZIBy-A==';
const INFLUX_ORG = 'ign';
const INFLUX_BUCKET = 'meteo';

// Initialisation du client InfluxDB
const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
const queryApi = influxDB.getQueryApi(INFLUX_ORG);

const getLiveData = async () => {
    const filterMeasurements = VALID_CAPTEURS.map(
        capteur => `r._measurement == "${capteur}"`
    ).join(" or ");

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
                console.log("Row:", obj);
                result.push(obj);
            },
            error(error) {
                console.error('Erreur InfluxDB:', error);
                reject(error);
            },
            complete() {
                console.log("Résultat final :", result);
                resolve({ data: result });
            }
        });
    });
};


const getLiveDataBySensor = async (capteurs) => {
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
                resolve({ data: result });
            }
        });
    });
};

const getSampleData = async (start, stop) => {

    if (typeof start !== "string" || (stop !== "now" && typeof stop !== "string")) {
        throw new Error("Les paramètres start et stop doivent être des chaînes de caractères.");
    }

    // Vérification et conversion en format compatible avec InfluxDB
    const startQuery = `time(v: ${JSON.stringify(start)})`;
    const stopQuery = stop === "now" ? "" : `, stop: time(v: ${JSON.stringify(stop)})`;

    console.log("startQuery :", startQuery);
    console.log("stopQuery :", stopQuery);

    const filterMeasurements = VALID_CAPTEURS.map(
        capteur => `r._measurement == "${capteur}"`
    ).join(" or ");

    const fluxQuery = `
        from(bucket: "${INFLUX_BUCKET}")
        |> range(start: ${startQuery}${stopQuery})
        |> filter(fn: (r) => ${filterMeasurements})
    `;
    

    console.log(fluxQuery);

    const result = {};

    return new Promise((resolve, reject) => {
        let result = [];

        queryApi.queryRows(fluxQuery, {
            next(row, tableMeta) {
                const obj = tableMeta.toObject(row);
                result.push(obj);
            },
            error(error) {
                console.error("Erreur InfluxDB :", error);
                reject(error);
            },
            complete() {
                resolve(result);
            }
        });
    });
};

const getSampleDataBySensor = async (start, stop, capteurs) => {
    if (typeof start !== "string" || (stop !== "now" && typeof stop !== "string")) {
        throw new Error("Les paramètres start et stop doivent être des chaînes de caractères.");
    }

    // Vérification et conversion en format compatible avec InfluxDB
    const startQuery = `time(v: ${JSON.stringify(start)})`;
    const stopQuery = stop === "now" ? "" : `, stop: time(v: ${JSON.stringify(stop)})`;

    console.log("startQuery :", startQuery);
    console.log("stopQuery :", stopQuery);

    const filterMeasurements = capteurs.map(capteur => `r._measurement == "${capteur}"`).join(" or ");

    const fluxQuery = `
        from(bucket: "${INFLUX_BUCKET}")
        |> range(start: ${startQuery}${stopQuery})
        |> filter(fn: (r) => ${filterMeasurements})    
    `;

    console.log(fluxQuery);

    const result = {};

    return new Promise((resolve, reject) => {
        let result = [];

        queryApi.queryRows(fluxQuery, {
            next(row, tableMeta) {
                const obj = tableMeta.toObject(row);
                result.push(obj);
            },
            error(error) {
                console.error("Erreur InfluxDB :", error);
                reject(error);
            },
            complete() {
                resolve(result);
            }
        });
    });
};


module.exports = { getLiveData, getLiveDataBySensor, getSampleData, getSampleDataBySensor };