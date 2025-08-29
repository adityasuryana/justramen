import Stock from "../models/Stock.js";

export async function getAllStocks(req, res) {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getStockById(req, res) {
    try {
        const stock = await Stock.findById(req.params.id);
        if (!stock) {
            return res.status(404).json({ message: "Stock not found" });
        }
        res.json(stock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function addStock(req, res) {
    const { item, quantity, description } = req.body;
    const stock = new Stock({ item, quantity, description });
    try {
        const savedStock = await stock.save();
        res.status(201).json(savedStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function updateStock(req, res) {
    const { item, quantity, description } = req.body;
    try {
        const updatedStock = await Stock.findByIdAndUpdate(
            req.params.id,
            { item, quantity, description },
            { new: true }
        );
        if (!updatedStock) {
            return res.status(404).json({ message: "Stock not found" });
        }
        res.json(updatedStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function deleteStock(req, res) {
    try {
        const deletedStock = await Stock.findByIdAndDelete(req.params.id);
        if (!deletedStock) {
            return res.status(404).json({ message: "Stock not found" });
        }
        res.json({ message: "Stock deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}