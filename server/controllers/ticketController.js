// api controller functions

const Ticket = require('../models/ticket');

// get open tickets
exports.getOpenTickets = async (req, res) => {
    try {
        const openTickets = await Ticket.find({ status: 'open' }).sort({ 'timestamps.created': -1});
        res.status(200).json({
            success: true,
            message: 'Tickets retrieved successfully',
            data: openTickets
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve tickets',
            error: err.message
        });
    }
};

// submit a solution
exports.submitDocSolution = async (req, res) => {
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
            return res.status(404).json({
            success: false,
            message: 'Ticket not found',
            error: err.message
            });
        }
        res.status(200).json({
            success: true,
            message: 'Ticket updated successfully',
            data: updatedTicket
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to submit solution',
            error: err.message
        });
    }
};

exports.submitMeetSolution = async (req, res) => {
    try {
        const { meetLink } = req.body;
        const ticketId = req.params.id;

        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                meetLink,
                status: 'resolved'
            },
            { new: true }
        );
        if (!updatedTicket) {
            return res.status(404).json({
            success: false,
            message: 'Ticket not found',
            error: err.message
            });
        }
        res.status(200).json({
            success: true,
            message: 'Ticket updated successfully',
            data: updatedTicket
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to meet link',
            error: err.message
        });
    }
};
// create a ticket
exports.createTicket = async (req, res) => {
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
        res.status(201).json({
            success: true,
            message: 'Ticket saved successfully',
            data: savedTicket
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create ticket',
            error: err.message
        });
    }
};

// claim ticket
exports.claimTicket = async (req, res) => {
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
            return res.status(404).json({
            success: false,
            message: 'Ticket not found',
            error: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: 'Ticket claimed successfully',
            data: claimedTicket
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to claim ticket',
            error: err.message
        });
    }
};


// claimed tickets
exports.claimedTickets = async (req, res) => {
    try {
        const claimedTickets = await Ticket.find({ status: 'claimed' }).sort({ 'timestamps.claimed': -1 });
        res.status(200).json({
            success: true,
            message: 'Tickets retrieved successfully',
            data: claimedTickets
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve claimed tickets',
            error: err.message
        });
    }
};

// resolved tickets
exports.resolvedTickets = async (req, res) => {
    try {
        const resolvedTickets = await Ticket.find({ status: 'resolved' }).sort({ 'timestamps.resolved': -1});
        res.status(200).json({
            success: true,
            message: 'Ticket resolved successfully',
            data: resolvedTickets
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve resolved tickets',
            error: err.message
        });
    }
};