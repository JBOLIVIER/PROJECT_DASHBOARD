const { InfluxDB, Point } = require('@influxdata/influxdb-client');

// Fonction pour insérer les données météorologiques dans InfluxDB
async function insertWeatherData(data) {
    // Configuration de la connexion InfluxDB
    const url = 'http://localhost:8086';  // Remplacez par l'URL de votre serveur InfluxDB
    const org = 'ign'; // Remplacez par votre organisation
    const token = 'awWkYSHiI6BxF5wzKrkVEPjR8EdXdzcTD2hRDv2SjrgYUkbkkxHewRFQcdkSyaU_vTAzSqWdQ1Gq4KzOiN_7cQ=='; // Assurez-vous que votre token est dans les variables d'environnement
    const bucket = 'meteo'; // Remplacez par votre bucket InfluxDB

    // Créer un client InfluxDB
    const client = new InfluxDB({ url, token });

    // Créer un Write API
    const writeApi = client.getWriteApi(org, bucket, 'ns'); // 'ns' pour nanosecondes de précision

    // Créer un point InfluxDB
    
        //.timestamp(timestamp)                // Ajouter le timestamp

    // Ajouter chaque mesure comme un champ
    data.measures.forEach(m => {
        const point = new Point(m.name)  // Nom de la mesure
        point.floatField("value",m.value); // Ajouter chaque champ avec son nom et sa valeur
        // Écrire les données dans InfluxDB
        writeApi.writePoint(point)
    });



    // Fermer le Write API pour envoyer les données
    writeApi.close()
    .then(() => {
        console.log('Données insérées avec succès!');
    })
    .catch(e => {
        console.error('Erreur lors de l\'insertion des données : ', e);
    });
}

// Exporter la fonction pour l'utiliser ailleurs
module.exports = insertWeatherData;
