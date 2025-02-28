var express = require('express');
var path = require('path');  // Importation du module 'path'
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // Utilisation de __dirname et path.join pour obtenir le bon chemin
  res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

module.exports = router;