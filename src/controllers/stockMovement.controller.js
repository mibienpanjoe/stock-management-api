const StockMovement = require('../models/stockMovement.model'); 
const Product = require('../models/product.model');

// Create a stock movement
exports.createStockMovement = async (req, res) => { 
try {
    const { product, type, quantity } = req.body;
    const productDoc = await Product.findById(product); 
    if (!productDoc) return res.status(404)
    .json({ error: 'Product not found' });
    if (type === 'OUT' && quantity > productDoc.stockQuantity) { return res.status(400).json({ error: 'Insufficient stock' });
}
const movement = new StockMovement(req.body); await movement.save();


// Update product stock 
productDoc.stockQuantity = type === 'IN' ? productDoc.stockQuantity + quantity : productDoc.stockQuantity - quantity;
    await productDoc.save();
    res.status(201).json(movement);
} catch (error) {
    res.status(400).json({ error: error.message });
} };


// Get all stock movements
exports.getAllStockMovements = async (req, res) => {
try {
    const movements = await StockMovement.find().populate('product'); res.status(200).json(movements);
} catch (error) {
    res.status(500).json({ error: error.message });
} };
