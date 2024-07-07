const productExpress = require("express");
const productRouter = productExpress.Router();
const productController = require("../controllers/productController");

productRouter.get("/type", productController.getAllTypes);
productRouter.post("/type/product", productController.getAllProductByTypes);
productRouter.post("/update/quantity", productController.updateProductStock);

module.exports = productRouter;