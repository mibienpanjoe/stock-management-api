const User = require('../models/user.model'); const jwt = require('jsonwebtoken');
const JWT_SECRET = `${process.env.JWT_SECRET}` ; 

// Register user

exports.register = async (req, res) => {
try {
    const { fullname, email, password, role } = req.body;
    const user = new User({ fullname, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user: { id: user._id, fullname: user.fullname, email: user.email, role: user.role } }); 
} catch (error) {
    res.status(400).json({ error: error.message });
} };

// Login user
exports.login = async (req, res) => {
try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
} catch (error) {
    res.status(500).json({ error: error.message });
} };

