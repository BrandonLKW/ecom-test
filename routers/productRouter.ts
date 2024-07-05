const productExpress = require("express");
const productRouter = productExpress.Router();
const productController = require("../controllers/productController");

productRouter.get("/type", productController.getAllTypes);
productRouter.post("/type/product", productController.getAllProductByTypes)

module.exports = productRouter;