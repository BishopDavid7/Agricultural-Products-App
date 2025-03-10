const axios = require("axios");

const MTN_MOMO_API_URL = process.env.MTN_MOMO_API_URL;
const ORANGE_MONEY_API_URL = process.env.ORANGE_MONEY_API_URL;
const PAYMENT_API_KEY = process.env.PAYMENT_API_KEY;

// Process payment via MTN Mobile Money
exports.processMTNPayment = async (event) => {
    try {
        const paymentData = JSON.parse(event.body);
        const response = await axios.post(
            `${MTN_MOMO_API_URL}/pay`,
            {
                amount: paymentData.amount,
                currency: "XAF",
                recipient: paymentData.phoneNumber,
            },
            {
                headers: { "Authorization": `Bearer ${PAYMENT_API_KEY}` },
            }
        );
        return { statusCode: 200, body: JSON.stringify(response.data) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

// Process payment via Orange Money
exports.processOrangePayment = async (event) => {
    try {
        const paymentData = JSON.parse(event.body);
        const response = await axios.post(
            `${ORANGE_MONEY_API_URL}/pay`,
            {
                amount: paymentData.amount,
                currency: "XAF",
                recipient: paymentData.phoneNumber,
            },
            {
                headers: { "Authorization": `Bearer ${PAYMENT_API_KEY}` },
            }
        );
        return { statusCode: 200, body: JSON.stringify(response.data) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
