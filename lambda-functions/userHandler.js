const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.USERS_TABLE || "Users";

// Create a new user
exports.createUser = async (event) => {
    try {
        const userData = JSON.parse(event.body);
        const params = {
            TableName: TABLE_NAME,
            Item: {
                userId: userData.userId,
                name: userData.name,
                email: userData.email,
                role: userData.role,
                createdAt: new Date().toISOString(),
            },
        };
        await dynamoDB.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: "User created successfully", user: params.Item }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

// Get user by ID
exports.getUser = async (event) => {
    try {
        const userId = event.pathParameters.userId;
        const params = {
            TableName: TABLE_NAME,
            Key: { userId },
        };
        const result = await dynamoDB.get(params).promise();
        if (!result.Item) {
            return { statusCode: 404, body: JSON.stringify({ message: "User not found" }) };
        }
        return { statusCode: 200, body: JSON.stringify(result.Item) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
