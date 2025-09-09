import express from "express";

import login  from "../controllers/authController.js";

const router = express.Router();

// Route for user login
router.post("/login", login);

// Export the router
export default router;