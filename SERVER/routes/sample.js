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

// Route /sample/:start/:stop
router.get('/:start/:stop', async (req, res) => {
    try {
        const { start, stop } = req.params;

        const sampleData = await db.getSampleData(start, stop);

        const response = {
            id: 30,
            unit: UNITS,
            ...sampleData
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route /sample/{start}/{stop}/{list_capteur}
router.get('/:start/:stop/:list_capteur', async (req, res) => {
    try {
        const { start, stop, list_capteur } = req.params;
        const capteurs = list_capteur.split("-"); // Transformer en tableau

        const sampleData = await db.getSampleDataBySensor(start, stop, capteurs);

        const filteredUnits = Object.keys(UNITS)
            .filter(key => capteurs.includes(key))
            .reduce((acc, key) => {
                acc[key] = UNITS[key];
                return acc;
            }, {});

        const response = {
            id: 30,
            unit: filteredUnits,
            ...sampleData
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;
