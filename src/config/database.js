const mongoose = require('mongoose');

const connectDatabase = async () => {
try {
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/stockdb'; 
await mongoose.connect(dbUri);
console.log('MongoDB connected');
} catch (error) {
console.error(error);
process.exit(1);
} };
module.exports = connectDatabase;