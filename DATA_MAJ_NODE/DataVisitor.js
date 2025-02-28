const fs = require('fs');
const NMEA = require('nmea');

async function processSensorData(filePath) {
    // Lire le fichier texte contenant le JSON
    const data = fs.readFileSync(filePath, 'utf8');

    try {
        // Convertir le contenu du fichier en JSON
        const inputData = JSON.parse(data);

        // Créer un nouvel objet avec la structure souhaitée
        const outputData = {
            timestamp: inputData.date, // Date du timestamp
            measures: []
        };

        // Transformer chaque mesure et ajouter une valeur aléatoire
        inputData.measure.forEach(measure => {
            outputData.measures.push({
                name: measure.name,
                value: Number(measure.value)
            });
        });

        // Retourner les données transformées
        return outputData;

    } catch (e) {
        console.error('Erreur de parsing JSON:', e);
        return null; // Retourne null en cas d'erreur
    }
}

const processNmeaData = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err); // On rejette l'erreur si le fichier ne peut pas être lu
            }

            const gpggaLine = data.split('\n').find(line => line.startsWith('$GPGGA'));
            const { lat, lon } = NMEA.parse(gpggaLine) || {};

            resolve([lat, lon]); // On résout la promesse avec lat et lon
        });
    });
};

const processTphData = (filePath, hygr, press) => {
    const data = fs.readFileSync(filePath, 'utf8');

    try {
        // Convertir le contenu du fichier en JSON
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
        return null;  // Retourne null en cas d'erreur
    }
};

module.exports = {
    processSensorData,
    processNmeaData,
    processTphData
};