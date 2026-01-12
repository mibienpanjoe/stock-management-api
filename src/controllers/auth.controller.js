const User = require('../models/user.model'); const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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

// Google Auth (Register/Login)
exports.googleAuth = async (req, res) => {
try {
    const { idToken } = req.body;
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
        // Create new user if not exists
        user = new User({
            fullname: name,
            email,
            googleId,
            role: 'staff' // Default role
        });
        await user.save();
    } else if (!user.googleId) {
        // Link googleId to existing email-only user
        user.googleId = googleId;
        await user.save();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ 
        token, 
        user: { 
            id: user._id, 
            fullname: user.fullname, 
            email: user.email, 
            role: user.role 
        } 
    });
} catch (error) {
    res.status(400).json({ error: 'Google authentication failed: ' + error.message });
} };

