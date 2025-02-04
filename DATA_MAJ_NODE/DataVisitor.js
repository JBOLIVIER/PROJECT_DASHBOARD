const fs = require('fs');

const processSensorData = (filePath) => {
    // Lire le fichier texte contenant le JSON
    const data = fs.readFileSync(filePath, 'utf8');

    try {
        // Convertir le contenu du fichier en JSON
        const inputData = JSON.parse(data);

        // Créer un nouvel objet avec la structure souhaitée
        const outputData = {
            timestamp: inputData.date,  // Date du timestamp
            measures: []
        };

        // Transformer chaque mesure et ajouter une valeur aléatoire
        inputData.measure.forEach(measure => {
            outputData.measures.push({
                name: measure.name,
                value: Math.random() * 50 // Valeur aléatoire entre 0 et 50
            });
        });

        // Retourner les données transformées
        return outputData;

    } catch (e) {
        console.error('Erreur de parsing JSON:', e);
        return null;  // Retourne null en cas d'erreur
    }
};

module.exports = { processSensorData };
