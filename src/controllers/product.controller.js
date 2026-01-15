const Product = require('../models/product.model');

// Create a new product
exports.createProduct = async (req, res) => {
try {
    const productData = req.body;
    if (req.file) {
        productData.image = req.file.path;
    }
    const product = new Product(productData);
    const savedProduct = await product.save(); res.status(201).json(savedProduct);
} catch (error) {
    res.status(400).json({ error: error.message });
}
};

// Get all products
exports.getAllProducts = async (req, res) => {
try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
} catch (error) {
res.status(500).json({ error: error.message });
} };

// Get product by ID
exports.getProductById = async (req, res) => {
try {
    const product = await Product.findById(req.params.id).populate('category'); if (!product) return res.status(404).json({ error: 'Product not found' }); res.status(200).json(product);
} catch (error) {
    res.status(500).json({ error: error.message });
} };

// Update product by ID
exports.updateProduct = async (req, res) => {
try {
    const updatedProduct = await Product.findByIdAndUpdate( 
        req.params.id,
        req.body,
{ new: true, runValidators: true }
);
    if (!updatedProduct) return res.status(404)
    .json({ error: 'Product not found' }); 
    res.status(200).json(updatedProduct);
} catch (error) {
    res.status(400).json({ error: error.message });
} };

// Delete product by ID

exports.deleteProduct = async (req, res) => {
try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id); if (!deletedProduct) return res.status(404)
.json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
} catch (error) {
    res.status(500).json({ error: error.message });
} };

