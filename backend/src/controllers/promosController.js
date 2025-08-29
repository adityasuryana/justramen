import Promo from "../models/Promo.js";

export async function getAllPromos(req, res) {
    try {
        const promos = await Promo.find();
        res.json(promos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getPromoById(req, res) {
    const { id } = req.params;
    try {
        const promo = await Promo.findById(id);
        if (!promo) return res.status(404).json({ message: "Promo not found" });
        res.json(promo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function createPromo(req, res) {
    const { title, description, image } = req.body;
    const promo = new Promo({ title, description, image });
    try {
        const savedPromo = await promo.save();
        res.status(201).json(savedPromo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function updatePromo(req, res) {
    const { id } = req.params;
    const { title, description, image } = req.body;
    try {
        const updatedPromo = await Promo.findByIdAndUpdate(id, { title, description, image }, { new: true });
        if (!updatedPromo) return res.status(404).json({ message: "Promo not found" });
        res.json(updatedPromo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function deletePromo(req, res) {
    const { id } = req.params;
    try {
        const deletedPromo = await Promo.findByIdAndDelete(id);
        if (!deletedPromo) return res.status(404).json({ message: "Promo not found" });
        res.json({ message: "Promo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
