const User = require('../models/user.model'); const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = `${process.env.JWT_SECRET}` ; 

// Register user

exports.register = async (req, res) => {
try {
    const { fullname, email, password, role } = req.body;
    const profileImage = req.file ? req.file.path : undefined;
    const user = new User({ fullname, email, password, role, profileImage });
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

// Get user profile
exports.getProfile = async (req, res) => {
try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
} catch (error) {
    res.status(500).json({ error: error.message });
} };

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { fullname } = req.body;
        const updates = {};
        
        if (fullname) updates.fullname = fullname;
        if (req.file) updates.profileImage = req.file.path;

        const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
        
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        res.status(200).json({ 
            message: 'Profile updated successfully', 
            user 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

