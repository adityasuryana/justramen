import express from 'express';
import { getAllInventories, getInventoryById, addInventory, updateInventory, deleteInventory } from '../controllers/inventoriesController.js';

const router = express.Router();

router.get("/", getAllInventories);
router.get("/:id", getInventoryById);
router.post("/", addInventory);
router.put("/:id", updateInventory);
router.delete("/:id", deleteInventory);

export default router;
