const fs = require('fs');

// Spécifiez le chemin du fichier que vous souhaitez surveiller
const filePath = '/home/formation/Documents/WEB/PROJECT_DASHBOARD/DB_AND_DATA_SAMPLE/shm';

// Fonction à exécuter lorsque le fichier est modifié
function onFileChange(eventType, filename) {
  if (filename) {
    console.log(`Le fichier ${filename} a été modifié, type d'événement: ${eventType}`);
    // Ajoutez ici l'action à effectuer lorsque le fichier est modifié
  }
}

// Surveiller le fichier pour toute modification
fs.watch(filePath, onFileChange);

console.log(`Surveillance du fichier ${filePath} démarrée...`);
