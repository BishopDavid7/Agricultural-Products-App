const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.PRODUCTS_TABLE || "Products";

// Create a new product
exports.createProduct = async (event) => {
    try {
        const productData = JSON.parse(event.body);
        const params = {
            TableName: TABLE_NAME,
            Item: {
                productId: productData.productId,
                name: productData.name,
                price: productData.price,
                category: productData.category,
                imageUrl: productData.imageUrl,
                createdAt: new Date().toISOString(),
            },
        };
        await dynamoDB.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Product created successfully", product: params.Item }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

// Get all products
exports.getAllProducts = async () => {
    try {
        const params = {
            TableName: TABLE_NAME,
        };
        const result = await dynamoDB.scan(params).promise();
        return { statusCode: 200, body: JSON.stringify(result.Items) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
