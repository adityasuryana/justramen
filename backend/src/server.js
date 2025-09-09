import express from "express";
import dotenv from "dotenv"
import cors from "cors";

import accountsRoutes from "./routes/accountsRoutes.js";
import menusRoutes from "./routes/menusRoutes.js";
import promosRoutes from "./routes/promosRoutes.js";
import inventoriesRoutes from "./routes/inventoriesRoutes.js";
import stocksRoutes from "./routes/stocksRoutes.js";
import login from "./routes/authRoutes.js";

import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(
    cors({
        origin:"*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);

app.use(express.json());

app.use("/api/accounts", accountsRoutes);
app.use("/api/menus", menusRoutes);
app.use("/api/promos", promosRoutes);
app.use("/api/inventories", inventoriesRoutes);
app.use("/api/stocks", stocksRoutes);

app.use("/auth", login);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});