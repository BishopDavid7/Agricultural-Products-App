const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Create a new user
router.post("/", async (req, res) => {
    try {
        const user = await userController.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user by ID
router.get("/:userId", async (req, res) => {
    try {
        const user = await userController.getUserById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user details
router.put("/:userId", async (req, res) => {
    try {
        const updatedUser = await userController.updateUser(req.params.userId, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete user
router.delete("/:userId", async (req, res) => {
    try {
        await userController.deleteUser(req.params.userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
