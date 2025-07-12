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

// PATCH: claim a ticket
router.patch('/claim/:id', async (req, res) => {
    try {
        const { helperId } = req.body;
        const ticketId = req.params.id;

        const claimedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                status: 'claimed',
                claimedBy: helperId,
                'timestamps.claimed': new Date(),
            },
            { new: true }
        );
        if (!claimedTicket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.status(200).json(claimedTicket);
    } catch (err) {
        res.status(500).json({ error: "Failed to claim ticket", details: err.message });
    }
});

// PATCH: submit a solution document
router.patch('/solution/:id', async (req, res) => {
    try {
        const { solutionDoc } = req.body;
        const ticketId = req.params.id;

        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                solutionDoc,
                status: 'resolved',
                'timestamps.resolved': new Date(),
            },
            { new: true }
        );
        if (!updatedTicket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.status(200).json(updatedTicket);
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit solution', details: err.message });
    }
});

// PATCH: add google meet link as solution
router.patch('/meet/:id', async (req, res) => {
    try {
        const { meetLink } = req.body;
        const ticketId = req.params.id;

        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                meetLink,
                status: 'claimed',
            },
            { new: true }
        );
        if (!updatedTicket) {
            return res.status(404).json({error: 'Ticket not found'});
        }
        res.status(200).json(updatedTicket);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add meet link', details: err.message });
    }
});

// GET: fetch claimed tickets
router.get('/claimed', async (req, res) => {
    try {
        const claimedTickets = await Ticket.find({ status: 'claimed' }).sort({ 'timestamps.claimed': -1 });
        res.status(200).json(claimedTickets);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve claimed tickets', details: err.message });
    }
});

// GET: fetch resolved tickets
router.get('/resolved', async (req, res) => {
    try {
        const resolvedTickets = await Ticket.find({ status: 'resolved' }).sort({ 'timestamps.resolved': -1});
        res.status(200).json(resolvedTickets);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve resolved tickets', details: err.message });
    }
});

module.exports = router
