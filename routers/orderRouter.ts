const orderExpress = require("express");
const orderRouter = orderExpress.Router();
const orderController = require("../controllers/orderController");

orderRouter.post("/add", orderController.addOrder);
orderRouter.post("/find/user", orderController.getOrdersByUserId);
orderRouter.post("/find/orderitem", orderController.getOrderItemsByOrderId);

module.exports = orderRouter;