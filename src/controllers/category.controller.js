const Category = require('../models/category.model');

// Create a new category
exports.createCategory = async (req, res) => { try {
    const categoryData = req.body;
    if (req.file) {
        categoryData.image = req.file.path;
    }
    const category = new Category(categoryData);
    const savedCategory = await category.save(); res.status(201).json(savedCategory);
    } catch (error) {
    res.status(400).json({ 
        error: error.message });
} };



exports.updateCategory = async (req, res) => {
try {
    const categoryData = req.body;
    if (req.file) {
        categoryData.image = req.file.path;
    }
    const updatedCategory = await Category.findByIdAndUpdate( 
        req.params.id,
        categoryData,
        { new: true, runValidators: true }
    );
    if (!updatedCategory) return res.status(404)
    .json({ error: 'Category not found' }); res.status(200).json(updatedCategory);
} catch (error){
    res.status(400).json({ error: error.message});
}
};


// Delete a category by ID
exports.deleteCategory = async (req, res) => {
try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id); 
    if (!deletedCategory) return res.status(404)
    .json({ error: 'Category not found' });
    res.status(200).json({
         message: 'Category deleted successfully' });
} catch (error) {
    res.status(500).json({ error: error.message });
} };