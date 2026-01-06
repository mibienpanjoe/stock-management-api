const User = require('../models/user.model'); const jwt = require('jsonwebtoken');
const JWT_SECRET = `${process.env.JWT_SECRET}` ; 

// Register user

exports.register = async (req, res) => {
try {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' }); 
} catch (error) {
    res.status(400).json({ error: error.message });
} };

// Login user
exports.login = async (req, res) => {
try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
} catch (error) {
    res.status(500).json({ error: error.message });
} };

