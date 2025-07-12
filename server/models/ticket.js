const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    tags: {
        type: [String],
        default: [],
    },
    urgency: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
    },
    status: {
        type: String,
        enum: ['open', 'claimed', 'resolved'],
        default: 'open',
    },
    createdBy: {
        type: String, // should ref userid
        required: true,
    },
    claimedBy: {
        type: String,
        solutionDoc: String,
        meetLink: String,
        timestamps: {
            created: Date,
            claimed: Date,
            resolved: Date,
        },
    },
    // solutionDoc: {
    //     type: String,
    //     default: '', // markdown content
    // },
    // meetLink: {
    //     type: String,
    //     default: '',
    // },
    // timestamps: {
    //     created: {
    //         type: Date,
    //         default: Date.now,
    //     },
    //     claimed: Date,
    //     resolved: Date,
    // },
});
module.exports = mongoose.model('Ticket', ticketSchema);
