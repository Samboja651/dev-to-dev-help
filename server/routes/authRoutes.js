require('dotenv').config();
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : require('../firebaseServiceAccount.json');


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

router.post('/register', register);
router.post('/login', login);
router.post('/google', async (req, res) => {
    const {idToken} = req.body;
    try {
        // Verify Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { name, email, uid } = decodedToken;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                username: name,
                email: email,
                password: 'google-auth', // Placeholder, as password is not used for Google auth
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(400).json({ message: 'Google authentication failed' });
    }
});

module.exports = router