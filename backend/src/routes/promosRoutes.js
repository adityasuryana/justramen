import express from 'express';
import { getAllPromos, getPromoById, createPromo, updatePromo, deletePromo } from '../controllers/promosController.js';

const router = express.Router();

router.get("/", getAllPromos);
router.get("/:id", getPromoById);
router.post("/", createPromo);
router.put("/:id", updatePromo);
router.delete("/:id", deletePromo);

export default router;
