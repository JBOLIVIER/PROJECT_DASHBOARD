const express = require('express');
const router = express.Router();
const db = require('../database');
const { UNITS, VALID_CAPTEURS }= require('../data.js');

// Route /sample/:start/:stop
router.get('/:start/:stop', async (req, res) => {
    try {
        const { start, stop } = req.params;
        console.log("Start:", start);
        console.log("Stop:", stop);

        const rawData = await db.getSampleData(start, stop);

        const response = {
            id: 30,
            unit: UNITS,
            data: {}
        };

        rawData.forEach(entry => {
            const date = new Date(entry._time);
            date.setMilliseconds(0);

            const formattedDate = date.toISOString();

            if (!response.data[formattedDate]) {
                response.data[formattedDate] = {};
            }

            response.data[formattedDate][entry._measurement] = entry._value;
        });

        res.json(response);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Erreur serveur start-stop' });
    }
});


// Route /sample/{start}/{stop}/{list_capteur}
router.get('/:start/:stop/:list_capteur', async (req, res) => {
    try {
        const { start, stop, list_capteur } = req.params;
        
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

        const rawData = await db.getSampleDataBySensor(start, stop, capteurs);

        const response = {
            id: 30,
            unit: UNITS,
            data: {}
        };

        rawData.forEach(entry => {
            const date = new Date(entry._time);
            date.setMilliseconds(0);

            const formattedDate = date.toISOString();

            if (!response.data[formattedDate]) {
                response.data[formattedDate] = {};
            }

            response.data[formattedDate][entry._measurement] = entry._value;
        });

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur start-stop capteur' });
    }
});

module.exports = router;