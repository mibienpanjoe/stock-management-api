const express = require('express');

const connectDatabase = require('./config/database'); 
const healthRoutes = require('./routes/health.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const stockMovementRoutes = require('./routes/stockMovement.routes');
const authRoutes = require('./routes/auth.routes');


const app = express();

connectDatabase();

app.use(express.json());
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stock-movements', stockMovementRoutes);


module.exports = app;