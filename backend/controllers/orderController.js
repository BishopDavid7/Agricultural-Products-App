const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

// Configure AWS SDK
AWS.config.update({
    region: process.env.AWS_REGION || "us-east-1",
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Orders"; // Ensure this matches your DynamoDB table

/**
 * @desc Create a new order
 * @route POST /api/orders
 */
exports.createOrder = async (req, res) => {
    try {
        const { userId, productId, quantity, totalPrice, paymentMethod, status } = req.body;

        if (!userId || !productId || !quantity || !totalPrice || !paymentMethod) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const order = {
            orderId: uuidv4(),
            userId,
            productId,
            quantity,
            totalPrice,
            paymentMethod,
            status: status || "Pending", // Default status
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await dynamoDB.put({
            TableName: TABLE_NAME,
            Item: order,
        }).promise();

        return res.status(201).json({ message: "Order created successfully", order });

    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * @desc Get all orders for a user
 * @route GET /api/orders/user/:userId
 */
exports.getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const params = {
            TableName: TABLE_NAME,
            IndexName: "UserIdIndex", // Ensure you create this GSI in DynamoDB
            KeyConditionExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId": userId,
            },
        };

        const result = await dynamoDB.query(params).promise();
        return res.status(200).json({ orders: result.Items });

    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * @desc Get order details by orderId
 * @route GET /api/orders/:orderId
 */
exports.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const params = {
            TableName: TABLE_NAME,
            Key: { orderId },
        };

        const result = await dynamoDB.get(params).promise();

        if (!result.Item) {
            return res.status(404).json({ error: "Order not found" });
        }

        return res.status(200).json(result.Item);

    } catch (error) {
        console.error("Error fetching order:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * @desc Update order status
 * @route PUT /api/orders/:orderId
 */
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: "Order status is required" });
        }

        const params = {
            TableName: TABLE_NAME,
            Key: { orderId },
            UpdateExpression: "set status = :status, updatedAt = :updatedAt",
            ExpressionAttributeValues: {
                ":status": status,
                ":updatedAt": new Date().toISOString(),
            },
            ReturnValues: "UPDATED_NEW",
        };

        const result = await dynamoDB.update(params).promise();
        return res.status(200).json({ message: "Order status updated", updatedAttributes: result.Attributes });

    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * @desc Delete an order
 * @route DELETE /api/orders/:orderId
 */
exports.deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const params = {
            TableName: TABLE_NAME,
            Key: { orderId },
        };

        await dynamoDB.delete(params).promise();
        return res.status(200).json({ message: "Order deleted successfully" });

    } catch (error) {
        console.error("Error deleting order:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
