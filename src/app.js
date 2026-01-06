const express = require('express');

const connectDatabase = require('./config/database'); 
const healthRoutes = require('./routes/health.routes');

const app = express();

connectDatabase();

app.use(express.json());
app.use('/api', healthRoutes);

module.exports = app;