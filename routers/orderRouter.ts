const orderExpress = require("express");
const orderRouter = orderExpress.Router();
const orderController = require("../controllers/orderController");

orderRouter.post("/add", orderController.addOrder)

module.exports = orderRouter;