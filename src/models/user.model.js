const mongoose = require('mongoose'); const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({ 
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    profileImage: {
        type: String
    },

    role: {
        type: String,
        enum: ['admin', 'staff','manager'], default: 'staff'
    }
    }, 
    {
    timestamps: true 
    }
);

// Hash password before saving
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(password) { 
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);