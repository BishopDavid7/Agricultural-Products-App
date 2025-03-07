const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import the User model

// Secret key for JWT (Store in environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Register User (Farmers & Buyers)
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role, phone, location } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "buyer", // Default role is buyer (farmer or buyer)
            phone,
            location
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ message: "User registered successfully", token, user });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// User Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

        res.json({ message: "Login successful", token, user });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email, phone, location } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.location = location || user.location;

        await user.save();
        res.json({ message: "Profile updated successfully", user });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete User Account
exports.deleteUserAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.userId);
        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
