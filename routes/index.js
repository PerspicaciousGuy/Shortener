const express = require('express');
const router = express.Router();
const Link = require('../models/Link');

// @route   GET /
// @desc    Landing page
router.get('/', (req, res) => {
    res.render('index');
});

const shortid = require('shortid');

// @route   POST /demo
// @desc    Create a short URL (Demo version, no API key needed)
router.post('/demo', async (req, res) => {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ error: 'URL required' });

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
            link = new Link({ originalUrl: urlToSave, shortCode });
            await link.save();
            res.json(link);
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   GET /:code
// @desc    Redirect to interstitial page
router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({ shortCode: req.params.code });

        if (link) {
            // Render the interstitial page with the original URL
            res.render('interstitial', { originalUrl: link.originalUrl });

            // Increment click count (async)
            link.clicks++;
            link.save();
        } else {
            return res.status(404).json({ error: 'Link not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
