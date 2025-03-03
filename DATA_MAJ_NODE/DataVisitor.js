const fs = require('fs');
const NMEA = require('nmea');

async function processSensorData(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');

    try {
        const inputData = JSON.parse(data);

        const outputData = {
            timestamp: inputData.date,
            measures: []
        };

        inputData.measure.forEach(measure => {
            outputData.measures.push({
                name: measure.name,
                value: Number(measure.value)
            });
        });

        return outputData;

    } catch (e) {
        console.error('Erreur de parsing JSON:', e);
        return null;
    }
}

const processNmeaData = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }

            const gpggaLine = data.split('\n').find(line => line.startsWith('$GPGGA'));
            const { lat, lon } = NMEA.parse(gpggaLine) || {};

            resolve([lat, lon]);
        });
    });
};

const processTphData = (filePath, hygr, press) => {
    const data = fs.readFileSync(filePath, 'utf8');

    try {
        const inputData = JSON.parse(data);

        hygrNEW = Number(data.hygro);
        pressNEW = Number(data.press);

        if (hygr === 0) {
            return [(hygr + hygrNEW) / 2, (press + pressNEW) / 2]
        } else {
            return [hygrNEW, pressNEW]
        }

    } catch (e) {
        console.error('Erreur de parsing JSON:', e);
        return null;
    }
};

module.exports = {
    processSensorData,
    processNmeaData,
    processTphData
};