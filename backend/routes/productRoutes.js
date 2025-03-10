const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Create a new product
router.post("/", async (req, res) => {
    try {
        const product = await productController.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get product by ID
router.get("/:productId", async (req, res) => {
    try {
        const product = await productController.getProductById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await productController.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update product details
router.put("/:productId", async (req, res) => {
    try {
        const updatedProduct = await productController.updateProduct(req.params.productId, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete product
router.delete("/:productId", async (req, res) => {
    try {
        await productController.deleteProduct(req.params.productId);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
