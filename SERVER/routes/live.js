const express = require('express');
const router = express.Router();
const db = require('../database');
const { UNITS, VALID_CAPTEURS }= require('../data.js');

router.get('/', async (req, res) => {
    try {
        const { data: latestData } = await db.getLiveData();

        // clé-valeur
        const data = latestData.reduce((acc, item) => {
            acc[item._measurement] = item._value;
            return acc;
        }, {});

        const response = {
            id: 30,
            unit: UNITS,
            data: {
                date: new Date().toISOString(),
                ...data
            }
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur live' });
    }
});

// Route /live/{list_capteur}
router.get('/:list_capteur', async (req, res) => {
    try {
        const { list_capteur } = req.params;

        if (!list_capteur.includes('-')) {
            if (!VALID_CAPTEURS.includes(list_capteur)) {
                return res.status(400).json({ message: "A query argument is invalid" });
            }
        }

        const capteurs = list_capteur.split("-");

        const capteursInvalides = capteurs.filter(capteur => !VALID_CAPTEURS.includes(capteur));
        if (capteursInvalides.length > 0) {
            return res.status(400).json({ message: "A query argument is invalid"});
        }
        
        const { data: latestData } = await db.getLiveDataBySensor(capteurs);
        
        // clé-valeur
        const data = latestData.reduce((acc, item) => {
          acc[item._measurement] = item._value;
          return acc;
        }, {});

        // Unités des capteurs demandés
        const filteredUnits = Object.keys(UNITS)
            .filter(key => capteurs.includes(key))
            .reduce((acc, key) => {
                acc[key] = UNITS[key];
                return acc;
            }, {});

      const response = {
          id: 30,
          unit: filteredUnits,
          data: {
              date: new Date().toISOString(),
              ...data
          }
      };
    
      res.json(response);
      
  } catch (error) {
      res.status(500).json({ error: 'Erreur serveur de live capteur' });
  }
});

module.exports = router;
