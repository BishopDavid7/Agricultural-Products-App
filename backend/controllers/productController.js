const Product = require("../models/Product"); // Import the Product model

// Create a new product listing (Only Farmers)
exports.createProduct = async (req, res) => {
    try {
        const { name, category, price, quantity, description, images, location } = req.body;

        // Ensure only farmers can create product listings
        if (req.user.role !== "farmer") {
            return res.status(403).json({ message: "Access denied. Only farmers can create product listings." });
        }

        // Create new product
        const product = new Product({
            farmer: req.user.userId, // Store the farmer's ID
            name,
            category,
            price,
            quantity,
            description,
            images,
            location
        });

        await product.save();
        res.status(201).json({ message: "Product listed successfully", product });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all products (Available for Buyers)
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("farmer", "name location");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("farmer", "name location");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a product listing (Only Farmers)
exports.updateProduct = async (req, res) => {
    try {
        const { name, category, price, quantity, description, images, location } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Ensure only the farmer who created the product can update it
        if (product.farmer.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized to update this product" });
        }

        // Update product details
        product.name = name || product.name;
        product.category = category || product.category;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;
        product.description = description || product.description;
        product.images = images || product.images;
        product.location = location || product.location;

        await product.save();
        res.json({ message: "Product updated successfully", product });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a product listing (Only Farmers)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Ensure only the farmer who created the product can delete it
        if (product.farmer.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized to delete this product" });
        }

        await product.remove();
        res.json({ message: "Product deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
