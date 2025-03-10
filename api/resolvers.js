const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const axios = require("axios");

const USERS_TABLE = process.env.USERS_TABLE || "Users";
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE || "Products";
const ORDERS_TABLE = process.env.ORDERS_TABLE || "Orders";
const MTN_MOMO_API_URL = process.env.MTN_MOMO_API_URL;
const ORANGE_MONEY_API_URL = process.env.ORANGE_MONEY_API_URL;
const PAYMENT_API_KEY = process.env.PAYMENT_API_KEY;

const resolvers = {
  Query: {
    async getUser(_, { userId }) {
      const params = { TableName: USERS_TABLE, Key: { userId } };
      const result = await dynamoDB.get(params).promise();
      return result.Item || null;
    },

    async getAllProducts() {
      const params = { TableName: PRODUCTS_TABLE };
      const result = await dynamoDB.scan(params).promise();
      return result.Items;
    },

    async getOrder(_, { orderId }) {
      const params = { TableName: ORDERS_TABLE, Key: { orderId } };
      const result = await dynamoDB.get(params).promise();
      return result.Item || null;
    },
  },

  Mutation: {
    async createUser(_, { name, email, role }) {
      const user = {
        userId: AWS.util.uuid.v4(),
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      };
      const params = { TableName: USERS_TABLE, Item: user };
      await dynamoDB.put(params).promise();
      return user;
    },

    async createProduct(_, { name, price, category, imageUrl }) {
      const product = {
        productId: AWS.util.uuid.v4(),
        name,
        price,
        category,
        imageUrl,
        createdAt: new Date().toISOString(),
      };
      const params = { TableName: PRODUCTS_TABLE, Item: product };
      await dynamoDB.put(params).promise();
      return product;
    },

    async placeOrder(_, { userId, products, totalAmount }) {
      const order = {
        orderId: AWS.util.uuid.v4(),
        userId,
        products,
        totalAmount,
        paymentStatus: "Pending",
        orderStatus: "Processing",
        createdAt: new Date().toISOString(),
      };
      const params = { TableName: ORDERS_TABLE, Item: order };
      await dynamoDB.put(params).promise();
      return order;
    },

    async processMTNPayment(_, { userId, amount, phoneNumber }) {
      const response = await axios.post(
        `${MTN_MOMO_API_URL}/pay`,
        { amount, currency: "XAF", recipient: phoneNumber },
        { headers: { Authorization: `Bearer ${PAYMENT_API_KEY}` } }
      );
      return {
        status: response.data.status,
        transactionId: response.data.transactionId,
        message: "MTN Mobile Money payment successful",
      };
    },

    async processOrangePayment(_, { userId, amount, phoneNumber }) {
      const response = await axios.post(
        `${ORANGE_MONEY_API_URL}/pay`,
        { amount, currency: "XAF", recipient: phoneNumber },
        { headers: { Authorization: `Bearer ${PAYMENT_API_KEY}` } }
      );
      return {
        status: response.data.status,
        transactionId: response.data.transactionId,
        message: "Orange Money payment successful",
      };
    },
  },
};

module.exports = resolvers;
