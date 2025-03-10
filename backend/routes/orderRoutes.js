const express = require("express");
const { createOrder, getOrdersByUser, getOrderById, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const router = express.Router();

router.post("/", createOrder);
router.get("/user/:userId", getOrdersByUser);
router.get("/:orderId", getOrderById);
router.put("/:orderId", updateOrderStatus);
router.delete("/:orderId", deleteOrder);

module.exports = router;
