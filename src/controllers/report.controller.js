const Product = require('../models/product.model');
const StockMovement = require('../models/stockMovement.model');

// Total stock per product
exports.totalStockPerProduct = async (req, res) => {
try {
    const products = await Product.find().populate('category'); const report = products.map(p => ({
        product: p.name,
        category: p.category.name,
        stockQuantity: p.stockQuantity
    }));
    res.status(200).json(report);
} catch (error) {
    res.status(500).json({ error: error.message });
} };

// Total stock per category
exports.totalStockPerCategory = async (req, res) => {
try {
    const products = await Product.find().populate('category'); const report = {};
    products.forEach(p => {
    const categoryName = p.category.name;
    report[categoryName] = (report[categoryName] || 0) + p.stockQuantity; });
    res.status(200).json(report);
} catch (error) {
    res.status(500).json({ error: error.message });
} };

// Stock movements in a period
exports.stockMovementsByDate = async (req, res) => {
try {
    const { startDate, endDate } = req.query;
    const movements = await StockMovement.find({
    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
}).populate('product'); 
    res.status(200).json(movements);    
} catch (error) {
    res.status(500).json({ error: error.message });
} };


// Low-stock alerts
exports.lowStockAlert = async (req, res) => {
try {
    const threshold = parseInt(req.query.threshold) || 5; const products = await Product.find({ stockQuantity: { $lte: threshold } }) .populate('category');
    res.status(200).json(products);
} catch (error) {
    res.status(500).json({ error: error.message });
} };

