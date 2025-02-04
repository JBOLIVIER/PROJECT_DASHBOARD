const fs = require('fs');

// Charger le fichier texte contenant le JSON
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur de lecture du fichier', err);
        return;
    }

    try {
        // Parse le contenu du fichier en JSON
        const inputData = JSON.parse(data);

        // Créer un nouvel objet avec la structure souhaitée
        const outputData = {
            timestamp: inputData.date,  // Date du timestamp
            measures: []
        };

        // Transformer chaque mesure en ajoutant une valeur aléatoire
        inputData.measure.forEach(measure => {
            outputData.measures.push({
                name: measure.name,
                value: Math.random() * 50 // Valeur aléatoire entre 0 et 50
            });
        });

        // Sauvegarder le résultat dans un fichier output.js
        const outputJs = `const data = ${JSON.stringify(outputData, null, 4)};`;

        fs.writeFile('output.js', outputJs, (err) => {
            if (err) {
                console.error('Erreur de sauvegarde du fichier', err);
            } else {
                console.log('Fichier output.js créé avec succès!');
            }
        });

    } catch (e) {
        console.error('Erreur de parsing JSON', e);
    }
});
