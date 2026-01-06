const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller'); const { protect, authorize } = require('../middlewares/auth.middleware');


router.get('/stock-per-product', protect, authorize('admin', 'staff'), reportController.totalStockPerProduct);
router.get('/stock-per-category', protect, authorize('admin', 'staff'), reportController.totalStockPerCategory);
router.get('/stock-movements', protect, authorize('admin', 'staff'), reportController.stockMovementsByDate);
router.get('/low-stock', protect, authorize('admin', 'staff'), reportController.lowStockAlert);
module.exports = router;