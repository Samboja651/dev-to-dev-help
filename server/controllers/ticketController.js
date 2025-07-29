// api controller functions
const axios = require('axios');
const Ticket = require('../models/ticket');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

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
        // console.log('Received solutiondoc:', solutionDoc);
        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                $set: {
                    solutionDoc,
                    status: 'resolved',
                    'timestamps.resolved': new Date()
                }
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
            imageUrl
        } = req.body;
        
        // console.log('incoming ticket data:', req.body)
        const newTicket = new Ticket({
            title,
            description,
            tags,
            urgency,
            createdBy,
            imageUrl,
            timestamps: {
                created: new Date(),
            },
        });
        
        const savedTicket = await newTicket.save();
        
        
        res.status(201).json({
            success: true,
            message: 'Issue posted successfully',
            data: savedTicket
        });
        
        // notify dev of a new user -> issue posted   
        axios.post('https://hook.us2.make.com/1ubyst4iyblv3luec7vdkhpka8uf2ujq', {
            title: savedTicket.title,
            description: savedTicket.description,
            urgency: savedTicket.urgency,
            createdBy: savedTicket.createdBy,
            createdAt: savedTicket.timestamps.created,
        }).catch(err => {
            console.error('Make webhook failed:', err.message);
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to post issue',
            error: err.message
        });
    }
};

// claim ticket
exports.claimTicket = async (req, res) => {
    try {
        const username = req.body.claimedBy;
        const ticketId = req.params.id;

        const claimedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                status: 'claimed',
                claimedBy: username,
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

// PATCH: unclaim a ticket
exports.unclaimTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const updatedTicket = await require('../models/ticket').findByIdAndUpdate(
            ticketId,
            {
                status: 'open',
                claimedBy: null,
                'timestamps.claimed': null
            },
            { new: true }
        );
        if (!updatedTicket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Ticket unclaimed successfully',
            data: updatedTicket
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to unclaim ticket',
            error: err.message
        });
    }
};

// upload image
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Use a Promise to wrap the upload_stream
        const streamUpload = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'image', folder: 'ticket_images' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(buffer);
            });
        };

        const result = await streamUpload(req.file.buffer);

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            imageUrl: result.secure_url
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to upload image',
            error: err.message
        });
    }
};