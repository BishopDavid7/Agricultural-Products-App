const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

// Configure AWS SDK
AWS.config.update({
    region: process.env.AWS_REGION || "us-east-1",
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Users"; // Ensure this table exists in DynamoDB

/**
 * Create a new user
 */
exports.createUser = async (userData) => {
    const user = {
        userId: uuidv4(),
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        role: userData.role || "buyer", // Default role is "buyer"
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    await dynamoDB.put({
        TableName: TABLE_NAME,
        Item: user,
    }).promise();

    return user;
};

/**
 * Get user by ID
 */
exports.getUserById = async (userId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { userId },
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item;
};

/**
 * Update user details
 */
exports.updateUser = async (userId, updatedData) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { userId },
        UpdateExpression: "set name = :name, phoneNumber = :phoneNumber, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
            ":name": updatedData.name,
            ":phoneNumber": updatedData.phoneNumber,
            ":updatedAt": new Date().toISOString(),
        },
        ReturnValues: "UPDATED_NEW",
    };

    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
};

/**
 * Delete user
 */
exports.deleteUser = async (userId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { userId },
    };

    await dynamoDB.delete(params).promise();
    return { message: "User deleted successfully" };
};
