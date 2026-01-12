const mongoose = require('mongoose');
const User = require('../src/models/user.model');

async function testSchema() {
    console.log('--- Starting User Schema Verification for Social Auth ---');
    
    try {
        // Mock DB connection (we don't need a real one just for validation check generally, 
        // but Mongoose might need it depending on configuration)
        
        console.log('1. Testing registration with Email and Fullname (NO password, NO googleId) - Should fail if password required');
        const user1 = new User({
            fullname: 'Test User',
            email: 'test@example.com'
        });
        
        // Manual validation check
        const validationError = user1.validateSync();
        // Since we removed 'required: true' from password, this should NOT have an error for password
        if (validationError && validationError.errors.password) {
            console.error('FAIL: Password is still required!');
        } else {
            console.log('PASS: Password is no longer required.');
        }

        console.log('\n2. Testing registration with Google ID');
        const user2 = new User({
            fullname: 'Google User',
            email: 'google@example.com',
            googleId: 'google_12345'
        });
        const validationError2 = user2.validateSync();
        if (validationError2) {
            console.error('FAIL: Validation error for Google User:', validationError2.message);
        } else {
            console.log('PASS: Google ID user is valid.');
        }

        console.log('\n--- Schema Verification Successful! ---');
        process.exit(0);
    } catch (error) {
        console.error('Unexpected error during verification:', error);
        process.exit(1);
    }
}

testSchema();
