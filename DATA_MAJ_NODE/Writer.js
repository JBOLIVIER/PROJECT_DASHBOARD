const { InfluxDB, Point } = require('@influxdata/influxdb-client');

async function insertWeatherData(data) {
    const url = 'http://localhost:8086';
    const org = 'ign';
    const token = "uTAeUuj_HbDjTE4AeButCDMiQ4IAFzmRXyXYRfpbhCjjhbf9C3tlwS-vhgDcoLqax1avKKxwWx30HTLtntXA5g==";
    const bucket = 'meteo';

    const client = new InfluxDB({ url, token });

    const writeApi = client.getWriteApi(org, bucket, 'ns');

    data.measures.forEach(m => {
        const point = new Point(m.name);
        let value;
        if (isNaN(m.value)) { value = 0; }
        else { value = m.value };
        point.floatField("value", m.value);
        writeApi.writePoint(point)
    });

    writeApi.close()
        .then(() => {
            console.log('Données insérées avec succès!');
        })
        .catch(e => {
            console.error('Erreur lors de l\'insertion des données : ', e);
        });
}

module.exports = insertWeatherData;