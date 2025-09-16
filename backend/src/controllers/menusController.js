import Menu from "../models/Menu.js";

export async function getAllMenus(req, res) {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getMenuById(req, res) {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) return res.status(404).json({ message: "Menu not found" });
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function createMenu(req, res) {
    const { name, description, price, image } = req.body;
    
    // Basic validation
    if (!name || !description || !price) {
        return res.status(400).json({ message: "Name, description, and price are required" });
    }

    const menu = new Menu({ 
        name, 
        description, 
        price: Number(price), // Ensure price is a number
        image: image || '' // Handle case where image might be undefined
    });

    try {
        const newMenu = await menu.save();
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function updateMenu(req, res) {
    const { name, description, price, image } = req.body;
    
    try {
        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price) updateData.price = Number(price);
        if (image !== undefined) updateData.image = image; // Allow empty string to clear image
        
        const menu = await Menu.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true, runValidators: true }
        );
        
        if (!menu) return res.status(404).json({ message: "Menu not found" });
        res.json(menu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function deleteMenu(req, res) {
    try {
        const menu = await Menu.findByIdAndDelete(req.params.id);
        if (!menu) return res.status(404).json({ message: "Menu not found" });
        res.json({ message: "Menu deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}