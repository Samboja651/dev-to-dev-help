const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    urgency: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    status: {
        type: String,
        enum: ['open', 'claimed', 'resolved'],
        default: 'open',
    },
    createBy: {
        type: String, // should ref userid
        required: true,
    },
    claimedBy: {
        type: String,
        default: null,
    },
    solutionDoc: {
        type: String,
        default: '', // markdown content
    },
    meetLink: {
        type: String,
        default: '',
    },
    timestamps: {
        created: {
            type: Date,
            default: Date.now,
        },
        claimed: Date,
        resolved: Date,
    },
});
module.exports = mongoose.model('Ticket', ticketSchema);
