import express from "express";
import dotenv from "dotenv"

import accountsRoutes from "./routes/accountsRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
connectDB();

app.use(express.json());

app.use("/api/accounts", accountsRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});