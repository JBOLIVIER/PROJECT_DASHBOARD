const { InfluxDB, Point } = require('@influxdata/influxdb-client');

// Configuration
const INFLUX_URL = 'http://localhost:8086';
const INFLUX_TOKEN = 'iKSFUC_DBgwRMwhGD3lOf_eY0aFhW3DwCcuAZbeUfHx1U-cnmfVURW5SF2Ch-YvpV_py9MQMH_8kNdiJZIBy-A==';
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
    let latestTimestamp = null;

    return new Promise((resolve, reject) => {
        queryApi.queryRows(fluxQuery, {
            next(row, tableMeta) {
                const obj = tableMeta.toObject(row);
                result.push(obj);

                if (!latestTimestamp) {
                    latestTimestamp = obj._time;
                }
            },
            error(error) {
                console.error('Erreur InfluxDB:', error);
                reject(error);
            },
            complete() {
                resolve({ data: result, date: latestTimestamp });
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
    let latestTimestamp = null;

    return new Promise((resolve, reject) => {
        queryApi.queryRows(fluxQuery, {
            next(row, tableMeta) {
                const obj = tableMeta.toObject(row);
                result.push(obj);

                if (!latestTimestamp) {
                    latestTimestamp = obj._time;
                }
            },
            error(error) {
                console.error('Erreur InfluxDB:', error);
                reject(error);
            },
            complete() {
                resolve({ data: result, date: latestTimestamp });
            }
        });
    });
};

const getSampleData = async (start, stop) => {
    const stopQuery = stop === "now" ? "" : `, stop: ${JSON.stringify(stop)}`;

    const fluxQuery = `
        from(bucket: "${INFLUX_BUCKET}")
        |> range(start: ${JSON.stringify(start)}${stopQuery})
        |> filter(fn: (r) => r._measurement != "")
    `;

    const result = {};

    return new Promise((resolve, reject) => {
        queryApi.queryRows(fluxQuery, {
            next(row, tableMeta) {
                const obj = tableMeta.toObject(row);
                const timestamp = obj._time;

                if (!result[timestamp]) {
                    result[timestamp] = { date: timestamp };
                }

                result[timestamp][obj._measurement] = obj._value;
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

const getSampleDataBySensor = async (start, stop, capteurs) => {
    const filterMeasurements = capteurs.map(capteur => `r._measurement == "${capteur}"`).join(" or ");
    const stopQuery = stop === "now" ? "" : `, stop: ${JSON.stringify(stop)}`;

    const fluxQuery = `
        from(bucket: "${INFLUX_BUCKET}")
        |> range(start: ${JSON.stringify(start)}${stopQuery})  // Plage temporelle dynamique
        |> filter(fn: (r) => ${filterMeasurements})  // Filtrer les capteurs demandés
    `;

    const result = {};

    return new Promise((resolve, reject) => {
        queryApi.queryRows(fluxQuery, {
            next(row, tableMeta) {
                const obj = tableMeta.toObject(row);
                const timestamp = obj._time;

                if (!result[timestamp]) {
                    result[timestamp] = { date: timestamp };
                }

                result[timestamp][obj._measurement] = obj._value;
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
