const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ 
    storage: multer.memoryStorage() ,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});
const {
    getOpenTickets, submitDocSolution, createTicket,
    claimTicket, submitMeetSolution, claimedTickets,
    resolvedTickets, unclaimTicket, uploadImage
} = require('../controllers/ticketController');

// POST: submit a new ticket
router.post('/submit', createTicket);

// GET: fetch all open tickets
router.get('/open', getOpenTickets);

// PATCH: claim a ticket
router.patch('/claim/:id', claimTicket);

// PATCH: unclaim a ticket
router.patch('/unclaim/:id', unclaimTicket);

// PATCH: submit a solution document
router.patch('/solution/:id', submitDocSolution); 

// PATCH: add google meet link as solution
router.patch('/meet/:id', submitMeetSolution);

// GET: fetch claimed tickets
router.get('/claimed', claimedTickets); 

// GET: fetch resolved tickets
router.get('/resolved', resolvedTickets);

// POST: upload an image to Cloudinary
router.post('/upload-image', upload.single('image'), uploadImage);

module.exports = router
