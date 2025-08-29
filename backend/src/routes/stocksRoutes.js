import express from 'express';
import { getAllStocks, getStockById, addStock, updateStock, deleteStock } from '../controllers/stocksController.js';

const router = express.Router();

router.get("/", getAllStocks);
router.get("/:id", getStockById);
router.post("/", addStock);
router.put("/:id", updateStock);
router.delete("/:id", deleteStock);

export default router;
