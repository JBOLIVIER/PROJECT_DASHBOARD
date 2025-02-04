const express = require('express');
const router = express.Router();
const db = require('../database');

// Route /sample/{start}/now
router.get('/:start/now', async (req, res) => {
    try {
        const { start } = req.params;
        const data = await db.getSampleData(start, 'now');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route /sample/{start}/now/{list_capteur}
router.get('/:start/now/:list_capteur', async (req, res) => {
    try {
        const { start, list_capteur } = req.params;
        const data = await db.getSampleDataBySensor(start, 'now', list_capteur);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route /sample/{start}/{stop}
router.get('/:start/:stop', async (req, res) => {
    try {
        const { start, stop } = req.params;
        const data = await db.getSampleData(start, stop);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route /sample/{start}/{stop}/{list_capteur}
router.get('/:start/:stop/:list_capteur', async (req, res) => {
    try {
        const { start, stop, list_capteur } = req.params;
        const data = await db.getSampleDataBySensor(start, stop, list_capteur);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;
