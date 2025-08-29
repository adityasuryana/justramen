import Inventory from '../models/Inventory.js';

export async function getAllInventories(req, res) {
    try {
        const inventories = await Inventory.find();
        res.json(inventories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getInventoryById(req, res) {
    const { id } = req.params;
    try {
        const inventory = await Inventory.findById(id);
        if (!inventory) return res.status(404).json({ message: "Inventory item not found" });
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function addInventory(req, res) {
    const { item, quantity, description } = req.body;
    const inventory = new Inventory({ item, quantity, description });
    try {
        const savedInventory = await inventory.save();
        res.status(201).json(savedInventory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function updateInventory(req, res) {
    const { id } = req.params;
    const { item, quantity, description } = req.body;
    try {
        const updatedInventory = await Inventory.findByIdAndUpdate(id, { item, quantity, description }, { new: true });
        if (!updatedInventory) return res.status(404).json({ message: "Inventory item not found" });
        res.json(updatedInventory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function deleteInventory(req, res) {
    const { id } = req.params;
    try {
        const deletedInventory = await Inventory.findByIdAndDelete(id);
        if (!deletedInventory) return res.status(404).json({ message: "Inventory item not found" });
        res.json({ message: "Inventory item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
