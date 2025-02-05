const express = require('express');
const router = express.Router();
const db = require('../database');

const UNITS = {
    temperature: "C",
    pressure: "hP",
    humidity: "%",
    rain: "mm/m2",
    lux: "Lux",
    wind_heading: "°",
    wind_speed_avg: "km/h",
    lat: "DD",
    lon: "DD"
};

router.get('/', async (req, res) => {
    try {
        const { data: latestData, date } = await db.getLiveData();

        // clé-valeur
        const data = latestData.reduce((acc, item) => {
            acc[item._measurement] = item._value;
            return acc;
        }, {});

        const response = {
            id: 30,
            unit: UNITS,
            data: {
                date,
                ...data
            }
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route /live/{list_capteur}
router.get('/:list_capteur', async (req, res) => {
    try {
        const { list_capteur } = req.params;
        const capteurs = list_capteur.split("-");
        const { data: latestData, date } = await db.getLiveDataBySensor(list_capteur);
        
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
              date,
              ...data
          }
      };

      res.json(response);
  } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
