const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// routes
const user = require("./controller/userController");
const shop = require("./controller/shopController");
const product = require("./controller/productController");
const event = require("./controller/eventController");
const coupoun = require("./controller/coupounCodeController");
const payment = require("./controller/paymentController");
const order = require("./controller/orderController");
// const message = require("./controller/messageController");
// const conversation = require("./controller/conversationController");
// const withdraw = require("./controller/withdrawController");
// app.use("/api/v2/withdraw", withdraw);

// end points
app.use("/api/v2/user", user);
// app.use("/api/v2/conversation", conversation);
// app.use("/api/v2/message", message);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupoun", coupoun);
app.use("/api/v2/payment", payment);
// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
