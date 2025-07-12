const express = require('express');
const router = express.Router();
const {
    getOpenTickets, submitDocSolution, createTicket,
    claimTicket, submitMeetSolution, claimedTickets,
    resolvedTickets
} = require('../controllers/ticketController');

// POST: submit a new ticket
router.post('/submit', createTicket);

// GET: fetch all open tickets
router.get('/open', getOpenTickets);

// PATCH: claim a ticket
router.patch('/claim/:id', claimTicket);

// PATCH: submit a solution document
router.patch('/solution/:id', submitDocSolution); 

// PATCH: add google meet link as solution
router.patch('/meet/:id', submitMeetSolution);

// GET: fetch claimed tickets
router.get('/claimed', claimedTickets); 

// GET: fetch resolved tickets
router.get('/resolved', resolvedTickets);

module.exports = router
