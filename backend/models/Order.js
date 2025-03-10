const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

// Configure AWS SDK
AWS.config.update({
    region: process.env.AWS_REGION || "us-east-1",
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Orders"; // Ensure this table exists in DynamoDB

/**
 * Create a new order
 */
exports.createOrder = async (orderData) => {
    const order = {
        orderId: uuidv4(),
        userId: orderData.userId,
        productId: orderData.productId,
        quantity: orderData.quantity,
        totalPrice: orderData.totalPrice,
        paymentMethod: orderData.paymentMethod,
        status: orderData.status || "Pending", // Default status
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    await dynamoDB.put({
        TableName: TABLE_NAME,
        Item: order,
    }).promise();

    return order;
};

/**
 * Get order by ID
 */
exports.getOrderById = async (orderId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { orderId },
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item;
};

/**
 * Get all orders for a user
 */
exports.getOrdersByUser = async (userId) => {
    const params = {
        TableName: TABLE_NAME,
        IndexName: "UserIdIndex", // Ensure this GSI is created in DynamoDB
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": userId,
        },
    };

    const result = await dynamoDB.query(params).promise();
    return result.Items;
};

/**
 * Update order status
 */
exports.updateOrderStatus = async (orderId, status) => {
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
    return result.Attributes;
};

/**
 * Delete an order
 */
exports.deleteOrder = async (orderId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { orderId },
    };

    await dynamoDB.delete(params).promise();
    return { message: "Order deleted successfully" };
};
