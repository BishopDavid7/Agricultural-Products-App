const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.ORDERS_TABLE || "Orders";

// Place an order
exports.placeOrder = async (event) => {
    try {
        const orderData = JSON.parse(event.body);
        const params = {
            TableName: TABLE_NAME,
            Item: {
                orderId: orderData.orderId,
                userId: orderData.userId,
                products: orderData.products,
                totalAmount: orderData.totalAmount,
                paymentStatus: "Pending",
                orderStatus: "Processing",
                createdAt: new Date().toISOString(),
            },
        };
        await dynamoDB.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Order placed successfully", order: params.Item }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

// Get order by ID
exports.getOrder = async (event) => {
    try {
        const orderId = event.pathParameters.orderId;
        const params = {
            TableName: TABLE_NAME,
            Key: { orderId },
        };
        const result = await dynamoDB.get(params).promise();
        if (!result.Item) {
            return { statusCode: 404, body: JSON.stringify({ message: "Order not found" }) };
        }
        return { statusCode: 200, body: JSON.stringify(result.Item) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
