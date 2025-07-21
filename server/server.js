const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const ticketRoutes = require ('./routes/tickets');
const cors = require('cors');

const app = express();

// middlewares
app.use(express.json(), cors(), morgan('dev'));

// routes
app.use('/api/tickets', ticketRoutes, '/api/auth', authRoutes);

// db connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("DB connection failed: ", err.message);
    });