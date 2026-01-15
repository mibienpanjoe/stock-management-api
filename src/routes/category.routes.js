const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 example: "Electronic devices and gadgets"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
const upload = require('../middlewares/upload.middleware');

router.post('/', protect, upload.single('image'), categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', protect, upload.single('image'), categoryController.updateCategory);
router.delete('/:id', protect, categoryController.deleteCategory);

module.exports = router;