const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h'});
};

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json({ token: generateToken(user), user});
    } catch (err) {
        res.status(400).json({ message: 'Registration failed' });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token: generateToken(user), user });
};