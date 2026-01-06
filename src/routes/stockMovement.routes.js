const express = require('express');
const router = express.Router();
const stockMovementController = require('../controllers/stockMovement.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Stock Movements
 *   description: Stock movement tracking and management
 */

/**
 * @swagger
 * /api/stock-movements:
 *   post:
 *     summary: Create a new stock movement
 *     tags: [Stock Movements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - movementType
 *               - quantity
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product ID
 *                 example: "507f1f77bcf86cd799439011"
 *               movementType:
 *                 type: string
 *                 enum: [in, out]
 *                 description: Type of stock movement
 *                 example: "in"
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 description: Quantity of items moved
 *                 example: 50
 *               reason:
 *                 type: string
 *                 description: Reason for stock movement
 *                 example: "New shipment received"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date of movement (defaults to current date)
 *                 example: "2024-01-15T10:30:00Z"
 *     responses:
 *       201:
 *         description: Stock movement created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 product:
 *                   type: string
 *                 movementType:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *                 reason:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Validation error or insufficient stock
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.post('/', protect, stockMovementController.createStockMovement);

/**
 * @swagger
 * /api/stock-movements:
 *   get:
 *     summary: Get all stock movements
 *     tags: [Stock Movements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: product
 *         schema:
 *           type: string
 *         description: Filter by product ID
 *       - in: query
 *         name: movementType
 *         schema:
 *           type: string
 *           enum: [in, out]
 *         description: Filter by movement type
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter from date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter to date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of all stock movements
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
 *                       category:
 *                         type: string
 *                   movementType:
 *                     type: string
 *                     enum: [in, out]
 *                   quantity:
 *                     type: integer
 *                   reason:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 */
router.get('/', protect, stockMovementController.getAllStockMovements);

module.exports = router;