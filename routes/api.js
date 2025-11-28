const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const shortid = require('shortid');

// @route   POST /api/shorten
// @desc    Create a short URL
router.post('/shorten', async (req, res) => {
    const { originalUrl, apiKey } = req.body;

    // Simple API Key check
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
    }

    let urlToSave = originalUrl;
    if (!/^https?:\/\//i.test(urlToSave)) {
        urlToSave = 'http://' + urlToSave;
    }

    try {
        let link = await Link.findOne({ originalUrl: urlToSave });

        if (link) {
            res.json(link);
        } else {
            const shortCode = shortid.generate();
            link = new Link({
                originalUrl: urlToSave,
                shortCode
            });

            await link.save();
            res.json(link);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// @route   GET /api
// @desc    Compatibility API (GET request with query params)
router.get('/', async (req, res) => {
    const apiKey = req.query.api;
    const originalUrl = req.query.url;

    // Simple API Key check
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    if (!originalUrl) {
        return res.status(400).json({ status: 'error', message: 'Original URL is required' });
    }

    let urlToSave = originalUrl;
    if (!/^https?:\/\//i.test(urlToSave)) {
        urlToSave = 'http://' + urlToSave;
    }

    try {
        let link = await Link.findOne({ originalUrl: urlToSave });

        if (link) {
            res.json({
                status: 'success',
                shortenedUrl: `${req.protocol}://${req.get('host')}/${link.shortCode}`
            });
        } else {
            const shortCode = shortid.generate();
            link = new Link({
                originalUrl: urlToSave,
                shortCode
            });

            await link.save();
            res.json({
                status: 'success',
                shortenedUrl: `${req.protocol}://${req.get('host')}/${link.shortCode}`
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

module.exports = router;
