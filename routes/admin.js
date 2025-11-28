const express = require('express');
const router = express.Router();
const Link = require('../models/Link');

// Middleware to check if logged in
const isAdmin = (req, res, next) => {
    if (req.session.admin) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};

// Login Page
router.get('/login', (req, res) => {
    res.render('admin/login', { error: null });
});

// Login Logic
router.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
        req.session.admin = true;
        res.redirect('/admin');
    } else {
        res.render('admin/login', { error: 'Invalid Password' });
    }
});

// Dashboard
router.get('/', isAdmin, async (req, res) => {
    try {
        const links = await Link.find().sort({ date: -1 });
        const totalClicks = links.reduce((acc, link) => acc + link.clicks, 0);
        res.render('admin/dashboard', { links, totalClicks });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete Link
router.post('/delete/:id', isAdmin, async (req, res) => {
    try {
        await Link.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

module.exports = router;
