const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req, res) => {
    try {
        const latestData = await db.getLiveData();

        // clé-valeur
        const data = latestData.reduce((acc, item) => {
            acc[item._measurement] = item._value;
            return acc;
        }, {});

        const response = {
            id: 30,
            unit: {
                temperature: "C",
                pressure: "hP",
                humidity: "%",
                lux: "Lux",
                wind_heading: "°",
                wind_speed_avg: "km/h",
                lat: "DD",
                lon: "DD"
            },
            data: {
                date: new Date().toISOString(),
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
        const latestData = await db.getLiveDataBySensor(list_capteur);
        
        // clé-valeur
        const data = latestData.reduce((acc, item) => {
          acc[item._measurement] = item._value;
          return acc;
      }, {});

      const response = {
          id: 30,
          unit: {
              temperature: "C",
              pressure: "hP",
              humidity: "%",
              lux: "Lux",
              wind_heading: "°",
              wind_speed_avg: "km/h",
              lat: "DD",
              lon: "DD"
          },
          data: {
              date: new Date().toISOString(),
              ...data
          }
      };

      res.json(response);
  } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
