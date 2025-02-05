const express = require('express');
const router = express.Router();
const db = require('../database');
const { UNITS, CAPTEURS }= require('../data.js');

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
        
        if (!list_capteur.includes('-')) {
            return res.status(400).json({ message: "A query argument is invalid" });
        }

        const capteurs = list_capteur.split("-");

        const capteursInvalides = capteurs.filter(capteur => !VALID_CAPTEURS.includes(capteur));
        if (capteursInvalides.length > 0) {
            return res.status(400).json({ message: "A query argument is invalid"});
        }

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
