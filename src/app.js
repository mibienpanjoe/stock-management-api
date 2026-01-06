const express = require('express');

const connectDatabase = require('./config/database'); 
const healthRoutes = require('./routes/health.routes');
const categoryRoutes = require('./routes/category.routes');

const app = express();

connectDatabase();

app.use(express.json());
app.use('/api', healthRoutes);
app.use('/api/categories', categoryRoutes);


module.exports = app;