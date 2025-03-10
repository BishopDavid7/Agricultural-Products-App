const express = require("express");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
