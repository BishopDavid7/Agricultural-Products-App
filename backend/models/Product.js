const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

// Configure AWS SDK
AWS.config.update({
    region: process.env.AWS_REGION || "us-east-1",
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Products"; // Ensure this table exists in DynamoDB

/**
 * Create a new product
 */
exports.createProduct = async (productData) => {
    const product = {
        productId: uuidv4(),
        farmerId: productData.farmerId, // ID of the farmer who owns the product
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock || 0,
        imageUrl: productData.imageUrl || "",
        category: productData.category || "General",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    await dynamoDB.put({
        TableName: TABLE_NAME,
        Item: product,
    }).promise();

    return product;
};

/**
 * Get product by ID
 */
exports.getProductById = async (productId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { productId },
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item;
};

/**
 * Get all products
 */
exports.getAllProducts = async () => {
    const params = {
        TableName: TABLE_NAME,
    };

    const result = await dynamoDB.scan(params).promise();
    return result.Items;
};

/**
 * Update product details
 */
exports.updateProduct = async (productId, updatedData) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { productId },
        UpdateExpression: "set name = :name, price = :price, stock = :stock, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
            ":name": updatedData.name,
            ":price": updatedData.price,
            ":stock": updatedData.stock,
            ":updatedAt": new Date().toISOString(),
        },
        ReturnValues: "UPDATED_NEW",
    };

    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
};

/**
 * Delete product
 */
exports.deleteProduct = async (productId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { productId },
    };

    await dynamoDB.delete(params).promise();
    return { message: "Product deleted successfully" };
};
