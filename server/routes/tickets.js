const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');

// POST: submit a new ticket
router.post('/submit', async (req, res) => {
    try {
        const {
            title,
            description,
            tags,
            urgency,
            createdBy,
        } = req.body;

        const newTicket = new Ticket({
            title,
            description,
            tags,
            urgency,
            createdBy,
            timestamps: {
                created: new Date(),
            },
        });

        const savedTicket = await newTicket.save();
        res.status(201).json(savedTicket);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create ticket', details: err.message });
    }
});

// GET: fetch all open tickets
router.get('/open', async (req, res) => {
    try {
        const openTickets = await Ticket.find({ status: 'open' }).sort({ 'timestamps.created': -1});
        res.status(200).json(openTickets);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve tickets', details: err.message });
    }
});

module.exports = router
