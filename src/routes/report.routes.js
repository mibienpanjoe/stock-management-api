const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Inventory reports and analytics
 */

/**
 * @swagger
 * /api/reports/stock-per-product:
 *   get:
 *     summary: Get total stock per product
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stock quantity for each product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   productName:
 *                     type: string
 *                   totalStock:
 *                     type: integer
 *                   category:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin or Staff role required
 */
router.get('/stock-per-product', protect, authorize('admin', 'staff'), reportController.totalStockPerProduct);

/**
 * @swagger
 * /api/reports/stock-per-category:
 *   get:
 *     summary: Get total stock per category
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stock quantity grouped by category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                   totalStock:
 *                     type: integer
 *                   productCount:
 *                     type: integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin or Staff role required
 */
router.get('/stock-per-category', protect, authorize('admin', 'staff'), reportController.totalStockPerCategory);

/**
 * @swagger
 * /api/reports/stock-movements:
 *   get:
 *     summary: Get stock movements by date
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering (YYYY-MM-DD)
 *         example: "2024-01-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering (YYYY-MM-DD)
 *         example: "2024-12-31"
 *     responses:
 *       200:
 *         description: List of stock movements within date range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   product:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                   movementType:
 *                     type: string
 *                     enum: [in, out]
 *                   quantity:
 *                     type: integer
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   reason:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin or Staff role required
 */
router.get('/stock-movements', protect, authorize('admin', 'staff'), reportController.stockMovementsByDate);

/**
 * @swagger
 * /api/reports/low-stock:
 *   get:
 *     summary: Get low stock alert
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: threshold
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Minimum stock threshold for alert
 *         example: 10
 *     responses:
 *       200:
 *         description: List of products with low stock
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   stockQuantity:
 *                     type: integer
 *                   category:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [critical, low, warning]
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin or Staff role required
 */
router.get('/low-stock', protect, authorize('admin', 'staff'), reportController.lowStockAlert);

module.exports = router;